import React from "react";

export default function SkeletonCard() {
  return (
    <div className="flex items-center bg-gray-100 animate-pulse rounded-lg shadow p-4">
      <div className="w-24 h-24 bg-gray-300 rounded-lg mr-4"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
}
