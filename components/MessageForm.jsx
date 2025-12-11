import React from "react";
import {
  FaEnvelope,
  FaUser,
  FaPhoneAlt,
  FaTrash,
  FaCheck,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";

const MessageForm = ({ message, index }) => {
  return (
    <div className="p-8 space-y-8">
      {/*  HEADER  */}
      <div className="relative border-b pb-6">
        <p className="absolute right-0 top-0 text-xs text-gray-500">
          {new Date(message.createdAt).toLocaleString()}
        </p>

        <div className="text-center">
          <p className="text-xl text-blue-900 font-bold flex justify-center items-center gap-2">
            <FaHome className="text-gray-400" />
            Property Inquiry #{index}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            {message.property?.name}
          </h1>

          <p className="text-gray-600 flex justify-center items-center gap-2 mt-2 text-sm">
            <FaMapMarkerAlt className="text-red-500" />
            {message.property?.location?.street},{" "}
            {message.property?.location?.city},{" "}
            {message.property?.location?.state} -{" "}
            {message.property?.location?.zipcode}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
        <p className="text-gray-800 text-lg leading-relaxed">{message.body}</p>
      </div>

      {/* SENDER DETAILS */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Sender Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-center gap-3 text-gray-700 bg-gray-50 rounded-lg p-3">
            <FaUser className="text-gray-500" />
            <p className="font-medium truncate flex items-center">
              {message.name}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-700 bg-gray-50 rounded-lg p-3">
            <FaEnvelope className="text-gray-500" />
            <a
              href={`mailto:${message.email}`}
              className="text-blue-600 hover:underline truncate flex items-center"
            >
              {message.email}
            </a>
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-700 bg-gray-50 rounded-lg p-3">
            <FaPhoneAlt className="text-gray-500" />
            <a
              href={`tel:${message.phone}`}
              className="text-blue-600 hover:underline truncate flex:items-center"
            >
              {message.phone}
            </a>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-700 bg-gray-50 rounded-lg p-3">
            <span className="text-gray-500 flex items-center">📅</span>
            <p>{new Date(message.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4 justify-center">
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg shadow-sm text-sm cursor-pointer">
          <FaCheck size={12} />
          Mark as Read
        </button>

        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-sm text-sm cursor-pointer">
          <FaTrash size={12} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default MessageForm;
