"use client";
import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { setDefaults, fromAddress } from "react-geocode";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import { ClipLoader } from "react-spinners";

const getGeocodeErrorMessage = (error, addressAttempted) => {
  const message = error?.message || "";

  if (message.includes("ZERO_RESULTS")) {
    return `Address not found: "${addressAttempted}"`;
  } else if (message.includes("OVER_QUERY_LIMIT")) {
    return "Too many requests. Please try again in a few minutes";
  } else if (message.includes("REQUEST_DENIED")) {
    return "Google Maps API configuration error";
  } else if (message.includes("INVALID_REQUEST")) {
    return "Invalid address format";
  } else {
    return `Unable to find location on map: "${addressAttempted}"`;
  }
};

const geocodeWithFallback = async (
  { street, city, state, zipcode },
  setErrorMessage
) => {
  let res = null;
  let addressToTry = "";

  // Strategy 1: Try full address first
  if (street?.trim()) {
    addressToTry = `${street}, ${city}, ${state} ${zipcode || ""}`.trim();
    try {
      res = await fromAddress(addressToTry);
    } catch (error) {
      setErrorMessage(getGeocodeErrorMessage(error, addressToTry));
      res = null;
    }
  }

  // Strategy 2: Fallback to city/state/zip
  if (!res) {
    addressToTry = `${city}, ${state} ${zipcode || ""}`.trim();
    try {
      res = await fromAddress(addressToTry);
    } catch (error) {
      setErrorMessage(getGeocodeErrorMessage(error, addressToTry));
      res = null;
    }
  }

  // Final result check
  if (res?.results?.length > 0) {
    const { lat, lng } = res.results[0].geometry.location;
    return { lat, lng, addressAttempted: addressToTry };
  } else {
    setErrorMessage(`No results returned from geocoding: "${addressToTry}"`);
    return { lat: null, lng: null, addressAttempted: addressToTry };
  }
};

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [addressAttempted, setAddressAttempted] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setDefaults({
      key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
      language: "en",
      region: "us",
    });

    const fetchCoordinates = async () => {
      setLoading(true);
      setGeocodeError(false);
      setErrorMessage("");
      setAddressAttempted("");
      setLat(null);
      setLng(null);

      if (!property?.location) {
        setErrorMessage("Property location data is missing");
        setGeocodeError(true);
        setLoading(false);
        return;
      }

      const { street, city, state, zipcode } = property.location;

      if (!city || !state) {
        setErrorMessage("Incomplete address: City and State are required");
        setGeocodeError(true);
        setLoading(false);
        return;
      }

      const { lat, lng, addressAttempted } = await geocodeWithFallback(
        { street, city, state, zipcode },
        setErrorMessage
      );

      setAddressAttempted(addressAttempted);

      if (lat && lng) {
        setLat(lat);
        setLng(lng);
      } else {
        setGeocodeError(true);
      }

      setLoading(false);
    };

    fetchCoordinates();
  }, [property, refreshKey]);

  const handleRetry = () => {
    setRefreshKey(Date.now());
  };

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] bg-gray-50 rounded-lg border border-gray-200">
        <ClipLoader color="#3b82F6" size={80} />
        <p className="mt-6 text-blue-600 font-semibold text-lg animate-pulse">
          Finding location...
        </p>
      </div>
    );
  }

  if (geocodeError || !lat || !lng) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border-2 border-orange-200">
        <svg
          className="w-20 h-20 text-orange-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        <h3 className="text-gray-800 text-xl font-bold mb-2">
          Map Unavailable
        </h3>
        <p className="text-orange-600 font-medium mb-4">
          {errorMessage || "Unable to load map"}
        </p>

        <div className="bg-white rounded-lg p-4 mb-6 max-w-md border border-gray-200 shadow-sm">
          <p className="text-gray-700 text-sm mb-2">
            <span className="font-semibold">Property Address:</span>
          </p>
          <div className="text-gray-600 text-sm space-y-1">
            {property.location.street && <p>📍 {property.location.street}</p>}
            <p>
              🏙️ {property.location.city}, {property.location.state}{" "}
              {property.location.zipcode}
            </p>
          </div>
          {addressAttempted && (
            <p className="text-gray-500 text-xs mt-3 pt-3 border-t">
              <span className="font-semibold">Attempted:</span>{" "}
              {addressAttempted}
            </p>
          )}
        </div>

        <button
          onClick={handleRetry}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Again
        </button>

        <p className="text-gray-500 text-xs mt-4 max-w-md text-center">
          The address may not be recognized by Google Maps. You can still
          contact the property owner for directions.
        </p>
      </div>
    );
  }

  if (!mapboxToken) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600 font-semibold">⚠️ Map configuration error</p>
      </div>
    );
  }
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <div className="relative group">
            <Image
              src={pin}
              alt="Property Location"
              width={40}
              height={40}
              className="drop-shadow-lg"
            />
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              Latitude: {lat.toFixed(5)}, Longitude: {lng.toFixed(5)}
            </div>
          </div>
        </Marker>
      </Map>
    </div>
  );
};
export default PropertyMap;
