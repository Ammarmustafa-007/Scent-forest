import React from "react";

export function Sucessalert({ show, onClose, message = "Action successful!" }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Alert Box */}
      <div className="relative bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center animate-slideDown z-10">
        {/* Green Tick */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
          <svg
            className="w-10 h-10 text-green-600 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Message */}
        <p className="mt-4 text-lg font-semibold text-gray-800 text-center">
          {message}
        </p>
      </div>
    </div>
  );
}
