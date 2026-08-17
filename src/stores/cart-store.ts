import { create } from "zustand";
import { ProductType } from "../lib/types/product.type";

type CartStoreType = {
  cart: ProductType[];
  totalPrice: number;
  addToCart: (product: ProductType) => void;
  removeProductInCart: (productId: string) => void;
};

export const useCartStore = create((set) => ({
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
}));
