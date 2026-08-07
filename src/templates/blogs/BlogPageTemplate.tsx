import Container from "@/src/components/common/Container";
import SectionTitle from "../home/_components/SectionTitle";
import { FileText } from "lucide-react";
import ArticleCard from "@/src/components/common/ArticleCard";

const BlogPageTemplate = () => {
  return (
    <>
      <main className="pt-24 lg:pt-44">
        <Container>
        <SectionTitle title="آخرین مقالات" icon={<FileText />} />
        <div className="grid lg:grid-cols-4 gap-4 my-4 lg:my-8">
          <ArticleCard/>
          <ArticleCard/>
          <ArticleCard/>
          <ArticleCard/>
        </div>
        </Container>
      </main>
    </>
  );
};

export default BlogPageTemplate;
