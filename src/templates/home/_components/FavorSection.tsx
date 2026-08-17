import Container from "@/src/components/common/Container";
import { Handshake } from "lucide-react";
import Image from "next/image";
import React from "react";
import FavorItem from "./FavorItem";

const FavorSection = () => {
  return (
    <section className="mt-32 mb-20 ">
      <Container>
        <div className="flex flex-col  lg:flex-row items-center lg:flex-wrap relative">
          <div className="static flex justify-center w-full -mb-45 z-10 lg:mb-0 lg:w-1/5 lg:absolute lg:right-0">
            <Image
              className="w-full max-w-62.5 lg:max-w-none"
              width={575}
              height={755}
              src={"/images/favor.png"}
              alt="favor img"
            />
          </div>
          <div className="bg-secondary rounded-lg border border-grey220 lg:w-[90%] lg:pt-15 lg:pb-15 lg:px-5 lg:justify-end lg:items-center lg:ms-[10%] flex flex-col lg:flex-row gap-5 w-full pt-55 pb-5 px-7.5   items-center ">
            <div className="flex flex-col flex-wrap gap-8 items-center lg:items-start lg:w-2/5">
              <div className="flex flex-col lg:flex-row gap-1 items-center">
                <Handshake className="text-primary size-5" />
                <h3 className="text-xl"> افتخارات و اعتماد مشتریان</h3>
              </div>
              <p className="leading-8 text-sm lg:text-balance text-center lg:text-start">
                اعتماد شما سرمایه‌ی اصلی ماست و همواره تلاش می‌کنیم در ارائه
                بهترین خدمات و محصولات پیشگام باشیم.{" "}
              </p>
            </div>
            <div className=" flex items-center gap-9 justify-center lg:w-2/5">
              <FavorItem count={3000} title={" بازدید ماهانه"} />
              <FavorItem count={5000} title={" سفارش"} />
              <FavorItem count={2500} title={"مشتری راضی"} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FavorSection;
