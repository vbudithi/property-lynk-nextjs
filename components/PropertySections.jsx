"use client";

import Link from "next/link";
import React from "react";
import PropertyDetails from "./PropertyDetails";
import { FaArrowLeft } from "react-icons/fa";
import ShareButtons from "./ShareButtons";
import PropertyContactForm from "./PropertyContactForm";

const PropertySections = React.memo(function PropertySections({ property }) {
  return (
    <>
      <section>
        <div className="container m-auto py-6 px-16">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center cursor-pointer"
            prefetch={false}
          >
            <FaArrowLeft className="mr-2" />
            All Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_28%] w-full gap-6">
            {/* Main */}
            <PropertyDetails property={property} />

            {/* Sidebar */}
            <aside className="space-y-4 sticky top-40 self-start">
              <PropertyContactForm
                id={property.id}
                isContactedForm={property.isContactedForm}
              />
              <ShareButtons property={property} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
});

export default PropertySections;
