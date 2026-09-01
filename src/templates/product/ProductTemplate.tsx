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
import {
  ProductCardStoreType,
  ProductType,
  WishCardType,
} from "@/src/lib/types/product.type";
import { CommentType } from "@/src/lib/types/comment.type";
import { notFound } from "next/navigation";
import { calculatedDiscountedPrice } from "@/src/lib/helper";
import { useToast } from "@/src/context/toast-context";
import { TooltipDemo } from "@/src/components/common/Tooltip";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { useCartStore } from "@/src/stores/cart-store";
import { useWishlistStore } from "@/src/stores/wishlist-store";
import { Prisma } from "@/src/generated/prisma/client";
import MobileAddToCartBar from "./_components/MobileAddToCartBar";

type ProductTemplatePropsType = {
  product: Omit<ProductType, "comments">;
  initialComments: Prisma.CommentGetPayload<{
    select: {
      id: true;
      score: true;
      body: true;
      createdAt: true;
      adminReply: true;
      replyedAt: true;
      status: true;
      user: {
        select: {
          username: true;
          image: true;
        };
      };
    };
  }>[];
  initialCursor: string | null;
};

const ProductTemplate = ({
  product,
  initialComments,
  initialCursor,
}: ProductTemplatePropsType) => {
  if (!product) {
    notFound();
  }

  const links = [
    { href: "/", label: "خانه" },
    { href: "/shop", label: "فروشگاه" },
    { href: "/", label: product?.name },
  ];

  const addToCart = useCartStore((state) => state.addToCart);
  const toast = useToast();
  const wishList = useWishlistStore((state) => state.wishList);
  const addToWishList = useWishlistStore((state) => state.addToWishList);
  const removeFromWishList = useWishlistStore(
    (state) => state.removeFromWishList,
  );

  const isInWishlist = wishList.some((p) => p.id === product.id);

  const addToCartHandler = (product: Omit<ProductCardStoreType, "qty">) => {
    addToCart(product);
    toast.success("محصول به سبد خرید اضافه شد");
  };

  const wishListHandler = (product: WishCardType) => {
    if (isInWishlist) {
      removeFromWishList(product.id);
      toast.success("محصول از لیست علاقه مندی حذف شد");
    } else {
      addToWishList(product);
      toast.success("محصول به لیست علاقه‌مندی ها اضافه شد");
    }
  };

  return (
    <>
      {/* AddToCartButtonMobile-Start */}
      <MobileAddToCartBar
        price={product.price}
        discount={product.discount}
        stock={product.stock}
        onAddToCart={() => addToCartHandler(product)}
      />
      <div className="pb-20 lg:pb-0">

      
      {/* AddToCartButtonMobile-End */}
      <BreadCrumbs
        links={links}
        secondTextClass=" lg:w-full line-clamp-1"
        classNameWrapper={true}
      />

      <section>
        <Container>
          <div className="grid grid-cols-10 bg-secondary rounded-lg p-2 lg:p-5 gap-5 border border-grey220">
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
                <h1 className="text-primary lg:leading-8 leading-6 font-bold text-center lg:text-start">
                  {product.name}
                </h1>

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
                  <ChartLine className="text-primary size-3.5" />
                </div>

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
                      {product.discount > 0 && (
                        <span className="text-sm font-bold text-gray-500 line-through">
                          {Number(product.price).toLocaleString("fa-IR")} تومان
                        </span>
                      )}
                      <span className="lg:text-lg text-base font-bold">
                        {Number(
                          calculatedDiscountedPrice({
                            price: product.price,
                            discount: product.discount,
                          }),
                        ).toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                    </div>
                    {product.discount > 0 && (
                      <div className="size-9 rounded-full text-white bg-primary flex items-center justify-center">
                        <span>
                          {Number(product.discount).toLocaleString("fa-IR")}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* qty */}
                  <div className="flex gap-2 items-center justify-between w-full">
                    <input
                      type="number"
                      className="w-10 p-1 outline-0 text-xs"
                      placeholder="1"
                      min={1}
                    />
                    <button
                      onClick={() => addToCartHandler(product)}
                      disabled={product.stock === 0}
                      className="bg-primary text-sm text-white w-full py-1 text-center rounded-xs cursor-pointer border border-grey220 transition-all duration-200 hover:bg-white hover:text-primary"
                    >
                      افزودن به سبد خرید
                    </button>
                    <TooltipProvider>
                      <TooltipDemo
                        btn={
                          <button
                            onClick={() => wishListHandler(product)}
                            className="cursor-pointer text-black "
                          >
                            <Heart
                              className={`size-6 text-black ${isInWishlist ? "fill-red-600 stroke-red-600" : "fill-white"}`}
                            />
                          </button>
                        }
                        textTolltip={
                          isInWishlist
                            ? "حذف از علاقه‌مندی"
                            : "افزودن به علاقه مندی"
                        }
                      />
                    </TooltipProvider>
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
        specification={
          product.specification as { key: string; value: string }[]
        }
        initialComments={initialComments}
        initialCursor={initialCursor}
        productId={product.id}
      />

      {/* Related-Product */}
      <section>
        <Container>
          <div className="mt-8 flex flex-col gap-5">
            <SectionTitle
              title="محصولات مرتبط"
              icon={<Link className="size-5 text-primary" />}
            />
            <Slider
              autoplay
              loop
              slidesToShow={{ default: 1, sm: 1, md: 2, lg: 4 }}
              slides={Array.from({ length: 5 }).map((_, idx) => (
                <ProductCard key={idx} product={product} />
              ))}
            />
          </div>
        </Container>
      </section>
      
      </div>
    </>
  );
};

export default ProductTemplate;
