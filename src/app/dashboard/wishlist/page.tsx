"use client";
import { useWishlistStore } from "@/src/stores/wishlist-store";
import WishCard from "@/src/templates/dashboard/_components/WishCard";
import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

const WishlistPage = () => {
  const wishList = useWishlistStore((state) => state.wishList);
  return (
    <div className="bg-secondary-layout h-fit!">
      <p className="text-primary font-bold">لیست علاقه مندی من</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4  p-5 overflow-x-auto whitespace-nowrap">
        {wishList.length > 0 ? (
          wishList.map((card) => <WishCard key={card.id} product={card} />)
        ) : (
          <div className="flex flex-col gap-5 items-center justify-center col-span-3">
            <Image
              src={"/images/product/empty-favorite-list.png"}
              width={200}
              height={200}
              className="w-30 h-30"
              alt="empty-favorite-list img"
            />
            <p className="text-sm">لیست علاقه مندی های شما خالی است.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
