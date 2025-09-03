import React from "react";

export default function Modal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-4 text-white">
          <h2 className="text-lg font-semibold">Cancel Booking</h2>
        </div>
        <div className="p-6 space-y-6">
          <p>Are you sure you want to cancel the booking for Table ?</p>
          <div className="flex justify-end">
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Yes, Cancel
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md ml-2"
              onClick={onClose}
            >
              No, Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
