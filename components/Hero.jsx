"use client";
import React from "react";
import PropertySearchForm from "./PropertySearchForm";

const Hero = () => {
  return (
    <>
      <section>
        <div className="bg-gradient-to-r from-blue-500 to-blue-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                Find Your Perfect Rental
              </h1>
              <p className="my-4 text-xl text-white">
                Discover the ideal property that matches your lifestyle. Browse
                hundreds of listings and find your dream home today.
              </p>
            </div>
          </div>
          <PropertySearchForm />
        </div>
      </section>
    </>
  );
};

export default Hero;
