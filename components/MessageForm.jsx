import React from "react";
import {
  FaEnvelope,
  FaUser,
  FaPhoneAlt,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

const MessageForm = ({ message }) => {
  return (
    <div className="relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Property Inquiry
          </h2>

          <p className="text-sm text-blue-600 font-medium">
            {message.property.name}
          </p>
        </div>

        <p className="text-xs text-gray-500">
          {new Date(message.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
        <p className="text-gray-700 leading-relaxed">{message.body}</p>
      </div>
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaUser className="text-gray-500" />
          <span className="font-medium">{message.name}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <FaEnvelope className="text-gray-500" />
          <a
            href={`mailto:${message.email}`}
            className="text-blue-600 hover:underline"
          >
            {message.email}
          </a>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <FaPhoneAlt className="text-gray-500" />
          <a
            href={`tel:${message.phone}`}
            className="text-blue-600 hover:underline"
          >
            {message.phone}
          </a>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition cursor-pointer">
          <FaCheck size={12} />
          Mark As Read
        </button>

        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition cursor-pointer">
          <FaTrash size={12} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default MessageForm;
