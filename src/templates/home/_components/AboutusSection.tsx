import Container from "@/src/components/common/Container";
import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutusSection = () => {
  return (
    <section className="pt-24">
      <Container>
        <div className="w-full relative ">
          <div className="lg:w-[90%] w-full py-8 px-5 bg-center bg-cover border border-grey220 rounded-lg bg-secondary bg-[url('/images/about-background.png')] bg-no-repeat ">
            <Image
              src={"/images/about-index.png"}
              className="lg:size-52 mx-auto -mt-45 w-full static max-w-75 lg:absolute lg:left-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2"
              width={475}
              height={475}
              alt="aboutus image"
            />
            <div className="flex items-center lg:items-start flex-col gap-4 lg:w-[85%]">
              <h3 className="flex items-start gap-2 text-lg lg:text-xl font-bold">
                <CircleQuestionMark className="text-primary" />
                درباره فروشگاه ما{" "}
              </h3>
              <p className="text-justify leading-6 lg:leading-8 text-sm lg:text-balance">
                {" "}
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
                  <button className="bg-primary text-white rounded-sm text-sm flex items-center py-2 px-5 border border-grey220 ">
                    بیشتر بخوانید
                  </button>
                </Link>
                <Link href={"/aboutus"}>
                  <button className="bg-white text-primary rounded-sm text-sm flex items-center py-2 px-5 border border-grey220 ">
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
