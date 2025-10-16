import React from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCheck,
  FaTimes,
  FaMapMarkerAlt,
} from "react-icons/fa";
import PropertyGallery from "./PropertyGallery";

/* --------- tiny presentational helper --------- */
function StatChip({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-gray-800">
      <div className="grid place-items-center w-10 h-10 rounded-full bg-white shadow-sm ring-1 ring-gray-200">
        <span className="text-gray-700">{icon}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-semibold">{value}</span>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
    </div>
  );
}

const PropertyDetails = React.memo(function PropertyDetails({ property }) {
  // safe reads + sensible fallbacks
  const type = property?.type ?? "Property";
  const title = property?.name ?? "Untitled Property";
  const beds = typeof property?.beds === "number" ? property.beds : null;
  const baths = typeof property?.baths === "number" ? property.baths : null;
  const sqft =
    typeof property?.square_feet === "number" ? property.square_feet : null;
  const description =
    property?.description ??
    "A lovely property with great access to local amenities.";
  const amenities = Array.isArray(property?.amenities)
    ? property.amenities
    : [];

  // Normalize location fields safely from either an object or string
  const loc = property?.location;
  const street =
    (typeof loc === "object" && loc?.street) ||
    (typeof loc === "string" && loc) ||
    "";
  const city = (typeof loc === "object" && loc?.city) || "";
  const state = (typeof loc === "object" && loc?.state) || "";
  const hasAddress = street || city || state;

  return (
    <main className="max-w-screen-2xl  px-4 md:px-6 lg:px-8 py-4">
      {/* OVERVIEW CARD */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-emerald-500 to-fuchsia-500" />
        <div className="p-6 md:p-8">
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold ring-1 ring-blue-200">
              {type}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          {hasAddress && (
            <div className="mt-3 flex items-center justify-center md:justify-start text-sm md:text-base">
              <span className="inline-flex items-center rounded-full bg-orange-50 text-orange-700 px-3 py-1 ring-1 ring-orange-200">
                <FaMapMarkerAlt className="mr-2" aria-hidden="true" />
                <span className="truncate">
                  {street}
                  {street && (city || state) ? ", " : ""} {city} {state}
                </span>
              </span>
            </div>
          )}
          {/* ✅ Rates & Options */}
          {property?.rates && (
            <>
              <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2 rounded">
                Rates &amp; Options
              </h3>

              <div className="flex flex-col md:flex-row justify-around">
                {/* Nightly */}
                <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                  <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                  <div className="text-2xl font-bold text-blue-500">
                    {typeof property.rates?.nightly === "number" ? (
                      `$${property.rates.nightly.toLocaleString()}`
                    ) : (
                      <FaTimes className="text-red-700" />
                    )}
                  </div>
                </div>

                {/* Weekly */}
                <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                  <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                  <div className="text-2xl font-bold text-blue-500">
                    {typeof property.rates?.weekly === "number" ? (
                      `$${property.rates.weekly.toLocaleString()}`
                    ) : (
                      <FaTimes className="text-red-700" />
                    )}
                  </div>
                </div>

                {/* Monthly */}
                <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                  <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                  <div className="text-2xl font-bold text-blue-500">
                    {typeof property.rates?.monthly === "number" ? (
                      `$${property.rates.monthly.toLocaleString()}`
                    ) : (
                      <FaTimes className="text-red-700" />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* description & details */}
      <div className="mt-6 rounded-2xl bg-white shadow-md ring-1 ring-black/5">
        <div className="border-b border-gray-100 px-6 md:px-8 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Description &amp; Details
          </h3>
        </div>
        <div className="px-6 md:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Beds */}
            <StatChip
              icon={<FaBed aria-hidden="true" />}
              label="Beds"
              value={beds !== null ? beds : "—"}
            />
            {/* Baths */}
            <StatChip
              icon={<FaBath aria-hidden="true" />}
              label="Baths"
              value={baths !== null ? baths : "—"}
            />
            {/* Square Feet */}
            <StatChip
              icon={<FaRulerCombined aria-hidden="true" />}
              label="sqft"
              value={sqft !== null ? sqft.toLocaleString() : "—"}
            />
          </div>

          <p className="mt-6 text-gray-700 leading-relaxed">{description}</p>
        </div>
      </div>
      {/* image gallery */}
      <PropertyGallery images={property.images} />

      {/* amenities */}
      {amenities.length > 0 && (
        <div className="mt-6 rounded-2xl bg-white shadow-md ring-1 ring-black/5">
          <div className="border-b border-gray-100 px-6 md:px-8 py-4">
            <h3 className="text-lg font-semibold text-gray-900">Amenities</h3>
          </div>
          <div className="px-6 md:px-8 py-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {amenities.map((a, idx) => (
                <li
                  key={`${a}-${idx}`}
                  className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-2 text-sm ring-1 ring-emerald-200"
                >
                  <FaCheck className="mr-2" aria-hidden="true" />
                  <span className="truncate">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* map placeholder */}
      <div className="mt-6 rounded-2xl bg-white shadow-md ring-1 ring-black/5">
        <div className="border-b border-gray-100 px-6 md:px-8 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Location</h3>
        </div>
        <div className="px-6 md:px-8 py-6">
          <div
            id="map"
            aria-label="Map placeholder"
            className="h-64 w-full rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden"
          ></div>
        </div>
      </div>
    </main>
  );
});

export default PropertyDetails;
