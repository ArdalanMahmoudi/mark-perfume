import Container from "@/src/components/common/Container";
import Image from "next/image";
import React from "react";

const ShopIntroductionSection = () => {
  return (
    <section className="mt-24 lg:mt-48">
      <Container>
        <div className="flex flex-col lg:flex-row relative p-5 justify-between items-center gap-7.5 rounded-lg bg-secondary border border-grey220 lg:py-10 lg:px-5">
          <div className="flex-1">
            <p className="leading-8 text-center text-sm lg:text-balance">
              ما مجموعه‌ای از برترین ادکلن‌های اصل و باکیفیت را از برندهای مطرح
              دنیا گردآوری کرده‌ایم. هدف ما ارائه رایحه‌هاییست که شخصیت شما را
              کامل‌تر کنند.
            </p>
          </div>

          <div className="basis-62 relative flex items-center">
            <Image
            className="lg:absolute w-full max-w-62.5 lg:max-w-none"
              width={575}
              height={755}
              src={"/images/shop-introduction.png"}
              alt="shop-introduction img"
            />
          </div>

          <div className="flex-1">
            <p className="leading-8 text-center text-sm lg:text-balance">
              هر ادکلن داستان خودش را دارد. در انتخاب بهترین رایحه کنار شما
              هستیم تا انتخابی دقیق، ماندگار و مطابق روحیه‌تان داشته باشید
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ShopIntroductionSection;
