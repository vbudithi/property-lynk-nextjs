"use client";

import { motion } from "framer-motion";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

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
  show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const PropertyGrid = ({ properties }) => {
  if (!Array.isArray(properties)) {
    console.warn("⚠️ PropertiesGrid received non-array:", properties);
    return <p>No properties found</p>;
  }

  return (
    <>
      <section>
        <div className="container mx-auto md:px-16 flex items-center justify-between mb-6">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-600 flex items-center"
            prefetch={false}
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </Link>
        </div>
      </section>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-16"
      >
        {properties.map((property) => (
          <motion.div key={property._id} variants={item}>
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default PropertyGrid;
