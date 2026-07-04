import Header from "@/src/components/layout/Header";
import React from "react";
import HeroSection from "./_components/HeroSection";
import CategorySection from "./_components/CategorySection";
import OfferSection from "./_components/OfferSection";
import AboutusSection from "./_components/AboutusSection";
import BestSellerSection from "./_components/BestSellerSection";
import FavorSection from "./_components/FavorSection";
import NewestProductSection from "./_components/NewestProductSection";
import ShopIntroductionSection from "./_components/ShopIntroductionSection";
import LatestBlog from "./_components/LatestBlog";
import Footer from "@/src/components/layout/Footer";

import ProductCard from "@/src/components/common/ProductCard";


const HomeTemplate = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <OfferSection />
        <AboutusSection />
        <BestSellerSection />
        <FavorSection />
        <NewestProductSection />
        <ShopIntroductionSection />
        <LatestBlog />

      </main>
      <Footer/>
    </>
  );
};

export default HomeTemplate;
