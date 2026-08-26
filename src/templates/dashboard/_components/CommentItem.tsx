import { CommentType } from "@/src/lib/types/comment.type";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CommentItem = ({ productImg,productName,productSlug, commentBody, score, status }) => {
  return (
    <div className="bg-white border border-grey220 p-5 grid grid-cols-[repeat(1,100%)] lg:grid-cols-[auto_1fr] gap-4 text-sm items-center rounded-sm ">
      <div className="flex items-center">
        <Image
          src={productImg}
          width={500}
          height={500}
          className="w-30 rounded-full mx-auto lg:mx-0"
          alt="product img"
        />
      </div>
      {/* left */}
      <div className="flex flex-col gap-2.5">
        {/* top */}
        <div className="flex justify-between items-center gap-3">
          <Link href={`/product/${productSlug}`} className="text-primary font-bold line-clamp-2">{productName}</Link>
          <div className="flex flex-col gap-2 items-center">
            <div className="flex gap-0.5 items-center">
              {Array.from({ length: score }).map((_,idx) => (
                <Star  className="fill-warning300 stroke-1 stroke-warning300 size-3.5" />
              ))}
              {Array.from({ length: 5 - score }).map((_,idx) => (
                <Star className=" stroke-1 stroke-warning300 size-3.5" />
              ))}
            </div>
            {/* status */}
            {(status === "ACCEPT" && (
              <div className="w-fit text-nowrap px-4 py-1 rounded-3xl bg-success100 text-success600">
                تایید شده
              </div>
            )) ||
              (status === "PENDING" && (
                <div className="w-fit text-nowrap px-4 py-1 rounded-3xl bg-warning100 text-warning400">
                  در انتظار تایید
                </div>
              )) ||
              (status === "REJECTED" && (
                <div className="w-fit text-nowrap px-4 py-1 rounded-3xl bg-error100 text-error500">
                  رد شده
                </div>
              ))}
          </div>
        </div>
        {/* bottom */}
        <div>
            <p>{commentBody}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
