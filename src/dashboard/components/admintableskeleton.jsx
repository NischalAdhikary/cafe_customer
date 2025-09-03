import React from "react";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

const TableManagementSkeleton = () => {
  const skeletonTables = Array.from({ length: 12 }, (_, index) => index);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full space-y-6 mx-auto">
        <div className="mb-8">
          <div className="h-9 bg-gray-200 rounded-lg w-64 mb-2 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded-lg w-80 animate-pulse"></div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded w-12 animate-pulse"></div>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skeletonTables.map((index) => (
              <div
                key={index}
                className="relative p-4 rounded-lg border-2 border-gray-200 bg-gray-50 animate-pulse"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>

                  <div className="text-center">
                    <div className="h-6 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </div>

                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="mb-4">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { color: "bg-green-50 border-green-200" },
              { color: "bg-yellow-50 border-yellow-200" },
              { color: "bg-red-50 border-red-200" },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg border ${item.color}`}
              >
                <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-300 rounded w-16 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-32 mb-1 animate-pulse"></div>
                  <div className="h-3 bg-gray-300 rounded w-12 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableManagementSkeleton;
