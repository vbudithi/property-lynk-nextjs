"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PropertyGrid from "@/components/PropertyGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageHeader from "@/components/PageHeader";
import PropertySearchForm from "@/components/PropertySearchForm";
import SearchSection from "@/components/SearchSection";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );
        if (res.ok) {
          const data = await res.json();
          setProperties(data.properties);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);
  console.log("properties", properties);

  if (loading) return <LoadingSpinner />;

  if (!properties || properties.length === 0)
    return (
      <section className="px-4 py-6 text-center text-gray-500">
        <p>No properties found</p>
      </section>
    );

  return (
    <>
      <SearchSection>
        <PropertySearchForm />
      </SearchSection>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <PageHeader
            href="/properties"
            title="Search Results"
            backText="Back to Properties"
          />

          <PropertyGrid properties={properties} />
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
