"use client";
import React from "react";
import properties from "@/properties.json";
import PropertyCard from "@/components/PropertyCard";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // cards appear one by one
    },
  },
};

const item = {
  hidden: { y: -50, opacity: 0 }, // start above
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }, // fall smoothly
};

const PropertiesPage = () => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {properties.map((property) => (
              <motion.div key={property._id} variants={item}>
                <PropertyCard key={property._id} property={property} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
