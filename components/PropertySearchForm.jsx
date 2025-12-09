"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const PropertySearchForm = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query =
      location === "" && propertyType === "All"
        ? "/properties"
        : `/properties/search-results?location=${location}&propertyType=${propertyType}`;

    router.push(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full max-w-4xl mx-auto mt-8
        bg-white/90 backdrop-blur-lg
        rounded-full
        px-6 py-4
        shadow-[0_8px_45px_rgba(0,0,0,0.12)]
        border border-gray-100
        flex flex-col md:flex-row gap-4 items-center
        animate-[float_6s_ease-in-out_infinite]
        hover:scale-[1.015] hover:-translate-y-1 transition-all duration-300
        relative overflow-hidden
      "
    >
      {/* Search input */}
      <div className="flex-1 relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600/60 text-sm" />
        <input
          type="text"
          id="location"
          placeholder="Search by city, street or keywords..."
          className="
              w-full pl-11 pr-4 py-3
              rounded-full
              bg-gray-50
              text-gray-900
              focus:outline-none
              focus:ring-2 focus:ring-blue-500/50
              border border-gray-200
            "
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Property Type */}
      <select
        id="property-type"
        className="
            w-full md:w-48 px-4 py-3
            rounded-full
            bg-gray-50 text-gray-800
            border border-gray-200
            cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
          "
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
      >
        <option value="All">All Types</option>
        <option value="Apartment">Apartment</option>
        <option value="Studio">Studio</option>
        <option value="Condo">Condo</option>
        <option value="House">House</option>
        <option value="Cabin Or Cottage">Cabin or Cottage</option>
        <option value="Loft">Loft</option>
        <option value="Room">Room</option>
        <option value="Other">Other</option>
      </select>

      {/* Submit */}
      <button
        type="submit"
        className="
          w-full md:w-auto px-8 py-3
          rounded-full
          bg-blue-600 hover:bg-blue-700
          text-white font-semibold
          shadow-md hover:shadow-lg
          cursor-pointer
          transition-all duration-300
          active:scale-95
        "
      >
        Search
      </button>
    </form>
  );
};

export default PropertySearchForm;
