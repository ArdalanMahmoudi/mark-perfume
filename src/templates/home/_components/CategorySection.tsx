"use client";
import Container from "@/src/components/common/Container";
import SectionTitle from "./SectionTitle";
import { ChevronLeft, LayoutGrid } from "lucide-react";
import CategoryItem from "./CategoryItem";
import Slider from "@/src/components/common/Slider";
import { SwiperSlide } from "swiper/react";

const categoryItems = [
  {
    image: "/images/category/category1.png",
    category: "انواع برند عطر",
    desc: "معروفترین برند‌های عطر و ادکلن",
  },
  {
    image: "/images/category/category2.png",
    category: "انواع برند عطر",
    desc: "انواع اسپری و بادی اسپلش",
  },
  {
    image: "/images/category/category3.png",
    category: "انواع ادکلن مردانه",
    desc: "معروفترین برند‌های عطر و ادکلن",
  },
  {
    image: "/images/category/category4.png",
    category: "انواع ادکلن زنانه",
    desc: "معروفترین برند‌های عطر و ادکلن",
  },
];

const CategorySection = () => {
  return (
    <section className="mt-12 lg:mt-24">
      <Container>
        <SectionTitle
          title="دسته بندی محصولات"
          icon={<LayoutGrid className="size-5 lg:size-6" />}
        />
        <div className=" mt-5">
          <Slider
          autoplay
          loop
          slidesToShow={{default:1, sm:2, md:3, lg:4}}
            slides={categoryItems.map((item) => (
              <CategoryItem
                image={item.image}
                category={item.category}
                desc={item.desc}
              />
            ))}
          ></Slider>
        </div>
      </Container>
    </section>
  );
};

export default CategorySection;
