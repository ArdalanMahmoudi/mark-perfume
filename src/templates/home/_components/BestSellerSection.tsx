"use client";
import Container from "@/src/components/common/Container";

import SectionTitle from "./SectionTitle";
import { CheckCheck } from "lucide-react";
import ProductCard from "@/src/components/common/ProductCard";
import Slider from "@/src/components/common/Slider";

const BestSellerSection = () => {
  return (
    <section className="mt-24">
      <Container>
        <SectionTitle title="محصولات پر فروش" icon={<CheckCheck />} />
        <div className="mt-5">
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
  );
};

export default BestSellerSection;
