import BreadCrumbs from "@/src/components/common/BreadCrumbs";
import Container from "@/src/components/common/Container";
import {
  Calendar,
  MessageCircle,
  Newspaper,
  NewspaperIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const links = [
    { href: "/", label: "خانه" },
    { href: "/blogs", label: "مقالات" },
    { href: "/", label: slug },
  ];
  return (
    <>
      <BreadCrumbs
        links={links}
        secondTextClass=" lg:w-full line-clamp-1"
        classNameWrapper={true}
      />
      <section>
        <Container>
          <div className="grid grid-cols-[repeat_1_1fr] lg:grid-cols-[1fr_320px] gap-8 my-4 lg:my-8 p-2 lg:p-5 ">
            {/* template-blog */}
            <div className="p-5 bg-secondary rounded-md flex flex-col gap-4 border border-grey220">
              <Image
                src={"/images/article/johnwin-article.jpg"}
                width={1000}
                height={500}
                className="w-full rounded-md"
                alt="johnwin article"
              />
              <h1 className="mt-2.5 text-center">
                بهترین ادکلن‌های برند Johnwin
              </h1>
              <div className="flex py-1 gap-5 border-b border-primary">
                <div className="flex gap-1 text-xs text-primary">
                  <Calendar size={14} />
                  <p>شهریور ۲۸, ۱۴۰۴</p>
                </div>
                <div className="flex gap-1 text-xs text-primary">
                  <MessageCircle size={14} />
                  <p>بدون دیدگاه</p>
                </div>
              </div>
              <p>
                برند جان وین (Johnwin) یکی از برندهای محبوب و پرطرفدار در دنیای
                عطر و ادکلن است که به‌ویژه در خاورمیانه و ایران، طرفداران زیادی
                پیدا کرده. این برند اماراتی با الهام از عطرهای معروف جهانی،
                محصولاتی باکیفیت و قیمت مناسب تولید می‌کند. اگر به دنبال
                ادکلن‌هایی شیک، ماندگار و مقرون به‌صرفه هستید، جان وین انتخابی
                عالی خواهد بود. در این مقاله به معرفی بهترین ادکلن‌های برند
                Johnwin می‌پردازیم.{" "}
              </p>
              <h2 className="text-xl">چرا ادکلن‌های Johnwin محبوب شده‌اند؟</h2>
              <p>
                Johnwin با تولید ادکلن‌هایی که رایحه‌ای مشابه برندهای لاکچری
                دارند، توانسته جایگاه ویژه‌ای در بازار عطر ایجاد کند. دلایل
                محبوبیت این برند:
              </p>
              <ul className="list-disc pr-6!">
                <li>کیفیت بالا و ماندگاری مناسب</li>
                <li>شباهت رایحه به عطرهای اصل و شناخته‌شده</li>
                <li>قیمت مناسب و اقتصادی</li>
                <li>طراحی شیشه‌های زیبا و شیک</li>
              </ul>
            </div>
            {/* sidebar */}
            <div className="border border-grey220 bg-secondary rounded-md h-fit sticky top-30 flex flex-col gap-5 p-5">
              {/* title */}
              <div className="fle flex-col gap-3.5">
                <div className="flex justify-center gap-1.5 items-center text-primary font-bold">
                  <NewspaperIcon size={18} />
                  آخرین مقالات
                </div>
              </div>
              {/* item */}
              <Link
                href={"/blogs"}
                className="flex gap-2.5 mt-5 items-center w-fit"
              >
                <Image
                  src={"/images/article/johnwin-article.jpg"}
                  className="size-15 rounded-full"
                  width={1000}
                  height={500}
                  alt="article link"
                />
                <div>
                  <p className="text-sm leading-8">رایحه ادکلن‌های ارض الزعفران</p>
                  <div className="text-xs leading-8 text-primary">۲۹ اسفند , ۱۴۰۴ بدون دیدگاه</div>
                </div>
              </Link>
              <Link
                href={"/blogs"}
                className="flex gap-2.5 mt-5 items-center w-fit"
              >
                <Image
                  src={"/images/article/johnwin-article.jpg"}
                  className="size-15 rounded-full"
                  width={1000}
                  height={500}
                  alt="article link"
                />
                <div>
                  <p className="text-sm leading-8">رایحه ادکلن‌های ارض الزعفران</p>
                  <div className="text-xs leading-8 text-primary">۲۹ اسفند , ۱۴۰۴ بدون دیدگاه</div>
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Page;
