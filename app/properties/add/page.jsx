"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/request";

export default function PropertySections() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const data = await fetchProperty(id);
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!property) fetchPropertyData();
  }, [id, property]);

  const fmt = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "AUD",
        maximumFractionDigits: 0,
      }),
    []
  );

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  }

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  // Use simple logical OR for fallbacks
  const beds = property.beds || 0;
  const baths = property.baths || 0;
  const price =
    property.price ||
    property.rates?.monthly ||
    property.rates?.weekly ||
    property.rates?.nightly ||
    0;

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-6">Details</h3>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-xl">
            {/* Bedrooms */}
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-bed" aria-hidden="true"></i>
              <span className="font-semibold">{beds}</span>
              <span className="hidden sm:inline text-base text-gray-600">
                Beds
              </span>
            </div>

            {/* Bathrooms */}
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-bath" aria-hidden="true"></i>
              <span className="font-semibold">{baths}</span>
              <span className="hidden sm:inline text-base text-gray-600">
                Baths
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-tag" aria-hidden="true"></i>
              <span className="font-semibold text-blue-600">
                {price ? fmt.format(price) : "N/A"}
              </span>
              <span className="hidden sm:inline text-base text-gray-600">
                Price
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
