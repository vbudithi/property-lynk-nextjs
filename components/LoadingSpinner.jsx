"use client";
import { ClipLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="flex flex-col items-center">
        <ClipLoader color="#3b82F6" size={80} aria-label="Loading Spinner" />
        <p className="mt-6 text-blue-600 font-semibold text-lg animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
