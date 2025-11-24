"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import PropertyGrid from "@/components/PropertyGrid";
import Link from "next/link";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/bookmarks");
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
          toast.dismiss();
        } else {
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        toast.error("Failed to fetch saved properties");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, []);

  console.log("properties", properties);

  //Remove property from list instantly after unbookmark
  const handleRemove = (propertyId) => {
    setProperties((prev) =>
      prev.filter((property) => property._id !== propertyId)
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  //API failed or properties missing
  if (!Array.isArray(properties) || properties.length === 0) {
    return (
      <section className="px-4 py-12 text-center text-gray-500">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Saved Properties
        </h1>
        <p className="mb-6">
          You haven’t saved any properties yet. Browse available listings and
          find your next home.
        </p>
        <Link
          href="/properties"
          className="inline-block px-6 py-3 bg-blue-100  border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-200 transition-colors"
        >
          Explore Properties
        </Link>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
          Saved Properties
        </h1>
        <PropertyGrid properties={properties} onUnsave={handleRemove} />
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
