"use client";
import Container from "@/src/components/common/Container";
import SectionTitle from "./SectionTitle";
import { Stars } from "lucide-react";
import Slider from "@/src/components/common/Slider";
import ProductCard from "@/src/components/common/ProductCard";

const NewestProductSection = ({products}) => {
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
            slides={products.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          />
        </div>
      </Container>
    </section>
  );
};

export default NewestProductSection;
