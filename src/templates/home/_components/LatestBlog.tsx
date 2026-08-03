"use client";
import Container from "@/src/components/common/Container";
import SectionTitle from "./SectionTitle";
import { FileText } from "lucide-react";
import ArticleCard from "@/src/components/common/ArticleCard";
import Slider from "@/src/components/common/Slider";

const LatestBlog = () => {
  return (
    <section className="mt-16  lg:my-24 pt-20">
      <Container>
        <SectionTitle title="آخرین اخبار و  آموزش ها" icon={<FileText />} />
          <Slider

            loop
            slidesToShow={{ default: 1, sm: 1, md: 2, lg: 4 }}
            slides={Array.from({ length: 5 }).map((p) => (
              <ArticleCard />
            ))}
          />
      </Container>
    </section>
  );
};

export default LatestBlog;
