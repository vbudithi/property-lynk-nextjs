import React from "react";
import Link from "next/link";
import PropertyGrid from "./PropertyGrid";

const HomeProperties = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch properties");

  const data = await res.json();

  const properties = data.properties || [];

  const recentProperties = [...properties]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>

          {recentProperties.length === 0 ? (
            <p>No Properties Found</p>
          ) : (
            <PropertyGrid properties={recentProperties} />
          )}
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
