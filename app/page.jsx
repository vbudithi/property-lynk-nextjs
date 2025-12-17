import React from "react";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomePropeties from "@/components/HomePropeties";
import FeaturedProperties from "@/components/FeaturedProperties";

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomePropeties />
    </>
  );
};
export default HomePage;
