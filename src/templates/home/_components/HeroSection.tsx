"use client";
import Container from "@/src/components/common/Container";
import HeroItem from "./HeroItem";
import Image from "next/image";
import Slider from "@/src/components/common/Slider";

const HeroSection = () => {
  return (
    <section>
      <Container>
        <div className="mt-12 grid grid-cols-3 justify-between items-center lg:gap-12">
          {/* right */}
          <div className="col-span-3 lg:col-span-2 lg:order-1 order-2 flex flex-col gap-7.5">
            <h1 className="text-primary text-xl md:text-3xl lg:text-[40px] font-bold text-center lg:text-start">
              با محصولات فروشگاه ما <br /> خوشـــبوتـرین فرد جمع باشید.{" "}
            </h1>
            <p className="leading-8 text-justify text-sm lg:text-base">
              در فروشگاه Mark Perfume ما گردآورنده‌ی مجموعه‌ای بی‌نظیر از عطرها
              و ادکلن‌های اورجینال از معتبرترین برندهای دنیا هستیم. هدف ما این
              است که شما تجربه‌ای متفاوت از خرید عطر آنلاین داشته باشید و
              رایحه‌ای خاص و ماندگار برای خود یا عزیزانتان انتخاب کنید. ما باور
              داریم هر عطر داستانی دارد و می‌تواند شخصیت، احساس و سلیقه‌ی
              منحصربه‌فرد شما را بازتاب دهد.
            </p>
            {/* data */}
            <div className="grid w-full grid-cols-3 my-5">
              <HeroItem
                count={270}
                title="رضایت مشتری"
                desc="مشتریانی از سراسر کشور"
              />
              <HeroItem
                count={1000}
                title="محصول اصل"
                desc="محصولاتی از دل آمریکا"
              />
              <HeroItem
                count={270}
                title="کاربر فعال"
                desc="در سایت ما عضو شده اند"
              />
            </div>
          </div>
          {/* left */}
          <div className="col-span-3 lg:col-span-1 lg:order-2 order-1">
            <Slider
              slides={Array.from({ length: 3 }).map((i) => (
                <Image
                  src={"/images/slider1.png"}
                  width={600}
                  height={600}
                  alt="slide-1 image"
                />
              ))}
              slidesToShow={1}
              autoplay
              loop
            >
             
            </Slider>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
