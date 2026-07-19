import Container from "@/src/components/common/Container";
import { Star } from "lucide-react";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import CommentForm from "./CommentForm";

const ProductTabs = () => {
  const activeTabStyle =
    "data-[state=active]:bg-primary data-[state=active]:text-white ";
  return (
    <section>
      <Container>
        <div className="border border-grey220 my-8 bg-secondary rounded-lg p-5 ">
          <Tabs dir="rtl" defaultValue="description">
            <TabsList
              className="text-lg  bg-transparent! px-0 gap-1 border-b! border-b-grey220! min-h-10! w-full"
              dir="rtl"
            >
              <TabsTrigger
                value="description"
                className={`${activeTabStyle} rounded-t-xs!  border-b-0! rounded-b-none! w-fit! text-black bg-white border! border-grey220! py-1! leading-8 px-3.5! transition-all duration-200 cursor-pointer min-h-10!`}
              >
                توضیحات
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className={`${activeTabStyle} rounded-t-xs!  border-b-0! rounded-b-none! w-fit! text-black bg-white border! border-grey220! py-1! leading-8 px-3.5! transition-all duration-200 cursor-pointer min-h-10!`}
              >
                توضیحات تکمیلی
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className={`${activeTabStyle} rounded-t-xs!  border-b-0! rounded-b-none! w-fit! text-black bg-white border! border-grey220! py-1! leading-8 px-3.5! transition-all duration-200 cursor-pointer min-h-10!`}
              >
                نظرات{(1).toLocaleString('fa-IR')}
              </TabsTrigger>
            </TabsList>
            <div className="mt-5">
              <TabsContent value="description">
                <p className="leading-8">
                  {" "}
                  عطر Floral Bloom Eau De Parfum، عطری زنانه و جذاب است که در
                  حجم ۱۰۰ میلی‌لیتر عرضه می‌شود. این ادوپرفیوم با بهره‌گیری از
                  ترکیبات غنی از گل‌های بهاری و نت‌های گلی، رایحه‌ای دلنشین و
                  زنانه را خلق کرده است. این عطر حس طراوت، شادابی و لطافت را
                  تداعی می‌کند و تجربه‌ای دلپذیر از طبیعت گل‌ها را برای شما به
                  ارمغان می‌آورد. ماندگاری قابل قبول و پخش بوی متعادل این عطر،
                  آن را به انتخابی مناسب برای استفاده در طول روز و در موقعیت‌های
                  مختلف، از قرارهای روزانه تا مهمانی‌های شبانه، تبدیل کرده است.
                  Floral Bloom Eau De Parfum، عطری است که به خوبی شخصیت لطیف و
                  در عین حال با اعتماد به نفس بانوان را منعکس می‌کند و انتخابی
                  ایده‌آل برای کسانی است که به دنبال رایحه‌ای امضای خاص و به یاد
                  ماندنی هستند. بطری عطر Floral Bloom Eau De Parfum، با طراحی
                  شیک و مینیمال خود، بازتابی از لطافت درون رایحه است؛ شیشه‌ای
                  شفاف که مایع صورتی یا هلویی‌رنگ درون آن، حس گرمای یک غروب
                  بهاری را القا می‌کند. این عطر، با الهام از باغ‌های پر از
                  شکوفه، نت‌های بالایی مرکباتی و تازه‌ای دارد که به سرعت جای خود
                  را به قلب تپنده‌ای از گل‌های رز، یاسمن و مگنولیا می‌دهد. در
                  نهایت، رایحه با نت‌های پایانی چوبی، مشک و عنبر تثبیت می‌شود که
                  عمق و ماندگاری این تجربه بویایی را تضمین می‌کند. این ترکیب
                  هنرمندانه، Floral Bloom را به یک عطر همه‌کاره تبدیل کرده که
                  برای هر فصل و هر لحظه‌ای از زندگی مناسب است.{" "}
                </p>
              </TabsContent>
              <TabsContent value="details">
                <table className="w-full border-collapse">
                  <tbody>
                    {Array.from({ length: 8 }).map((item, idx) => (
                      <tr
                        className={`w-full   ${idx % 2 === 0 ? "bg-white" : "bg-transparent"}`}
                      >
                        <td className="p-2.5 w-1/3">حجم</td>
                        <td className="p-2.5 w-full"> ۱۰۰ میلی‌لیتر </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>
              <TabsContent value="comments">
                <div className="grid grid-cols-2 gap-5">
                  {/* right */}
                  <div className="lg:col-span-1">
                    <p className="text-lg font-bold">نقد و بررسی ها</p>
                    {/* comments */}
                    <div className="w-full bg-white rounded-lg my-5 p-4 flex gap-4 items-center border border-grey220">
                      <Image
                        src={""}
                        width={200}
                        height={200}
                        className="size-20 rounded-full"
                        alt="user img"
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between gap-2.5 w-full">
                          <p className="text-primary text-lg flex items-center gap-1">
                            <span>Ardal</span>
                            <span className="text-gray-500 text-xs">
                              1405/04/19
                            </span>
                          </p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((item) => (
                              <Star className="fill-warning300 stroke-1 stroke-warning300 size-3.5" />
                            ))}
                          </div>
                        </div>
                        {/* body-comment */}
                        <p className="text-lg">
                          عالی بود کاملا راضی بودم و دوباره سفارش دادم{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* left */}
                  <div className="lg:col-span-1">
                    <CommentForm />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </Container>
    </section>
  );
};

export default ProductTabs;
