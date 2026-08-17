"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ProductType } from "../lib/types/product.type";

type WishListContextProps = {
  wishList: ProductType[];
  addToWishList: (product: ProductType) => void;
  removeFromWishList: (productId: string) => void;
};

const WishListContext = createContext<WishListContextProps | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishList, setWishList] = useLocalStorage("wishList", []);

  function addToWishList(product) {
    const exist = wishList.some((item) => item.id === product.id);
    if (exist) return;
    setWishList((prevData) => [...prevData, product]);
  }

  function removeFromWishList(productId) {
    const filtered = wishList.filter((p) => p.id !== productId);
    setWishList(filtered);
  }

  return (
    <WishListContext.Provider
      value={{ wishList, addToWishList, removeFromWishList }}
    >
      {children}
    </WishListContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error("wishlist context not found");
  }
  return context;
}
