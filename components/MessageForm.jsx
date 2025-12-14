"use client";
import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaUser,
  FaPhoneAlt,
  FaTrash,
  FaCheck,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Link from "next/link";

const MessageForm = ({ message, index, handleDelete, handleMarkRead }) => {
  const [isRead, setIsRead] = useState(message.read);
  useEffect(() => {
    setIsRead(message.read);
  }, [message.read]);

  return (
    <div className="relative p-8 mb-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
      {!isRead && (
        <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          NEW
        </div>
      )}

      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <div className="flex justify-center items-center">
          <p className="text-xl font-bold text-blue-900 flex gap-2 items-center">
            <FaHome className="text-gray-500" />
            Property Inquiry #{index}
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 hover:text-blue-600">
          <Link
            href={`/properties/${message.property?._id}`}
            className="hover:underline"
          >
            {message.property?.name}
          </Link>
        </h1>

        <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
          <FaMapMarkerAlt className="text-red-500" />
          <span>
            {message.property?.location?.street},{" "}
            {message.property?.location?.city},{" "}
            {message.property?.location?.state} -{" "}
            {message.property?.location?.zipcode}
          </span>
        </div>
      </div>

      <div className="ml-4 text-right -mt-5">
        <p className="text-xs text-gray-500 whitespace-nowrap">
          {new Date(message.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6 shadow-sm">
        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
          {message.body}
        </p>
      </div>

      {/* Sender Details*/}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Sender Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 text-gray-700">
            <FaUser className="text-gray-500" />
            <span className="font-medium truncate">{message.name}</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 text-gray-700">
            <FaEnvelope className="text-gray-500" />
            <a
              href={`mailto:${message.email}`}
              className="text-blue-600 hover:underline truncate"
            >
              {message.email}
            </a>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 text-gray-700">
            <FaPhoneAlt className="text-gray-500" />
            <a
              href={`tel:${message.phone}`}
              className="text-blue-600 hover:underline truncate"
            >
              {message.phone}
            </a>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 text-gray-700">
            📅
            <span>{new Date(message.createdAt).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-6">
        <button
          onClick={() => handleMarkRead(message._id)}
          className={`flex items-center gap-2 ${
            isRead
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-gray-600 hover:bg-gray-700 text-white"
          }   py-2 px-4 rounded-lg shadow-sm text-sm cursor-pointer`}
        >
          <FaCheck size={12} />
          {isRead ? "Mark As New" : "Mark As Read"}
        </button>

        <button
          onClick={() => handleDelete(message._id)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-sm text-sm cursor-pointer"
        >
          <FaTrash size={12} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default MessageForm;
