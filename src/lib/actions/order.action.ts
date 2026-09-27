"use server";

import { prisma } from "../prisma";
import { getCurrentUser } from "../queries/user.queries";
import { revalidatePath } from "next/cache";

type CartItem = {
  productId: string;
  qty: number;
};

export async function createOrder(cartItems: CartItem[], address: string) {
  //  احراز هویت
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("ابتدا وارد حساب کاربری شوید");
  }

  //  اعتبارسنجی ورودی‌های پایه
  if (!cartItems || cartItems.length === 0) {
    throw new Error("سبد خرید خالی است");
  }

  if (!address || address.trim().length < 5) {
    throw new Error("آدرس نامعتبر است");
  }

  //  اعتبارسنجی qty 
  for (const item of cartItems) {
    if (!item.productId || !Number.isInteger(item.qty) || item.qty <= 0) {
      throw new Error("آیتم سبد خرید نامعتبر است");
    }
  }

  // oversell با productId 
  const mergedItemsMap = new Map<string, number>();
  for (const item of cartItems) {
    mergedItemsMap.set(
      item.productId,
      (mergedItemsMap.get(item.productId) ?? 0) + item.qty
    );
  }
  const mergedItems = Array.from(mergedItemsMap.entries()).map(
    ([productId, qty]) => ({ productId, qty })
  );

  // گرفتن قیمت‌ها از دیتابیس
  const productIds = mergedItems.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  // ۶. محاسبه قیمت نهایی هر آیتم + مجموع
  let totalPrice = 0;
  const orderItemsData = mergedItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`محصولی با شناسه ${item.productId} یافت نشد`);
    }
    if (product.stock < item.qty) {
      throw new Error(`موجودی محصول «${product.name}» کافی نیست`);
    }

    const unitPrice =
      product.discount > 0
        ? Math.round(product.price - (product.price * product.discount) / 100)
        : product.price;

    totalPrice += unitPrice * item.qty;

    return {
      productId: product.id,
      qty: item.qty,
      price: unitPrice, 
    };
  });

  //  race condition
  const order = await prisma.$transaction(async (tx) => {
    for (const item of orderItemsData) {
      const updated = await tx.product.updateMany({
        where: {
          id: item.productId,
          stock: { gte: item.qty }, 
        },
        data: { stock: { decrement: item.qty } },
      });

      if (updated.count === 0) {
       
        throw new Error("موجودی برخی محصولات هم‌زمان تمام شد، دوباره تلاش کنید");
      }
    }

    const newOrder = await tx.order.create({
      data: {
        userId: user.id,
        totalPrice,
        status: "PENDING",
        address: address.trim(),
        orderItems: { create: orderItemsData },
      },
      include: { orderItems: true },
    });

    return newOrder;
  });

  //  revalidate 
  revalidatePath("/orders");
  revalidatePath("/cart");
  revalidatePath("/products");
  for (const item of orderItemsData) {
    revalidatePath(`/products/${item.productId}`);
  }

  return order;
}