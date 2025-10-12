"use client";

import Link from "next/link";
import React from "react";

const PropertySections = React.memo(function PropertySections({ property }) {
  // Safeguards (don’t crash if some fields are missing)
  const type = property?.type ?? "Property";
  const title = property?.title ?? "Untitled Property";
  const address = property?.address;
  const beds = typeof property?.beds === "number" ? property.beds : null;
  const baths = typeof property?.baths === "number" ? property.baths : null;
  const sqft = typeof property?.sqft === "number" ? property.sqft : null;
  const description =
    property?.description ??
    "A lovely property with great access to local amenities.";
  const amenities = Array.isArray(property?.amenities)
    ? property.amenities
    : [];

  return (
    <>
      {/* Back link */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-600 flex items-center"
            prefetch={false}
          >
            <i className="fas fa-arrow-left mr-2" aria-hidden="true"></i>
            Back to Properties
          </Link>
        </div>
      </section>

      {/* Main + Sidebar */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_28%] w-full gap-6">
            {/* Main */}
            <main>
              {/* Overview */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-2">{type}</div>

                <h1 className="text-3xl font-bold mb-3">{title}</h1>

                {address && (
                  <div className="text-gray-500 mb-4 flex items-center justify-center md:justify-start">
                    <i
                      className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
                      aria-hidden="true"
                    ></i>
                    <p className="text-orange-700">{address}</p>
                  </div>
                )}
              </div>

              {/* Details (no prices) */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">
                  Description &amp; Details
                </h3>

                {/* Quick facts */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-blue-500 mb-4 text-xl">
                  {beds !== null && (
                    <p className="flex items-center gap-2">
                      <i className="fa-solid fa-bed" aria-hidden="true"></i>
                      <span className="font-semibold">{beds}</span>
                      <span className="hidden sm:inline text-base text-gray-600">
                        Beds
                      </span>
                    </p>
                  )}
                  {baths !== null && (
                    <p className="flex items-center gap-2">
                      <i className="fa-solid fa-bath" aria-hidden="true"></i>
                      <span className="font-semibold">{baths}</span>
                      <span className="hidden sm:inline text-base text-gray-600">
                        Baths
                      </span>
                    </p>
                  )}
                  {sqft !== null && (
                    <p className="flex items-center gap-2">
                      <i
                        className="fa-solid fa-ruler-combined"
                        aria-hidden="true"
                      ></i>
                      <span className="font-semibold">
                        {sqft.toLocaleString()}
                      </span>
                      <span className="hidden sm:inline text-base text-gray-600">
                        sqft
                      </span>
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>

              {/* Amenities */}
              {amenities.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <h3 className="text-lg font-bold mb-6">Amenities</h3>

                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none gap-x-4">
                    {amenities.map((a, idx) => (
                      <li key={`${a}-${idx}`} className="py-1">
                        <i
                          className="fas fa-check text-green-600 mr-2"
                          aria-hidden="true"
                        ></i>
                        <span className="text-gray-800">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Map placeholder (optional lazy-load real map later) */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-4">Location</h3>
                <div
                  id="map"
                  className="h-64 w-full rounded-md bg-gray-100"
                  aria-label="Map placeholder"
                />
              </div>
            </main>

            {/* Sidebar */}
            <aside className="space-y-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                <i className="fas fa-bookmark mr-2" aria-hidden="true"></i>
                Bookmark Property
              </button>

              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                <i className="fas fa-share mr-2" aria-hidden="true"></i>
                Share Property
              </button>

              {/* Contact form */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">
                  Contact Property Manager
                </h3>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone"
                      type="text"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                      id="message"
                      placeholder="Enter your message"
                    />
                  </div>

                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                    type="submit"
                  >
                    <i
                      className="fas fa-paper-plane mr-2"
                      aria-hidden="true"
                    ></i>
                    Send Message
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
});

export default PropertySections;
