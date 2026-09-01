"use client";
import Container from "@/src/components/common/Container";
import SectionTitle from "./SectionTitle";
import { Flame } from "lucide-react";
import Image from "next/image";
import Slider from "@/src/components/common/Slider";
import ProductCard from "@/src/components/common/ProductCard";
import { ProductType, ProductWithScoreType } from "@/src/lib/types/product.type";

const OfferSection = ({products}:{products:ProductWithScoreType[]}) => {
  return (
    <section>
      <Container>
        <div className="my-24 flex flex-col">
          <SectionTitle icon={<Flame />} title="پیشنهاد شگفت انگیز" />
          <div className="flex flex-wrap md:flex-nowrap justify-between mt-5 gap-7">
            {/* Right */}
            <div className="w-full  md:w-82.5">
              <div className="rounded-lg h-full rounded-tl-[12rem] border border-grey220 bg-secondary p-5 flex flex-col gap-2.5 justify-center items-center">
                <p className="mt-5 font-bold leading-8">زمان را از دست ندهید</p>
                {/* timer */}
                <div className="flex items-center justify-center gap-2.5">
                  <div className="flex flex-col items-center gap-2.5 text-xs">
                    <span className="size-10 rounded-md flex justify-center items-center bg-primary font-bold text-white">
                      ۴۷
                    </span>
                    دقیقه
                  </div>
                  <div className="flex flex-col items-center gap-2.5 text-xs">
                    <span className="size-10 rounded-md flex justify-center items-center bg-primary font-bold text-white">
                      ۱۴
                    </span>
                    ساعت
                  </div>
                  <div className="flex flex-col items-center gap-2.5 text-xs">
                    <span className="size-10 rounded-md flex justify-center items-center bg-primary font-bold text-white">
                      ۲
                    </span>
                    روز
                  </div>
                </div>
                {/* img */}
                <Image
                  src={"/images/special-offer.png"}
                  width={345}
                  height={245}
                  className="w-full max-h-62.5"
                  alt="special offer image"
                />
              </div>
            </div>
            {/* Left */}
            <div className="w-full md:w-[calc(100%-350px)] flex-1">
              <Slider
                loop
                autoplay
                slidesToShow={{ default: 1, sm: 1, md: 2, lg: 3 }}
                slides={products.map((product) => (
                  <ProductCard key={product.id}  product={product}/>
                ))}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OfferSection;
