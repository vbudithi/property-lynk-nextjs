"use client";
import { useState, useEffect } from "react";
import PropertyGrid from "./PropertyGrid";
import PageHeader from "./PageHeader";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log("data", data);
        setProperties(data?.data?.result.properties ?? []);
        setTotalItems(data?.data?.result.total ?? []);
      } catch (error) {
        console.error("Cannot load the properties", error);
      } finally {
        setloading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // handle missing or empty data
  if (!Array.isArray(properties) || properties.length === 0) {
    return (
      <section className="px-4 py-6 text-center text-gray-500">
        <p>No properties found</p>
      </section>
    );
  }

  // //sort newest -> oldest
  // const sortedProperties = properties.sort(
  //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  // );

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <PageHeader
          href="/"
          title="Property Listings"
          backText="Back to Home"
        />
        <PropertyGrid properties={properties} />
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Properties;
