import Container from "@/src/components/common/Container";
import { InputGroupInlineStart } from "@/src/components/common/InputGroup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import SectionTitle from "@/src/templates/home/_components/SectionTitle";
import { Mail, Map, MessageCircle, Pencil, Phone, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const items = [
  {
    value: "item-1",
    trigger: "عطرهای فروشگاه شما چه تفاوتی با بازار دارند؟",
    content:
      "تمامی عطرها و ادکلن‌های ما اصل بوده و مستقیماً از نمایندگی‌های معتبر تهیه می‌شوند. هر محصول دارای شناسه اصالت و پلمپ اصلی برند است. همچنین تمام کالاها در شرایط استاندارد نگهداری می‌شوند تا کیفیت رایحه و ماندگاری آن‌ها حفظ شود. ",
  },
  {
    value: "item-2",
    trigger: "آیا امکان تست رایحه قبل از خرید وجود دارد؟",
    content:
      "برای بسیاری از عطرها امکان سفارش سمپل یا دکانت وجود دارد. این سمپل‌ها مقدار کمی از همان عطر اصلی هستند و به شما کمک می‌کنند قبل از خرید سایز اصلی، رایحه و ماندگاری آن را امتحان کنید. ارسال سمپل‌ها در بسته‌بندی ایمن و استاندارد انجام می‌شود. ",
  },
  {
    value: "item-3",
    trigger: "چقدر طول میکشد تا عطر بعد از سفارش به دستم برسد؟",
    content:
      "سفارش‌ها معمولاً بین ۱ تا ۳ روز کاری با توجه به شهر مقصد ارسال می‌شوند. بسته‌ها با بسته‌بندی ضد ضربه و کاملاً ایمن تحویل پست یا پیک می‌گردند. پس از ثبت سفارش، کد رهگیری برای شما ارسال می‌شود تا بتوانید وضعیت بسته‌ی خود را در هر لحظه مشاهده کنید.",
  },
  {
    value: "item-4",
    trigger: "آیا عطرهای شما ضمانت بازگشت و تعویض دارند؟",
    content:
      "تمام عطرهای ارائه‌شده دارای گارانتی اصالت کالا هستند. در صورتی که پلمپ محصول باز نشده باشد، تا ۷ روز امکان تعویض یا مرجوعی وجود دارد. اگر مشکلی در بسته‌بندی، نشتی یا مغایرت کالا مشاهده کنید، پشتیبانی فروشگاه بلافاصله برای تعویض محصول اقدام می‌کند. ",
  },
  {
    value: "item-5",
    trigger: "عطرهای فروشگاه شما چه تفاوتی با بازار دارند؟",
    content:
      "تمامی عطرها و ادکلن‌های ما اصل بوده و مستقیماً از نمایندگی‌های معتبر تهیه می‌شوند. هر محصول دارای شناسه اصالت و پلمپ اصلی برند است. همچنین تمام کالاها در شرایط استاندارد نگهداری می‌شوند تا کیفیت رایحه و ماندگاری آن‌ها حفظ شود. ",
  },
  
  
];

const Page = () => {
  return (
    <>
      <section className="pt-6">
        <SectionTitle
          icon={<Phone className="fill-primary stroke-1" />}
          title="تماس با ما"
        />
      </section>
      <section>
        <Container>
          <div className="my-8 grid grid-cols-10 gap-8">
            {/* right */}
            <div className="bg-secondary-layout rounded-t-full! rounded-b-lg! col-span-10 lg:col-span-3">
              <p className="mt-8 text-center text-primary ">
                - راه های ارتباطی ما -
              </p>
              <p className="mt-5 leading-8 text-sm">
                از اینکه با ما در ارتباط هستید خوشحالیم. تیم پشتیبانی فروشگاه
                Mark Perfume همواره آماده است تا پاسخگوی سوالات شما درباره
                محصولات، سفارش‌ها و همکاری‌ها باشد. هدف ما ارائه خدمات سریع‌تر و
                بهتر به شماست.
              </p>
              {/* contact-info */}
              <div className="flex flex-col gap-5">
                <Link href={"/tel-"} className="flex items-center gap-2">
                  <Phone className="size-3.5 fill-primary stroke-1" />
                  ۰۹۱۲۳۴۵۶۷۸۹
                </Link>
                <Link href={"/tel-"} className="flex items-center gap-2">
                  <Mail className="size-3.5 text-primary" />
                  info@markperfume.ir
                </Link>
                <Link href={"/tel-"} className="flex items-center gap-2">
                  <Map className="size-3.5 text-primary" />
                  آدرس: شیراز، معالی آباد پلاک 2
                </Link>
              </div>
            </div>
            {/* left */}
            <div className="lg:col-span-7 col-span-10">
              <div className="w-full h-full bg-secondary-layout bg-cover rounded-tr-[160px]!  min-h-100" style={{backgroundImage:"url(/images/map.jpg)"}}></div>
            </div>
          </div>
          {/* Faq & Contact Form  */}
          <div className="my-12 grid grid-cols-10 gap-8">
            <div className="bg-secondary-layout rounded-tl-[140px]! lg:col-span-7 col-span-10 overflow-hidden">
              <p className="text-primary text-center mt-5">- سوالات متداول -</p>
              <Accordion
                type="single"
                dir="rtl"
                collapsible
                defaultValue="item-1"
                className="w-full gap-3  lg:mt-8 lg:p-3 p-1 text-right!"
              >
                {items.map((item) => (
                  <AccordionItem
                    className="bg-white! border border-grey220 rounded-sm p-1 lg:p-2"
                    key={item.value}
                    value={item.value}
                  >
                    <AccordionTrigger >{item.trigger}</AccordionTrigger>
                    <AccordionContent className="text-xs p-1">{item.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            {/* form contact */}
            <div className="bg-secondary-layout rounded-t-full! rounded-b-lg! lg:col-span-3 col-span-10">
                <p className="text-primary text-center">- فرم تماس با ما -</p>
            <form className="flex mt-10 gap-2 w-full px-2 flex-col items-center">
                <InputGroupInlineStart element="input" icon={<User className="size-5 text-primary"/>} placeholder="نام و نام خانوادگی"/>
                <InputGroupInlineStart element="input" icon={<Mail className="size-5 text-primary"/>} placeholder="آدرس ایمیل"/>
                <InputGroupInlineStart element="input" icon={<Pencil className="size-5 text-primary"/>} placeholder="موضوع پیام"/>
                <InputGroupInlineStart element="textarea"  placeholder="متن پیام"/>
                <Button className="w-fit px-12 py-2" variant={"default"}>ارسال</Button>
            </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Page;
