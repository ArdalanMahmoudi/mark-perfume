import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const Comment = ({ score, body, date }) => {
  return (
    <div className="w-full bg-white rounded-lg my-5 p-4 flex gap-4 items-center border border-grey220">
      <Image
        src={""}
        width={200}
        height={200}
        className="size-20 rounded-full border border-grey220"
        alt="user img"
      />
      <div className="flex flex-col w-full">
        <div className="flex justify-between gap-2.5 w-full">
          <p className="text-primary text-lg flex items-center gap-1">
            <span>Ardal</span>
            <span className="text-gray-500 text-xs">
              {date.toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
          <div className="flex gap-0.5">
            {Array.from({ length: score }).map((item) => (
              <Star className="fill-warning300 stroke-1 stroke-warning300 size-3.5" />
            ))}
            {Array.from({ length: 5 - score }).map((item) => (
              <Star className=" stroke-1 stroke-warning300 size-3.5" />
            ))}
          </div>
        </div>
        {/* body-comment */}
        <p className="text-lg">{body}</p>
      </div>
    </div>
  );
};

export default Comment;
