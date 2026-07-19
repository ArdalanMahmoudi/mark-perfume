"use client";
import BreadCrumbs from "@/src/components/common/BreadCrumbs";
import Container from "@/src/components/common/Container";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";

import Gallery from "./_components/Gallery";
import Autoplay from "embla-carousel-autoplay";
import {
  ArrowRightLeftIcon,
  ChartLine,
  CircleCheckIcon,
  Headphones,
  Heart,
  Link,
  MessageCircle,
  ShieldCheckIcon,
  Star,
  Truck,
  Wallet,
} from "lucide-react";

import IconBox from "./_components/IconBox";
import ProductTabs from "./_components/ProductTabs";
import SectionTitle from "../home/_components/SectionTitle";
import Slider from "@/src/components/common/Slider";
import ProductCard from "@/src/components/common/ProductCard";

const ProductTemplate = ({ product }) => {
  const links = [
    { href: "/", label: "خانه" },
    { href: "/shop", label: "فروشگاه" },
    { href: "/", label: product },
  ];

  const productImages = [
    // { id: "1", url: "/images/product/product1.png", alt: "product img" },
    { id: "1", url: "/images/product/product 1.jpg", alt: "product img" },
    { id: "2", url: "/images/product/product 2.jpg", alt: "product img" },
    { id: "3", url: "/images/product/product 3.jpg", alt: "product img" },
    { id: "4", url: "/images/product/product 4.jpg", alt: "product img" },
    // { id: "3", url: "/images/product/product 1.jpg", alt: "product img" },
  ];

  return (
    <>

      <main>
        <BreadCrumbs links={links} />
        <section>
          <Container>
            <div className="grid grid-cols-10 bg-secondary rounded-lg p-5 my-8 gap-5 border border-grey220">
              {/* right */}
              <div className="lg:col-span-3">
                <Gallery
                  images={productImages}
                  plugins={[
                    Autoplay({ delay: 3000, stopOnInteraction: false }),
                  ]}
                />
              </div>
              {/* middle */}
              <div className="lg:col-span-4">
                <div className="flex flex-col gap-4">
                  {/* p-name */}
                  <h1 className="text-primary leading-8 font-bold">
                    عطر Floral Bloom Eau De Parfum با حجم ۱۰۰ میلی‌لیتر
                  </h1>
                  {/* p-lName */}
                  <p className="text-xs text-gray-500">
                    Floral Bloom Eau De Parfum 100 ml{" "}
                  </p>
                  {/* meta */}
                  <div className="flex gap-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((item) => (
                        <Star className="fill-warning300 stroke-1 stroke-warning300 size-3.5" />
                      ))}
                    </div>
                    <MessageCircle className="text-primary fill-primary size-3.5" />
                    <Heart className="text-error500 fill-error500 size-3.5" />
                    <ChartLine className="text-primary  size-3.5" />
                  </div>
                  {/* detail */}
                  <p className="text-primary mt-5 font-bold">توضیحات محصول</p>
                  <ul className="list-disc mr-3 flex gap-4 flex-col text-sm text-justify">
                    <li>
                      این محصول از برند Maison Alhambra و ساخت کشور امارات است.
                    </li>
                    <li>
                      این عطر از ترکیبات باکیفیت و رایحه گل‌دار (Floral) ساخته
                      شده که بسیار دلنشین است.
                    </li>
                  </ul>
                </div>
              </div>
              {/* left */}
              <div className="lg:col-span-3">
                <div className="bg-white border border-grey220 p-5 rounded-lg flex flex-col gap-6">
                  <IconBox
                    icon={<Truck className="text-primary size-4" />}
                    title="ارسال توسط فروشگاه"
                  />
                  <IconBox
                    icon={<ShieldCheckIcon className="text-primary size-4" />}
                    title=" گارانتی اصالت و سلامت فیزیکی کالا "
                  />
                  <IconBox
                    icon={
                      <ArrowRightLeftIcon className="text-primary size-4" />
                    }
                    title="ضمانت تعویض کالا "
                  />
                  <IconBox
                    icon={<Wallet className="text-primary size-4" />}
                    title=" هزینه حمل به عهده خریدار "
                  />
                  <IconBox
                    icon={<Headphones className="text-primary size-4" />}
                    title="پشتیبانی 24 ساعته"
                  />
                  <IconBox
                    icon={<CircleCheckIcon className="text-primary size-4" />}
                    title=" موجود در انبار"
                  />
                  {/* Price */}
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500 line-through">
                        {(4_600_000).toLocaleString("fa-IR")} تومان
                      </span>
                      <span>{(4_500_000).toLocaleString("fa-IR")} تومان</span>
                    </div>
                    <div className="size-9 rounded-full text-white bg-primary flex items-center justify-center">
                      <span>{(12).toLocaleString("fa-IR")}%</span>
                    </div>
                  </div>
                  {/* qty */}
                  <div className="flex gap-1 items-center justify-between w-full">
                    <input
                      type="number"
                      className="w-10 p-1 outline-0 text-xs"
                      placeholder="1"
                      min={1}
                    />
                    <button className="bg-primary text-sm text-white w-full py-1 text-center rounded-xs cursor-pointer border border-grey220 transition-all duration-200 hover:bg-white hover:text-primary">
                      افزودن به سبد خرید
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
        {/* Product-Tabs */}
        <ProductTabs />
        {/* Related-Product */}
        <section>
          <Container>
            <div className="my-12 flex flex-col gap-5">
              <SectionTitle
                title="محصولات مرتبط"
                icon={<Link className="size-5 text-primary" />}
              />
              <Slider
                autoplay
                loop
                slidesToShow={{ default: 1, sm: 1, md: 2, lg: 4 }}
                slides={Array.from({ length: 5 }).map((p) => (
                  <ProductCard />
                ))}
              />
            </div>
          </Container>
        </section>
      </main>

    </>
  );
};

export default ProductTemplate;
