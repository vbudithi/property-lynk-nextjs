"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";
import { toast } from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageHeader from "@/components/PageHeader";

const ProfilePage = () => {
  const { data: session } = useSession();

  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const rowClasses =
    "flex justify-between items-center bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.25)]";

  // Fetch user properties
  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.error("[ProfilePage] Could not load saved properties:", error);
        toast.error("Unable to load your saved properties.");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = async (propertyId) => {
    if (!confirm("Delete this property permanently?")) return;

    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProperties((prev) =>
          prev.filter((property) => property._id !== propertyId)
        );
        toast.dismiss();
        toast.success("Deleted successfully", {
          className: "toast-progress",
        });
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Unable to delete the property");
    }
  };

  return (
    <section className=" overflow-hidden bg-[linear-gradient(135deg,#f6f7f8,#e6e8eb)] px-4 sm:px-8 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center"></header>
        {/* LEFT - PROFILE */}
        <div className="flex flex-col md:flex-row gap-12">
          <div
            className="
                    md:w-1/3
                    h-full
                    overflow-hidden
                    bg-[#233144]
                    backdrop-blur-2xl
                    shadow-[0_12px_40px_rgba(0,0,0,0.55)]
                    rounded-3xl
                    border border-white/10
                    px-10 py-20
                    flex flex-col items-center "
          >
            <div className="relative group rounded-full  border overflow-hidden">
              <Image
                src={profileImage || profileDefault}
                alt="Profile"
                width={150}
                height={150}
                className="h-44 w-full object-cover transition-transform duration-300 ease-in-out
      group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-white tracking-wide">
              {profileName || "User"}
            </h2>
            <p className="mt-1 text-sm text-blue-200/70 tracking-wide">
              {profileEmail || "No email provided"}
            </p>
            <div className="w-full mt-8 pt-6 border-t border-white/10 text-xs space-y-4">
              <div className={rowClasses}>
                <span className="text-blue-200/70">User ID</span>
                <span className="text-white font-semibold truncate max-w-[300px]">
                  {session?.user?.id || "—"}
                </span>
              </div>
              <div className={rowClasses}>
                <span className="text-blue-200/70">Full Name</span>
                <span className="text-white font-semibold truncate max-w-[300px]">
                  {profileName || "User"}
                </span>
              </div>
              <div className={rowClasses}>
                <span className="text-blue-200/70">Email</span>
                <span className="text-white font-semibold truncate max-w-[300px]">
                  {profileEmail || "No email provided"}
                </span>
              </div>
              <div className={rowClasses}>
                <span className="text-blue-200/70">Status</span>
                <span className="text-emerald-300 font-semibold">Active</span>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 h-full bg-white/30 backdrop-blur-xl shadow-xl rounded-3xl border border-white/40 px-8 py-10 overflow-hidden">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="overflow-y-auto h-[73.2vh] pr-2 custom-scrollbar">
                <div className="grid grid-cols-1 gap-2">
                  <PageHeader href="/" title="Your Listings" backText="Home" />

                  {properties.map((property) => (
                    <div
                      key={property._id}
                      className=" relative group rounded-2xl overflow-hidden bg-white/40 backdrop-blur-lg border border-white/50 shadow-lg hover:shadow-xl transition"
                    >
                      <Link href={`/properties/${property._id}`}>
                        <Image
                          src={property.images[0]}
                          alt={property.name}
                          width={500}
                          height={300}
                          className="h-44 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                      </Link>

                      <div className="px-5 py-4">
                        <Link href={`/properties/${property._id}`}>
                          <h4 className="text-lg font-medium text-[#1d1d1f] hover:opacity-80 transition">
                            {property.name}
                          </h4>
                        </Link>

                        <p className="text-xs text-[#6e6e73] mt-1">
                          {property.location?.street} {property.location?.city},{" "}
                          {property.location?.state}
                        </p>

                        <div className="text-gray-800 font-semibold space-y-1">
                          {/* Monthly */}
                          {property.rates?.monthly && (
                            <p>${property.rates.monthly} / month</p>
                          )}

                          {/* Weekly + Fortnight */}
                          {property.rates?.weekly &&
                            property.rates?.fortnight && (
                              <>
                                <p>${property.rates.weekly} / week</p>
                                <p>${property.rates.fortnight} / fortnight</p>
                              </>
                            )}

                          {/* Monthly + Weekly + Fortnight */}
                          {property.rates?.monthly &&
                            property.rates?.weekly &&
                            property.rates?.fortnight && (
                              <>
                                <p>${property.rates.monthly} / month</p>
                                <p>${property.rates.weekly} / week</p>
                                <p>${property.rates.fortnight} / fortnight</p>
                              </>
                            )}

                          {/* Fallback: Nightly */}
                          {!property.rates?.monthly &&
                            !property.rates?.weekly &&
                            !property.rates?.fortnight && (
                              <p>${property.rates?.nightly} / night</p>
                            )}
                        </div>

                        <div className="mt-4 flex gap-3">
                          <Link
                            href={`/properties/${property._id}/edit`}
                            className=" px-3 py-1.5 text-xs rounded-full
                                bg-gray-200 hover:bg-gray-300
                                text-[#1d1d1f]
                                border border-white/50
                                transition-colors duration-200"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteProperty(property._id)}
                            className="px-3 py-1.5 text-xs rounded-full  bg-rose-400 text-white hover:bg-rose-500 transition cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
