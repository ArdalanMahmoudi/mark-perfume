"use client";
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

const HomeTemplate = ({ products }) => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <OfferSection products={products} />
      <AboutusSection />
      <BestSellerSection products={products} />
      <FavorSection />
      <NewestProductSection products={products} />
      <ShopIntroductionSection />
      <LatestBlog />
    </>
  );
};

export default HomeTemplate;
