"use client";

import { createOrder } from "@/src/lib/actions/order.action";
import { initialPayment } from "@/src/lib/actions/payment.action";
import { useCartStore } from "@/src/stores/cart-store";

export function SubmitOrderButton() {
  const cart = useCartStore((state) => state.cart);
  const handleSubmit = async () => {
    const orderInput = cart.map(product => ({
      productId:product.id,
      qty:product.qty
    }))
    try {
      const order = await createOrder(orderInput,"پیرانشهر");
      await initialPayment(order.id);
    } catch (err) {
      console.log(err);
    }

    
  };
  return <button className="bg-primary text-white py-2 text-sm cursor-pointer" onClick={handleSubmit}>ثبت سفارش</button>;
}
