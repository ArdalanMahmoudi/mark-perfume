import React from "react";
import SectionTitle from "../home/_components/SectionTitle";
import { CircleQuestionMarkIcon } from "lucide-react";
import Container from "@/src/components/common/Container";
import Image from "next/image";

const AboutUsTemplate = () => {
  return (
    <>
      <section className="pt-6">
        <SectionTitle
          icon={<CircleQuestionMarkIcon className="text-xl" />}
          title="درباره ما"
        />
      </section>
      {/* About us  */}
      <section>
        <Container>
          <div className="grid col-span-1 lg:grid-cols-2 my-8">
            {/* Content-Part */}
            <div className="flex  lg:order-1 order-2 flex-col gap-3.5 text-center lg:text-start">
              <h2 className="text-primary text-xl font-bold mt-6 lg:mt-0">
                درباره مجموعه ما بیشتر بدانید...
              </h2>
              <p className="leading-8 lg:text-base text-sm">
                فروشگاه Mark Perfume با هدف ارائه‌ی بهترین و باکیفیت‌ترین عطرها
                و ادکلن‌های اورجینال فعالیت خود را آغاز کرده است. ما بر این
                باوریم که انتخاب یک عطر مناسب، تنها خرید یک محصول نیست؛ بلکه
                تجربه‌ای احساسی و ماندگار است که می‌تواند امضای شخصیتی هر فرد را
                شکل دهد. عطر قادر است خاطرات را زنده کند، حال و هوای انسان را
                تغییر دهد و تأثیر عمیقی بر اطرافیان بگذارد. به همین دلیل،
                ارائه‌ی محصولاتی اصل و باکیفیت برای ما یک وظیفه و رسالت مهم به
                شمار می‌آید.{" "}
              </p>
              <p className="leading-8 lg:text-base text-sm">
                در فروشگاه ما می‌توانید مجموعه‌ای گسترده از عطرها و ادکلن‌های
                زنانه و مردانه از معتبرترین و شناخته‌شده‌ترین برندهای جهانی را
                بیابید. ما همواره تلاش می‌کنیم با تنوع بالای رایحه‌ها، پاسخگوی
                سلیقه‌های متفاوت مشتریان باشیم؛ چه کسانی که به دنبال عطرهای
                شیرین و ملایم هستند، چه آن‌هایی که عطرهای گرم، تند یا خاص را
                ترجیح می‌دهند.{" "}
              </p>
              <p className="leading-8 lg:text-base text-sm">
                تیم ما علاوه بر تأمین محصولات اصل، به ارائه‌ی خدماتی حرفه‌ای نیز
                پایبند است. از قیمت‌گذاری منصفانه گرفته تا پشتیبانی دائمی و
                ارسال سریع، همه در جهت خلق تجربه‌ای متفاوت از خرید عطر آنلاین
                برای شما فراهم شده است. هدف ما تنها فروش نیست؛ بلکه ایجاد
                رابطه‌ای بلندمدت با مشتریان و تبدیل شدن به مرجعی مطمئن برای خرید
                عطرهای اورجینال است.{" "}
              </p>
              <p className="leading-8 lg:text-base text-sm">
                ما باور داریم هر فرد شایسته‌ی این است که عطری خاص و منحصربه‌فرد
                داشته باشد. به همین دلیل، در Mark Perfume تلاش می‌کنیم با
                مشاوره‌ی تخصصی و معرفی جدیدترین محصولات، شما را در انتخابی
                آگاهانه و لذت‌بخش همراهی کنیم.{" "}
              </p>
            </div>
            {/* Image-Part */}
            <div className="flex lg:order-2 order-1 justify-end">
              <Image
                src={"/images/aboutus1.png"}
                width={600}
                height={650}
                className="max-w-125 w-full"
                alt="about us"
              />
            </div>
          </div>
        </Container>
      </section>
      {/*  About Details  */}
      <section>
        <Container>
          <div className="my-20 grid grid-cols-1 lg:grid-cols-4 gap-6 ">
            {/* item-1 */}
            <div className="flex">
              <div className="w-3 h-15 mt-5 bg-primary rounded-r-sm"></div>
              <div className="bg-secondary-layout text-sm">
                <p className="text-primary font-bold">تضمین اصالت کالا</p>
                <p>
                  تمام عطرها و ادکلن‌های موجود در فروشگاه اصل و دارای ضمانت
                  اصالت هستند.{" "}
                </p>
              </div>
            </div>
            {/* item-1 */}
            <div className="flex">
              <div className="w-3 h-15 mt-5 bg-primary rounded-r-sm"></div>
              <div className="bg-secondary-layout text-sm">
                <p className="text-primary font-bold">تضمین اصالت کالا</p>
                <p>
                  تمام عطرها و ادکلن‌های موجود در فروشگاه اصل و دارای ضمانت
                  اصالت هستند.{" "}
                </p>
              </div>
            </div>
            {/* item-1 */}
            <div className="flex">
              <div className="w-3 h-15 mt-5 bg-primary rounded-r-sm"></div>
              <div className="bg-secondary-layout text-sm">
                <p className="text-primary font-bold">تضمین اصالت کالا</p>
                <p>
                  تمام عطرها و ادکلن‌های موجود در فروشگاه اصل و دارای ضمانت
                  اصالت هستند.{" "}
                </p>
              </div>
            </div>
            {/* item-1 */}
            <div className="flex">
              <div className="w-3 h-15 mt-5 bg-primary rounded-r-sm"></div>
              <div className="bg-secondary-layout text-sm">
                <p className="text-primary font-bold">تضمین اصالت کالا</p>
                <p>
                  تمام عطرها و ادکلن‌های موجود در فروشگاه اصل و دارای ضمانت
                  اصالت هستند.{" "}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* Perfume History  */}
      <section>
        <Container>
          <div className="mt-8 mb-12 grid lg:grid-cols-5 grid-cols-1 items-center gap-8">
            <div className="col-span-1 text-center">
              <Image
                src={"/images/aboutus2.png"}
                className="rounded-sm max-w-125 w-full"
                width={700}
                height={700}
                alt="history"
              />
            </div>
            {/* Content Part */}
            <div className="lg:col-span-4 col-span-1 flex flex-col gap-5 text-sm lg:text-base text-center lg:text-start">
              <h3 className="text-primary text-xl font-bold">
                تاریخچه ای کوتاه درباره فروشگاه...
              </h3>
              <p className="leading-8">
                ایده‌ی راه‌اندازی <strong> Mark Perfume </strong> از علاقه‌ی
                عمیق ما به دنیای عطر و تجربه‌ی خریدی امن و لذت‌بخش شکل گرفت. از
                همان ابتدا تلاش کردیم با گردآوری مجموعه‌ای متنوع از محبوب‌ترین
                برندهای دنیا و ارائه‌ی خدماتی حرفه‌ای، رضایت مشتریان را به دست
                آوریم.
              </p>
              <p className="leading-8">
              امروز خوشحالیم که توانسته‌ایم اعتماد مشتریان زیادی را جلب کنیم و
              در مسیر رشد و گسترش این فروشگاه گام برداریم. هدف ما در آینده
              نزدیک، افزایش تنوع محصولات و ارائه‌ی تجربه‌ی خریدی مدرن‌تر و
              راحت‌تر است.
            </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AboutUsTemplate;
