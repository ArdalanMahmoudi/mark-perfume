import React from "react";
import SectionTitle from "../home/_components/SectionTitle";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { FileText } from "lucide-react";

const BlogPageTemplate = () => {
  return (
    <>
    <section>
      <SectionTitle title="آخرین مقالات" icon={<FileText/>}/>
    </section>
    </>
  );
};

export default BlogPageTemplate;
