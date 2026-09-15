"use client";
import Container from "@/src/components/common/Container";
import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParallax } from "@/src/hooks/useParallax";

const AboutusSection = () => {

  const { ref, y } = useParallax({ range: [-30, 30] });

  return (
    <section className="pt-24">
      <Container>
        <div className="w-full relative">
          <div
            className="lg:w-[90%] bg-secondary-layout lg:flex-row! w-full py-8! px-5! bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: "url('/images/about-background.png')" }}
          >
            <div
              ref={ref}
              className="mx-auto -mt-45 w-full max-w-75 static
                lg:absolute lg:left-0 lg:top-0 lg:mt-0 lg:h-full lg:w-52 lg:max-w-none
                lg:overflow-hidden lg:flex lg:items-center lg:justify-center"
            >
              <motion.div style={{ y }} className="w-full">
                <Image
                  src={"/images/about-index.png"}
                  className="w-full h-auto lg:size-52 mx-auto"
                  width={475}
                  height={475}
                  alt="تصویر بخش درباره فروشگاه"
                  priority
                />
              </motion.div>
            </div>

            <div className="flex items-center lg:items-start flex-col gap-4 lg:w-[85%] mt-4 lg:mt-0">
              <h3 className="flex items-start gap-2 text-lg lg:text-xl font-bold">
                <CircleQuestionMark className="text-primary" />
                درباره فروشگاه ما{" "}
              </h3>
              <p className="text-justify leading-6 lg:leading-8 text-sm lg:text-balance">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد و
                متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
                طراحان گرافیک حرفه ای است.لورم ایپسوم متن ساختگی با تولید سادگی
                نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها
                و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.{" "}
              </p>
              <div className="flex flex-wrap items-center gap-1 lg:gap-4">
                <Link href={"/aboutus"}>
                  <button className="bg-primary text-white rounded-sm text-sm flex items-center py-2 px-5 border border-grey220">
                    بیشتر بخوانید
                  </button>
                </Link>
                <Link href={"/aboutus"}>
                  <button className="bg-white text-primary rounded-sm text-sm flex items-center py-2 px-5 border border-grey220">
                    تماس بگیرید
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutusSection;