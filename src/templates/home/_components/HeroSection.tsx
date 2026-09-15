"use client";
import Container from "@/src/components/common/Container";
import Image from "next/image";
import Slider from "@/src/components/common/Slider";
import { motion } from "framer-motion";
import Counter from "@/src/components/common/Counter";
import {
  containerVariants,
  fadeInVariants,
  itemVariants,
} from "@/src/lib/animation";

const heroImage = [
  { id: 1, src: "/images/slider1.png" },
  { id: 2, src: "/images/slider2.png" },
  { id: 3, src: "/images/slider3.png" },
];

export const heroItems = [
  { id: 1, count: 2340, title: "رضایت مشتری", desc: "مشتریانی از سراسر کشور" },
  { id: 2, count: 1000, title: "محصول اصل", desc: "محصولاتی از دل آمریکا" },
  { id: 3, count: 4000, title: "کاربر فعال", desc: "در سایت ما عضو شده اند" },
];

const HeroSection = () => {
  return (
    <section className="pt-8">
      <Container>
        <div className=" grid grid-cols-3 justify-between items-center lg:gap-12">
          {/* right */}
          <div className="col-span-3 lg:col-span-2 lg:order-1 order-2 flex flex-col gap-7.5">
            <motion.h1
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="text-primary text-xl md:text-3xl lg:text-[40px] font-bold text-center lg:text-start"
            >
              با محصولات فروشگاه ما <br /> خوشـــبوتـرین فرد جمع باشید.{" "}
            </motion.h1>

            <motion.p
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="leading-8 text-justify text-sm lg:text-base"
            >
              {" "}
              در فروشگاه Mark Perfume ما گردآورنده‌ی مجموعه‌ای بی‌نظیر از عطرها
              و ادکلن‌های اورجینال از معتبرترین برندهای دنیا هستیم. هدف ما این
              است که شما تجربه‌ای متفاوت از خرید عطر آنلاین داشته باشید و
              رایحه‌ای خاص و ماندگار برای خود یا عزیزانتان انتخاب کنید. ما باور
              داریم هر عطر داستانی دارد و می‌تواند شخصیت، احساس و سلیقه‌ی
              منحصربه‌فرد شما را بازتاب دهد.
            </motion.p>

            {/* data */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid w-full grid-cols-3 my-5"
            >
              {heroItems.map((it) => (
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col lg:flex-row items-center gap-2.5"
                >
                  <div className="flex items-center">
                    <span className="w-3 h-10 rounded-s-md bg-primary"></span>
                    <div className="w-12.5 h-15 flex items-center justify-center rounded-l-4xl bg-secondary border border-green-220 gap-1">
                      <Counter end={it.count} suffix="+" />
                    </div>
                  </div>
                  <div>
                    <p className="text-primary font-bold text-sm lg:text-lg text-center md:text-start">
                      {it.title}
                    </p>
                    <p className="text-sm text-[10px] text-center md:text-start">
                      {it.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          {/* left */}
          <div className="col-span-3 lg:col-span-1 lg:order-2 order-1">
            <Slider
              navigation={true}
              slides={heroImage.map((i) => (
                <Image
                  key={i.id}
                  src={i.src}
                  width={600}
                  height={600}
                  alt="slide-1 image"
                />
              ))}
              slidesToShow={1}
              autoplay
              loop
            ></Slider>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
