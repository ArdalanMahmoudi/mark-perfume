"use client"
import React from 'react';
import { PaginationDemo } from "@/src/components/common/Pagination";
import { DataTable } from "@/src/templates/dashboard/_components/data-table";
import { orderColumns } from "@tanstack/react-table";

const OrderDashboardTemplate = ({orders}) => {
 console.log(orders);
 
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
        <DataTable columns={orderColumns} data={orders}/>
      </div>
      {/* pagination */}
      <PaginationDemo/>
    </div>
    );
}

export default OrderDashboardTemplate;
