import React from "react";
import { FaBookmark } from "react-icons/fa";

const BookmarkButton = React.memo(function BookmarkButton({
  id,
  isBookmarked = false,
  onBookmark = (id) => console.log("Bookmark clicked for id:", id),
}) {
  return (
    <button
      onClick={() => !isBookmarked && onBookmark(id)}
      className={`py-2 px-4 rounded-full flex items-center justify-center 
      font-bold cursor-pointer
      ${
        isBookmarked
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-green-300 hover:bg-green-500 text-white"
      }`}
    >
      <FaBookmark aria-hidden="true" />
    </button>
  );
});

export default BookmarkButton;
