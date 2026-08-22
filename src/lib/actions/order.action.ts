"use server"
import { prisma } from "../prisma";
import { getCurrentUser } from "../queries/user.queries";

type CartItem = {
  productId: string;
  qty: number;
};
export async function createOrder(cartItems: CartItem[],address:string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("ابتدا وارد حساب کاربری شوید");
  }
  if (cartItems.length === 0 || !cartItems) {
    throw new Error("سبد خرید خالی است");
  }

  // price-in-db
  const productIds = cartItems.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // calculate price
  let totalPrice = 0;
  const orderItemsData = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`محصولی با شناسه ${item.productId} یافت نشد`)
    }
    if (product.stock < item.qty) {
      throw new Error(`موجودی ${item.productId} کافی نیست`)
    }
    const itemTotal = product.price * item.qty
    totalPrice+= itemTotal
    return {
      productId:product.id,
      qty:item.qty,
      price:product.price
    }
  });

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId: user.id,
        totalPrice,
        status: "PENDING",
        address,
        orderItems: {
          create:orderItemsData
        },
      },
      include:{
        orderItems:true
      }
    });

    for(const item of orderItemsData){
      await tx.product.update({
        where:{id:item.productId},
        data:{stock:{decrement:item.qty}}
      })
    }
    return newOrder

    
  });
  return order
}
