import BreadCrumbs from "@/src/components/common/BreadCrumbs";
import Container from "@/src/components/common/Container";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import React from "react";

const ShopTemplate = () => {
  type LinkBreadCrumbs = {
    link: { href: string; label: string };
  };

  const links = [
    { href: "/", label: "خانه" },
    { href: "/shop", label: "فروشگاه" },
  ];
  return (
    <>
      <Header />
      <main>
        <BreadCrumbs links={links} textClass="text-primary" />
        <section>
          <Container>
            <div className="grid grid-cols-7 gap-9 mt-8 mb-12 flex-wrap relative">
              {/* Sidebar */}
              <div className="lg:col-span-2">
                <div className="flex flex-col gap-5 sticky top-8">
                    <div className="bg-white rounded-sm w-full border border-grey220">
                        <details>
                            <summary>1</summary>
                            <summary>2</summary>
                            <summary>3</summary>
                        </details>
                    </div>
                </div>
              </div>
              <div className="lg:col-span-5">2</div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ShopTemplate;
