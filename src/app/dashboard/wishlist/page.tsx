import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

const WishlistPage = () => {
  return (
    <div className="flex flex-col gap-8 h-fit bg-secondary p-5 border border-grey220  rounded-lg">
      <p className="text-primary font-bold">لیست علاقه مندی من</p>
      <div className="flex flex-col gap-4 bg-white border border-grey220 rounded-lg p-5 overflow-x-auto whitespace-nowrap">
        <table>
          <thead className="bg-secondary min-w-2xl text-sm border border-grey220 overflow-hidden">
            <th className="border-l p-2.5 border-grey220 text-primary">
              #
            </th>
            <th className="border-l p-2.5 border-grey220 text-primary">
              عکس محصول
            </th>
            <th className="border-l p-2.5 border-grey220 text-primary">
              نام محصول
            </th>
            <th className="border-l p-2.5 border-grey220 text-primary">قیمت</th>
            <th className="border-l p-2.5 border-grey220 text-primary">حذف</th>
          </thead>
          <tbody>
            <tr className="text-sm text-center border-b border-grey220">
              <td className="p-2">234</td>
              <td className="p-2 align-middle">
                <div className="flex justify-center">
                  <Image
                    src={""}
                    className="size-10 border border-primary"
                    width={40}
                    height={40}
                    alt="product img"
                  />
                </div>
              </td>
              <td className="p-2  text-center">
                <span className="block max-w-64 truncate text-center">
                عطر Floral Bloom Eau De Parfum با حجم ۱۰۰ میلی‌لیتر
                </span>
              </td>
              <td className="p-2">{455555}تومان</td>
              <td className="p-2 align-middle">
                <div className="flex justify-center">
                  <Trash className="size-5 cursor-pointer hover:text-error500" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishlistPage;
