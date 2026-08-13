"use client"
import { useCart } from '@/src/context/cart-context';
import React from 'react';

const CheckOutSidebar = () => {
    const {totalPrice, cart} = useCart()
    return (
        <div className="p-5 top-30 sticky bg-secondary h-fit flex flex-col gap-6 rounded-md border border-grey220 w-full max-w-112.5">
              <div className="flex items-center justify-between text-sm">
                <p>قیمت کالاها ({cart.length})</p>
                <p>{totalPrice.toLocaleString("fa-IR")} تومان</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p>جمع سبد خرید</p>
                <p>{totalPrice.toLocaleString("fa-IR")} تومان</p>
              </div>
              <div className="flex items-center bg-white rounded-sm w-full text-sm   justify-between">
                <input type="text" placeholder="کد تخفیف دارید؟" className="h-full w-full pr-3 py-3 outline-0" />
                <button className="cursor-pointer bg-primary h-full text-white px-2 py-3">اعمال</button>
              </div>
              <button className="bg-primary text-white py-2 rounded-xs text-sm hover:bg-white hover:text-primary transition-colors duration-200 border border-primary">
                ثبت سفارش
              </button>
            </div>
    );
}

export default CheckOutSidebar;
