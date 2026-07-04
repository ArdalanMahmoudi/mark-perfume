import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import Link from "next/link";

const items = [
  {
    value: "Floral",
    trigger: " گُلی (Floral) ",
    content: (
      <>
        <div className="flex flex-col gap-4 ">
          <span className="border-r-4 border-primary py-1 px-2">
            عطرهای گّلی-کلاسیک
          </span>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی تنها
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            رز
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            یاس
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            بنفشه
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <span className="border-r-4 border-primary py-1 px-2">
            عطرهای گّلی-مدرن
          </span>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی میوه‌ای
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی سبز
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی پودری
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی مشک‌دار
          </Link>
        </div>
      </>
    ),
  },
  {
    value: "Woody",
    trigger: " چوبی (Woody) ",
    content: (
      <>
        <div className="flex flex-col gap-4 ">
          <span className="border-r-4 border-primary py-1 px-2">
            عطرهای گّلی-کلاسیک
          </span>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی تنها
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            رز
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            یاس
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            بنفشه
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <span className="border-r-4 border-primary py-1 px-2">
            عطرهای گّلی-مدرن
          </span>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی میوه‌ای
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی سبز
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی پودری
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی مشک‌دار
          </Link>
        </div>
      </>
    ),
  },
  {
    value: "Fresh",
    trigger: " تازه (Fresh) ",
    content: (
      <>
        <div className="flex flex-col gap-4 ">
          <span className="border-r-4 border-primary py-1 px-2">
            عطرهای گّلی-کلاسیک
          </span>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی تنها
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            رز
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            یاس
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            بنفشه
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <span className="border-r-4 border-primary py-1 px-2">
            عطرهای گّلی-مدرن
          </span>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی میوه‌ای
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی سبز
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی پودری
          </Link>
          <Link
            className="text-gray-600 hover:text-primary transition-colors text-sm"
            href="/"
          >
            گُلی مشک‌دار
          </Link>
        </div>
      </>
    ),
  },
];

export function AccordionHeaderMobile() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="billing"
    >
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="border-b px-4 my-2 border bg-white"
        >
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
