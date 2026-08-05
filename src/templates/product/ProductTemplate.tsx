"use client";
import BreadCrumbs from "@/src/components/common/BreadCrumbs";
import Container from "@/src/components/common/Container";
import DOMPurify from "isomorphic-dompurify";
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
import { ProductType } from "@/src/lib/types/product.type";
import { discountCalculator } from "@/src/lib/helper";
import { notFound } from "next/navigation";

const ProductTemplate = ({ product }: { product: ProductType }) => {
  if (!product) {
    notFound();
  }
  const links = [
    { href: "/", label: "خانه" },
    { href: "/shop", label: "فروشگاه" },
    { href: "/", label: product?.name },
  ];

  const totalPrice = discountCalculator(product.price, product.discount);
  return (
    <main>
      <div className="lg:hidden fixed inset-x-0 bottom-0 w-full bg-white z-30 p-4  border-t border-grey220 py-2">
        <div className="flex justify-between items-center my-4">
          <button className="bg-primary text-sm text-white w-fit px-3 py-2 text-center rounded-sm cursor-pointer border border-grey220 transition-all duration-200 hover:bg-white hover:text-primary">
            افزودن به سبد خرید
          </button>
          <div className="flex flex-col gap-1">
            <div className="flex items-end gap-1">
              {product.discount && (
                <>
                  <span className="text-sm font-bold text-gray-500 line-through">
                    {Number(product.price).toLocaleString("fa-IR")} تومان
                  </span>
                  <div className="size-5 rounded-full text-white bg-primary flex items-center justify-center">
                    <span className="text-xs">
                      {Number(product.discount).toLocaleString("fa-IR")}%
                    </span>
                  </div>
                </>
              )}
              
            </div>
            <span className="lg:text-lg text-sm font-bold">
              {Number(totalPrice).toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>
      </div>
      <BreadCrumbs
        links={links}
        secondTextClass="w-40 lg:w-full line-clamp-1"
        classNameWrapper={true}
      />
      <section>
        <Container>
          <div className="grid grid-cols-10 bg-secondary  rounded-lg p-2 lg:p-5 my-8  gap-5 border border-grey220">
            {/* right */}
            <div className="col-span-10 lg:col-span-3">
              <Gallery
                gallery={product.gallery}
                plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
              />
            </div>
            {/* middle */}
            <div className="col-span-10 lg:col-span-4">
              <div className="flex flex-col items-center lg:items-start gap-4">
                {/* p-name */}
                <h1 className="text-primary lg:leading-8 leading-6 font-bold text-center lg:text-start">
                  {product.name}
                </h1>
                {/* p-lName */}
                <p className="text-xs text-gray-500">
                  {product.latinName && product.latinName}
                </p>
                {/* meta */}
                <div className="flex gap-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="fill-warning300 stroke-1 stroke-warning300 size-3.5"
                      />
                    ))}
                  </div>
                  <MessageCircle className="text-primary fill-primary size-3.5" />
                  <Heart className="text-error500 fill-error500 size-3.5" />
                  <ChartLine className="text-primary  size-3.5" />
                </div>
                {/* detail */}
                <div
                  className="product-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.details ?? ""),
                  }}
                />
              </div>
            </div>
            {/* left */}
            <div className="col-span-10 lg:col-span-3">
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
                  icon={<ArrowRightLeftIcon className="text-primary size-4" />}
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

                {/* Price-desktop */}
                <div className="hidden lg:flex flex-col">
                  <div className="flex justify-between items-center my-4">
                    <div className="flex flex-col gap-1">
                      {product.discount && (
                        <span className="text-sm font-bold text-gray-500 line-through">
                          {Number(product.price).toLocaleString("fa-IR")} تومان
                        </span>
                      )}
                      <span className="lg:text-lg text-base font-bold">
                        {Number(totalPrice).toLocaleString("fa-IR")} تومان
                      </span>
                    </div>
                    <div className="size-9 rounded-full text-white bg-primary flex items-center justify-center">
                      <span>
                        {Number(product.discount).toLocaleString("fa-IR")}%
                      </span>
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
          </div>
        </Container>
      </section>
      {/* Product-Tabs */}
      <ProductTabs
        description={product.description}
        volume={product.volume}
        specification={product.specification}
        comments={product.comments}
        productId={product.id}
      />
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
              slides={Array.from({ length: 5 }).map(() => (
                <ProductCard product={product} />
              ))}
            />
          </div>
        </Container>
      </section>
    </main>
  );
};

export default ProductTemplate;
