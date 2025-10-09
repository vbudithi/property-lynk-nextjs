"use client";

import { motion } from "framer-motion";
import PropertyCard from "@/components/PropertyCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: -50, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const PropertyGrid = ({ properties }) => {
  if (!Array.isArray(properties)) {
    console.warn("⚠️ PropertiesGrid received non-array:", properties);
    return <p>No properties found</p>;
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {properties.map((property) => (
        <motion.div key={property._id} variants={item}>
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PropertyGrid;
