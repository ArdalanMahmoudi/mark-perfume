import Image from "next/image";
import Link from "next/link";
import React from "react";

type CategoryItemProps = {
  image: string;
  category: string;
  desc: string;
};

const CategoryItem = ({ image, category, desc }: CategoryItemProps) => {
  return (

      <Link
        href={"/shop"}
        className="flex h-full gap-4 bg-secondary p-2.5 rounded-lg border border-grey220 items-center"
      >
        <div>
          <Image
            className="w-fit rounded-full max-w-17.5"
            width={200}
            height={200}
            src={image}
            alt="category image"
          />
        </div>
        <div>
          <p className="leading-8 font-bold text-primary">{category}</p>
          <p className="leading-8 text-xs">{desc}</p>
        </div>
      </Link>

  );
};

export default CategoryItem;
