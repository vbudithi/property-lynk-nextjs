"use client";

import Link from "next/link";
import React from "react";
import PropertyDetails from "./PropertyDetails";
import { FaArrowLeft } from "react-icons/fa";

const PropertySections = React.memo(function PropertySections({ property }) {
  return (
    <>
      {/* Back link */}
      <section>
        <div className="container m-auto py-6 px-16">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-600 flex items-center"
            prefetch={false}
          >
            <FaArrowLeft className="mr-2" />
            Back to Properties
          </Link>
        </div>
      </section>

      {/* Main + Sidebar */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_28%] w-full gap-6">
            {/* Main */}
            <PropertyDetails property={property} />

            {/* Sidebar */}
            <aside className="space-y-4 sticky top-40 self-start">
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
