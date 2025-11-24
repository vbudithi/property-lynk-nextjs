import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";
import BookmarkButton from "./BookmarkButton";

const PropertyCard = ({ property, onUnsave }) => {
  const getRateDisplay = () => {
    const { rates } = property;

    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
    return "";
  };

  return (
    <div
      className="relative rounded-xl border border-gray-2
    00 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-500 relative overflow-hidden group bg-white"
    >
      <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-20">
        <div className=" bg-white/90 px-4 py-2 rounded-lg text-blue-600 font-bold shadow transform transition-transform duration-500 group-hover:scale-105">
          ${getRateDisplay()}
        </div>
      </div>

      {/* Image */}
      <Link href={`/properties/${property._id}`}>
        <Image
          src={property.images[0]}
          alt=""
          height={0}
          width={0}
          sizes="100vw"
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
          priority
        />
      </Link>

      <div className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-left">
            <div className="text-gray-600">{property.type}</div>
            <Link href={`/properties/${property._id}`}>
              <h3 className="text-xl font-bold">{property.name}</h3>
            </Link>
          </div>
          <div className="flex-shrink-0">
            <BookmarkButton id={property._id} onUnsave={onUnsave} />
          </div>
        </div>
        <div className="flex justify-center gap-8 text-gray-500 mb-4">
          <p>
            <FaBed className="inline mr-1" /> {property.beds}{" "}
            <span className="md:hidden lg:inline">
              {property.beds == 1 ? "Bed" : "Beds"}
            </span>
          </p>
          <p>
            <FaBath className="inline mr-2" /> {property.baths}{" "}
            <span className="md:hidden lg:inline">
              {property.baths == 1 ? "Bath" : "Baths"}{" "}
            </span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-2" />
            {property.square_feet}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {["weekly", "nightly", "monthly"].map((period) => {
            const rate = property.rates?.[period];
            if (typeof rate === "number" && rate > 0) {
              return (
                <p key={period}>
                  <FaMoneyBill className="inline mr-2" />
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </p>
              );
            }
            return null;
          })}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <i className="fa-solid fa-location-dot text-lg text-orange-700"></i>
            <FaMapMarker className="text-orange-700 mt-1" />
            <span className="text-orange-700">
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:shadow-md transition-all duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
