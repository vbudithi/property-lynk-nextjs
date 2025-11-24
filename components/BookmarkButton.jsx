"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FaBookmark } from "react-icons/fa";

const BookmarkButton = React.memo(function BookmarkButton({ id, onUnsave }) {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [bookmarked, setBookmarked] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setBookmarked(false);
      setLoading(false);
      return;
    }
    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ propertyId: id }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setBookmarked(data.isBookmarked);
          return data;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkBookmarkStatus();
  }, [id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.dismiss();
      toast.error("Sign in to save the property", {
        className: "toast-progress",
        id: "bookmark-auth-error",
      });
      return;
    }
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: id }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setBookmarked(data.isBookmarked);
        if (!data.isBookmarked && onUnsave) {
          onUnsave(id);
        }
        toast.dismiss();
        toast.success(data.message, {
          className: "toast-progress",
          id: "bookmark-auth-error",
        });
        return data;
      } else {
        toast.error("Failed to save the property");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (status === "loading" || loading || bookmarked === null) {
    return (
      <button
        disabled
        className="h-10 w-12 rounded-full flex items-center justify-center 
      bg-gray-300 opacity-50 cursor-wait"
      >
        <FaBookmark />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`h-10 w-12 rounded-full flex items-center justify-center 
      font-bold cursor-pointer
     ${
       loading
         ? "bg-gray-300 opacity-50 cursor-wait"
         : bookmarked
         ? "bg-orange-400 hover:bg-orange-500 text-white"
         : "bg-gray-300 text-white"
     }`}
    >
      <FaBookmark />
      {/* Bookmark Animation */}
      {/* <FaBookmark
        className={`mr-2 transition-transform duration-300 text-lg justify-center items-center h-4 w-4 ${
          loading
            ? "animate-spin"
            : bookmarked
            ? "text-white scale-110"
            : "text-white"
        }`}
        aria-hidden="true"
      /> */}
    </button>
  );
});

export default BookmarkButton;
