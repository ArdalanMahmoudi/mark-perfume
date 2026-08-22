import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishList: [],

      addToWishList: (product) => {
        set((state) => {
          const exist = state.wishList.some((item) => item.id === product.id);
          if (exist) return;
          return { wishList: [...state.wishList, product] };
        });
      },

      removeFromWishList: (productId) => {
        set((state) => {
          const filtered = state.wishList.filter(
            (item) => item.id !== productId,
          );

          return {
            wishList: filtered,
          };
        });
      },
    }),
    { name: "wishlist" },
  ),
);
