// components/skeletons/Skeletons.js
import React from "react";

// Base skeleton component
export const Skeleton = ({
  className = "",
  width = "w-full",
  height = "h-4",
}) => (
  <div
    className={`bg-gray-300 rounded animate-pulse ${width} ${height} ${className}`}
  ></div>
);

// Menu item skeleton
export const MenuItemSkeleton = () => (
  <div className="flex items-center bg-gray-50 rounded-lg shadow-lg p-4 animate-pulse">
    <Skeleton width="w-24" height="h-24" className="rounded-lg mr-4" />
    <div className="flex-1">
      <Skeleton width="w-3/4" height="h-4" className="mb-2" />
      <div className="flex items-center mt-1 mb-2">
        <Skeleton width="w-4" height="h-4" className="mr-1" />
        <Skeleton width="w-8" height="h-3" />
      </div>
      <Skeleton width="w-20" height="h-4" />
    </div>
    <div className="flex flex-col items-center justify-center gap-2">
      <Skeleton width="w-16" height="h-8" />
      <Skeleton width="w-12" height="h-3" />
    </div>
  </div>
);

// Category button skeleton
export const CategoryButtonSkeleton = ({ width = "w-20" }) => (
  <Skeleton width={width} height="h-10" className="rounded-lg" />
);

// Menu items grid skeleton
export const MenuItemsSkeletonGrid = ({ count = 6 }) => (
  <div className="p-4 w-full max-w-full container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
    {[...Array(count)].map((_, index) => (
      <MenuItemSkeleton key={`menu-skeleton-${index}`} />
    ))}
  </div>
);

// Category list skeleton
export const CategoryListSkeleton = () => (
  <div className="flex items-center gap-3 p-4 flex-nowrap overflow-x-auto">
    <CategoryButtonSkeleton width="w-16" />
    <CategoryButtonSkeleton width="w-24" />
    <CategoryButtonSkeleton width="w-20" />
    <CategoryButtonSkeleton width="w-28" />
    <CategoryButtonSkeleton width="w-22" />
    <CategoryButtonSkeleton width="w-26" />
  </div>
);

// Card skeleton (generic)
export const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg p-4 animate-pulse">
    <Skeleton width="w-full" height="h-40" className="mb-4" />
    <Skeleton width="w-3/4" height="h-4" className="mb-2" />
    <Skeleton width="w-1/2" height="h-4" className="mb-4" />
    <div className="flex justify-between items-center">
      <Skeleton width="w-1/4" height="h-4" />
      <Skeleton width="w-20" height="h-8" />
    </div>
  </div>
);


export const ListItemSkeleton = () => (
  <div className="flex items-center p-4 border-b animate-pulse">
    <Skeleton width="w-12" height="h-12" className="rounded-full mr-3" />
    <div className="flex-1">
      <Skeleton width="w-3/4" height="h-4" className="mb-2" />
      <Skeleton width="w-1/2" height="h-3" />
    </div>
  </div>
);
