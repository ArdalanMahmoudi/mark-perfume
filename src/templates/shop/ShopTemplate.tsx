import BreadCrumbs from "@/src/components/common/BreadCrumbs";
import Container from "@/src/components/common/Container";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import SidebarFilter from "./_components/SidebarFilter";
import { SliderRange } from "./_components/SliderRange";
import ProductCard from "@/src/components/common/ProductCard";
import { PaginationDemo } from "@/src/components/common/Pagination";
import { MobileFilter } from "./_components/MobileFilter";


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

      <MobileFilter />
      <main>
        <BreadCrumbs links={links} textClass="text-primary" />
        <section>
          <Container>
            <div className="grid grid-cols-7 gap-9 mt-8 mb-12 flex-wrap relative">
              {/* Sidebar */}
              <div className="hidden lg:block lg:col-span-2">
                <div className="flex flex-col gap-5 sticky top-8">
                  <SidebarFilter title="دسته بندی ها">
                    <div className="flex items-center gap-1 w-fit ">
                      <input type="checkbox" name="" id="" />
                      <label htmlFor="#">Chanel</label>
                    </div>
                    <div className="flex items-center gap-1 w-fit ">
                      <input type="checkbox" name="" id="" />
                      <label htmlFor="#">Dior</label>
                    </div>
                    <div className="flex items-center gap-1 w-fit ">
                      <input type="checkbox" name="" id="" />
                      <label htmlFor="#">Calvin klein</label>
                    </div>
                    <div className="flex items-center gap-1 w-fit ">
                      <input type="checkbox" name="" id="" />
                      <label htmlFor="#">Versace</label>
                    </div>
                  </SidebarFilter>
                  <SidebarFilter title="قیمت">
                    <SliderRange />
                  </SidebarFilter>
                  <SidebarFilter title="جنسیت">
                    <div className="flex items-center gap-1 w-fit ">
                      <input type="radio" name="gender" value="male" />
                      <label htmlFor="#">مردانه</label>
                    </div>
                    <div className="flex items-center gap-1 w-fit ">
                      <input type="radio" name="gender" value="female" />
                      <label htmlFor="#">زنانه</label>
                    </div>
                    <div className="flex items-center gap-1 w-fit ">
                      <input type="radio" name="gender" value="male-female" />
                      <label htmlFor="#">مردانه-زنانه</label>
                    </div>
                  </SidebarFilter>
                </div>
              </div>
              <div className="lg:col-span-5 col-span-7">
                {/* Sort */}
                <div className="flex justify-between bg-secondary rounded-sm border border-grey220 p-3">
                  <div>فروشگاه</div>
                  <div>
                    <select className="p-0.5 rounded-sm  text-sm lg:text-balance text-primary border border-grey220">
                      <option value="-1">مرتب سازی</option>
                      <option value="best-selling">پرفروشترین‌ها</option>
                      <option value="expensive">گران ترین‌ها</option>
                      <option value="new">جدید ترین‌ها</option>
                      <option value="cheapest">ارزان ترین‌ها</option>
                    </select>
                  </div>
                </div>
                {/* Products */}
                <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <ProductCard className="hover:scale-105 transition-all duration-300 ease-in-out" />
                  <ProductCard className="hover:scale-105 transition-all duration-300 ease-in-out" />
                  <ProductCard className="hover:scale-105 transition-all duration-300 ease-in-out" />
                  <ProductCard className="hover:scale-105 transition-all duration-300 ease-in-out" />
                  <ProductCard className="hover:scale-105 transition-all duration-300 ease-in-out" />
                  <ProductCard className="hover:scale-105 transition-all duration-300 ease-in-out" />
                </div>
                <PaginationDemo />
              </div>
            </div>
          </Container>
        </section>
      </main>

    </>
  );
};

export default ShopTemplate;
