import { PaginationDemo } from "@/src/components/common/Pagination";
import { PlusCircleIcon } from "lucide-react";
import React from "react";

function OrderPage  ()  {
  return (
    <div className="flex flex-col gap-8 h-fit bg-secondary p-5 border border-grey220  rounded-lg">
      {/* search */}
      <div className="bg-white rounded-lg p-5 flex justify-between gap-4 border border-grey220">
        <div className="flex gap-1 items-center">
          <label htmlFor="search">جستجو کنید:</label>
          <input
            type="text"
            id="search"
            className="bg-secondary border border-grey220 rounded-xs outline-0 p-1 text-sm"
          />
        </div>
        <div className="flex gap-1 items-center">
          نمایش
          <select className="bg-gray-300 text-sm">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          تایی
        </div>
      </div>
      {/* table order */}
      <div className="flex flex-col gap-4 bg-white border border-grey220 rounded-lg p-5 overflow-x-auto whitespace-nowrap">
        <table>
          <thead className="bg-secondary min-w-2xl text-sm border border-grey220 overflow-hidden">
            <th className="border-l p-2.5 border-grey220 text-primary">
              شماره
            </th>
            <th className="border-l p-2.5 border-grey220 text-primary">
              شماره سفارش
            </th>
            <th className="border-l p-2.5 border-grey220 text-primary">
              تاریخ ثبت سفارش
            </th>
            <th className="border-l p-2.5 border-grey220 text-primary">
              وضعیت سفارش
            </th>
            <th className="border-l p-2.5 border-grey220 text-primary">
              جزئیات سفارش
            </th>
          </thead>
          <tbody>
            <tr className="text-sm text-center border-b border-grey220">
              <td className="p-2">1</td>
              <td className="p-2">392874934</td>
              <td className="p-2"> 1405/1/10 --8:24</td>
              <td className="p-2">
                <div className="bg-pending px-2.5 py-1 rounded-xs text-white text-xs m-auto cursor-pointer w-fit h-fit">
                  درحال انجام
                </div>
              </td>
              <td className="p-2 flex justify-center">
                <PlusCircleIcon className="size-5" />
              </td>
            </tr>
            <tr className="text-sm text-center border-b border-grey220">
              <td className="p-2">2</td>
              <td className="p-2">392874934</td>
              <td className="p-2"> 1405/1/10 --8:24</td>
              <td className="p-2">
                <div className="bg-success600 px-2.5 py-1 rounded-xs text-white text-xs m-auto cursor-pointer w-fit h-fit">
                  تکمیل شده
                </div>
              </td>
              <td className="p-2 flex justify-center">
                <PlusCircleIcon className="size-5" />
              </td>
            </tr>
            <tr className="text-sm text-center border-b border-grey220">
              <td className="p-2">3</td>
              <td className="p-2">392874934</td>
              <td className="p-2"> 1405/1/10 --8:24</td>
              <td className="p-2">
                <div className="bg-error500 px-2.5 py-1 rounded-xs text-white text-xs m-auto cursor-pointer w-fit h-fit">
                  لغو شده
                </div>
              </td>
              <td className="p-2 flex justify-center">
                <PlusCircleIcon className="size-5" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <PaginationDemo/>
    </div>
  );
};

export default OrderPage;
