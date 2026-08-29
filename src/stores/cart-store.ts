"use client";
import { create } from "zustand";
import { ProductType } from "../lib/types/product.type";
import { persist } from "zustand/middleware";

type CartCard = Omit<ProductType,"comments" | "gallery"> & { qty :number}


interface CartState {
  cart:CartCard[]
  addToCart:(product:Omit<CartCard ,"qty">) => void
  removeFromCart:(productId:string) => void
  clearCart:() => void
  totalPrice:() => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        set((state) => {
          const exist = state.cart.find((p) => p.id === product.id);
          if (exist) {
            return {
              cart: state.cart.map((item) => {
                if (item.id === product.id) {
                  return { ...item, qty: item.qty + 1 };
                }
                return item;
              }),
            };
          }
          return { cart: [...state.cart, { ...product, qty: 1 }] };
        });
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== productId),
        }));
      },
      clearCart: () => {
        set((state) => ({
          cart: [],
        }));
      },

      totalPrice: () => {
        const cart = get().cart;
        return cart.reduce((total, item) => {
          if (item.discount > 0) {
            const discountAmount = item.price * (item.discount / 100);
            return (
              total +
              Math.round(((item.price - discountAmount) * item.qty) / 1000) *
                1000
            );
          }
          return total + item.price * item.qty;
        }, 0);
      },
    }),
    { name: "cart" },
  ),
);
