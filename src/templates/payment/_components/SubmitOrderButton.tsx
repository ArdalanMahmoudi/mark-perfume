"use client";

import { createOrder } from "@/src/lib/actions/order.action";
import { initialPayment } from "@/src/lib/actions/payment.action";
import { useCartStore } from "@/src/stores/cart-store";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function SubmitOrderButton() {
  const cart = useCartStore((state) => state.cart);
  const [isPending, setIsPending] = useState(false);
  const handleSubmit = async () => {
    const orderInput = cart.map(product => ({
      productId:product.id,
      qty:product.qty
    }))
    if (isPending) return;
    setIsPending(true);

    try {
      const order = await createOrder(orderInput, "پیرانشهر");
      await initialPayment(order.id);
    } catch {
      setIsPending(false);
      throw new Error("Error Payment");
    }

    
  };
  return (
    <button
      type="button"
      disabled={isPending}
      className="inline-flex items-center justify-center gap-2 bg-primary py-2 text-sm text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      onClick={handleSubmit}
    >
      {isPending && <Loader2 className="size-4 animate-spin" />}
      {isPending ? "در حال ثبت سفارش..." : "ثبت سفارش"}
    </button>
  );
}
