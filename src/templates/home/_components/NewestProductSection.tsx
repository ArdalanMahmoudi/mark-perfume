"use client";
import Container from "@/src/components/common/Container";
import SectionTitle from "./SectionTitle";
import { Stars } from "lucide-react";
import Slider from "@/src/components/common/Slider";
import ProductCard from "@/src/components/common/ProductCard";

const NewestProductSection = () => {
  return (
    <section>
      <Container>
        <SectionTitle
          title="جدیدترین محصولات"
          icon={<Stars className="size-6 text-primary" />}
        />
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

export default NewestProductSection;
