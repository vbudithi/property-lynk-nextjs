"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";
const ProfilePage = () => {
  const { data: session } = useSession();

  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    debugger;
    const fetchUserProperties = async (userId) => {
      if (!userId) {
        console.warn("No userId found in session");
        return;
      }
      console.log("Fetching user properties for userId:", userId);
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        console.log("API response status:", res.status);

        if (res.status === 200) {
          const data = await res.json();
          console.log("API response data:", data);
          setProperties(data);
        } else {
          console.log("Failed to fetch properties. Status:", res.status);
        }
      } catch (error) {
        console.error("Error fetching user properties:", error);
      } finally {
        setLoading(false);
      }
    };
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = async (propertyId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this property? This action cannot be undone."
      )
    ) {
      console.log("Deleting property with id:", propertyId);
    } else return;

    try {
      const res = await fetch(`api/properties/${propertyId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );
        setProperties(updatedProperties);
        toast.success("Property deleted successfully", {
          className: "toast-progress",
        });
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>{" "}
                <span>{profileName || "N/A"}</span>
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>{" "}
                <span>{profileEmail || "N/A"}</span>
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && properties.length === 0 && (
                <p>You have no property listings.</p>
              )}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <ClipLoader
                    color="#3b82F6"
                    size={80}
                    aria-label="Loading Spinner"
                  />
                  <p className="mt-6 text-blue-600 font-semibold text-lg animate-pulse">
                    Loading your properties...
                  </p>
                </div>
              ) : (
                properties.map((property) => (
                  <div key={property._id} className="mb-10">
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        alt=""
                        width="500"
                        height="100"
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <Link href={`/properties/${property._id}`}>
                        <p className="text-lg font-semibold hover:underline">
                          {property.name}
                        </p>
                      </Link>
                      <p className="text-gray-600">
                        {property.location?.street} {property.location?.city},{" "}
                        {property.location?.state} {property.location?.zipcode}
                      </p>
                      <p className="text-gray-800 font-semibold">
                        ${property.rates?.nightly} / night
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600 cursor-pointer"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 cursor-pointer"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
