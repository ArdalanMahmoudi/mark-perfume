"use client";

import {
  Armchair,
  Blender,
  Cable,
  ChevronLeft,
  Hammer,
  LayoutGrid,
  PaintRoller,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function Megamenu() {
  const [activeIndex, setActiveIndex] = useState(0);

  const menu = [
    {
      title: "دسته‌بندی",
      submenus: [
        {
          id: 0,
          label: "گُلی(Floral)",
          title: "گُلی(Floral)",
          submenu: [
            {
              title: "عطرهای گّلی-کلاسیک",
              submenuItem: ["گُلی تنها", "رز", "یاس", "بنفشه"],
            },
            {
              title: "عطرهای گّلی-مدرن",
              submenuItem: [
                "گُلی میوه‌ای",
                "گُلی سبز",
                "گُلی پودری",
                "گُلی مشک‌دار",
              ],
            },
            {
              title: "عطرهای گّلی-خنک و سبک",
              submenuItem: [
                "گُلی آکواتیک",
                "یاسمن سفید",
                "فریزیا",
                "گُلی سفید",
              ],
            },
          ],
        },
        {
          id: 1,
          label: "گُلی(Floral)",
          title: "گُلی(Floral)",
          submenu: [
            {
              title: "عطرهای گّلی-کلاسیک",
              submenuItem: ["گُلی تنها", "رز", "یاس", "بنفشه"],
            },
            {
              title: "عطرهای گّلی-مدرن",
              submenuItem: [
                "گُلی میوه‌ای",
                "گُلی سبز",
                "گُلی پودری",
                "گُلی مشک‌دار",
              ],
            },
            {
              title: "عطرهای گّلی-خنک و سبک",
              submenuItem: [
                "گُلی آکواتیک",
                "یاسمن سفید",
                "فریزیا",
                "گُلی سفید",
              ],
            },
          ],
        },
        {
          id: 2,
          label: "گُلی(Floral)",
          title: "گُلی(Floral)",
          submenu: [
            {
              title: "عطرهای گّلی-کلاسیک",
              submenuItem: ["گُلی تنها", "رز", "یاس", "بنفشه"],
            },
            {
              title: "عطرهای گّلی-مدرن",
              submenuItem: [
                "گُلی میوه‌ای",
                "گُلی سبز",
                "گُلی پودری",
                "گُلی مشک‌دار",
              ],
            },
            {
              title: "عطرهای گّلی-خنک و سبک",
              submenuItem: [
                "گُلی آکواتیک",
                "یاسمن سفید",
                "فریزیا",
                "گُلی سفید",
              ],
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {menu.map((item) => (
        <nav key={item.title} className="relative group w-fit h-fit">
          {/* button menu */}
          <div className="flex items-center cursor-pointer gap-1 py-2 px-4 text-primary border border-grey220 bg-white rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
            <LayoutGrid className="size-4" />
            <span>دسته بندی محصولات</span>
          </div>

          <div className="absolute top-full z-999 -right-2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out delay-100 border border-grey220">
            <div className="lg:w-200 flex bg-secondary  shadow-lg border border-gray-100 overflow-hidden">
              {/*  right column */}
              <ul className="flex flex-col border-l border-gray-100 bg-gray-50/50 w-48">
                {item.submenus.map((subitem, index) => (
                  <li
                    key={subitem.id}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`px-4 py-3 cursor-pointer transition-all duration-200 border-r-2 gap-2 flex items-center ${
                      activeIndex === index
                        ? "bg-white border-primary text-primary text-button-md shadow-sm text-nowrap"
                        : "border-transparent text-neutral-600 hover:text-primary hover:bg-white text-button-s"
                    }`}
                  >
                    {subitem.title}
                  </li>
                ))}
              </ul>

              {/* column content */}
              <div className="px-8 py-4 w-full bg-secondary transition-opacity duration-300">
                {item.submenus.map((subitem, index) => (
                  <div
                    key={subitem.id}
                    className={`${activeIndex === index ? "block" : "hidden"} animate-in fade-in duration-500`}
                  >
                    <Link
                      href={"/"}
                      className="text-primary flex text-body-lg gap-1 pb-3 border-b border-grey220"
                    >
                      همه محصولات {subitem.label} <ChevronLeft />
                    </Link>

                    {/* Content Bottom */}
                    <div className="grid grid-cols-3 gap-x-8 gap-y-4  mt-3 ">
                      {subitem.submenu.map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                          <span className="border-r-4 border-primary py-1 px-2">{item.title}</span>
                          {item.submenuItem.map((links, idx) => (
                            
                            <Link
                              key={idx}
                              href="/"
                              className="text-gray-600 hover:text-primary transition-colors text-sm"
                              >
                              {links}
                            </Link>
                              
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>
      ))}
    </>
  );
}

export default Megamenu;
