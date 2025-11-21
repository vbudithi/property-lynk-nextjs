"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FaBookmark } from "react-icons/fa";
import { NextResponse } from "next/server";

const BookmarkButton = React.memo(function BookmarkButton({
  id,
  isBookmarked = false,
  onBookmark = (id) => console.log("Bookmark clicked for id:", id),
}) {
  const { data: session } = useSession();
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!session?.user) {
      toast.error("You need to signin to use a bookmark property");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/bookmarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: id }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setBookmarked(data.isBookmarked);
        toast.success(data.message, {
          className: "toast-progress",
        });
        onBookmark(id);
        return data;
      } else {
        toast.error("Failed to update Bookmark");
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Something went wrong while bookmarking the property" },
        { status: 500 }
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`h-10 w-12 rounded-full flex items-center justify-center 
      font-bold cursor-pointer
      ${
        bookmarked
          ? "bg-yellow-400 text-white cursor-not-allowed"
          : "bg-green-300 hover:bg-green-500 text-white"
      }
       ${loading ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
    >
      <FaBookmark
        className={`mr-2 transition-transform duration-300 text-lg justify-center items-center h-4 w-4 ${
          loading
            ? "animate-spin"
            : bookmarked
            ? "text-white scale-110"
            : "text-white"
        }`}
        aria-hidden="true"
      />
    </button>
  );
});

export default BookmarkButton;
