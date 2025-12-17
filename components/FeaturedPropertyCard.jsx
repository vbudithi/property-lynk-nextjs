import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
  FaStar,
} from "react-icons/fa";
const FeaturedPropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row">
      <Link href={`/properties/${property._id}`}>
        <Image
          src={property.images[0]}
          alt=""
          height={0}
          width={0}
          sizes="100vw"
          className="w-90 h-60 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          priority
        />
      </Link>

      <div className="p-6">
        <Link href={`/properties/${property._id}`}>
          <h3 className="hover:underline hover:text-amber-700 transition-colors duration-200 text-xl font-bold">
            {property.name} <FaStar className="text-amber-500 w-10 h-6" />
          </h3>
        </Link>
        <div className="text-gray-600 mb-4">{property.type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${property.rates.weekly}/wk
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline mr-1" /> {property.beds}{" "}
            <span className="md:hidden lg:inline">
              {property.beds == 1 ? "Bed" : "Beds"}
            </span>
          </p>

          <p>
            <FaBath className="inline mr-1" /> {property.baths}{" "}
            <span className="md:hidden lg:inline">
              {property.beds == 1 ? "Bath" : "Baths"}
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

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <i className="fa-solid fa-location-dot text-lg text-orange-700"></i>
            <FaMapMarker className="text-orange-700 mt-1" />
            <span className="text-orange-700">
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
