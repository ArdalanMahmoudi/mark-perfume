"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ProductType } from "../lib/types/product.type";
import { useToast } from "./toast-context";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartContextType = {
  cart: ProductType[];
  totalPrice: number;
  addToCart: (product: ProductType) => void;
  removeProductInCart: (productId: string) => void;
};
const CartContext = createContext<CartContextType | null>(null);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalStorage("cart",[]);
  
  

  function addToCart(product) {
    const newCart = [...cart];

    if (newCart.length > 0) {
      const existProduct = newCart.find((p) => p.id === product.id);
      if (existProduct) {
        existProduct.qty += 1;
      } else {
        newCart.push({
          ...product,
          qty: 1,
        });
      }
      setCart(newCart);

      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      newCart.push({
        ...product,
        qty: 1,
      });
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

  }
  function removeProductInCart(productId) {
    const filteredCart = cart.filter((p) => p.id !== productId);
    setCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  }

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      if (item.discount > 0) {
        const discountedPrice = (item.price * (item.discount / 100)) ;
        return (total + Math.round(((item.price - discountedPrice)* item.qty) / 1000) * 1000) ;
      } else {
        return (total + (item.price * item.qty)) ;
      }
    }, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, totalPrice, addToCart, removeProductInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("error context");
  }
  return cartContext;
}
