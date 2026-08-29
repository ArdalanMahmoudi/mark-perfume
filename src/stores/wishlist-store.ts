import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "../lib/types/product.type";

type WishCard = Pick<
  ProductType,
  "id" | "thumbnail" | "name" | "price" | "discount"
>;

interface WishlistState {
  wishList: WishCard[] ;
  addToWishList: (product: WishCard) => void;
  removeFromWishList: (productId: string) => void;
}
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishList: [],

      addToWishList: (product) => {
        set((state) => {
          const exist = state.wishList.some((item) => item.id === product.id);
          if (exist) return state;
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
