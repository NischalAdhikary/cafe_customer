import { X } from "lucide-react";
import React from "react";

export default function Modalcenter({ children, show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
      <div className="bg-white w-96 p-6 rounded-2xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
        >
          <X />
        </button>

        {children}
      </div>
    </div>
  );
}
