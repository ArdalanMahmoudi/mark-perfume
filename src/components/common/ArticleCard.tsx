import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";

const ArticleCard = () => {
  return (
    <Link href={"/blog"} className=" group cursor-pointer">
      {/* article-top */}
      <Image
        width={1200}
        height={1200}
        src={"/images/article/johnwin-article.jpg"}
        className={`h-62.5  w-full items-end relative  flex bg-center bg-cover bg-no-repeat rounded-t-full `}
        alt="product-card"
      />
      {/* article-bottom */}
      <div className="flex flex-col gap-2.5 bg-secondary p-2.5 rounded-b-lg border border-grey220">
        {/* b-name */}
        <div className="text-primary line-clamp-1 flex gap-0.5 text-xs items-center">
          <Clock className="size-3" />
          <span>۴ دقیقه زمان مطالعه</span>
        </div>
        {/* b-desc */}
        <p className="flex items-center gap-1 text-justify">
          رایحه ادکلن‌های ارض الزعفران
        </p>
        <Link href={"/blog"} className="flex justify-end">
         <Button>
          مشاهده بیشتر
         </Button>
        </Link>
      </div>
    </Link>
  );
};

export default ArticleCard;
