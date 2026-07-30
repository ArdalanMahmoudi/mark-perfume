"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminBreadcrumb = () => {
  const pathName = usePathname();
  const routes = {
    admin: "پیشخوان",
    products: "محصولات",
    new: "افزودن محصول",
    edit: "ویرایش محصول",
    comments: "کامنت ها",
    tickets: "تیکت ها",
    users: "کاربران",
    profile: "جزئیات حساب کاربری",
  };
  const segments = pathName.split("/").filter(Boolean);

  return (
    <div className="flex gap-1">
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        return (
          <div key={index} className="flex gap-1 items-center">
            {/* <span>{routes[segment] || segment}</span> */}
            {index < segments.length - 1  ? (
            <div className="flex items-center gap-2">
              <Link className="" href={href}>{routes[segment] || segment}</Link>
              <span><ChevronLeft className="size-4"/></span>
            </div>
            ) : (
              <span className="text-muted-foreground text-sm">{routes[segment]}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdminBreadcrumb;
