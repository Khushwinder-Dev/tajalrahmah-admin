import React from "react";

const UsersSkeleton = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {/* Total */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <div className="w-12 h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
            <div className="w-6 h-5 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Active */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <div className="w-12 h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
            <div className="w-6 h-5 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Inactive */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <div className="w-12 h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
            <div className="w-6 h-5 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Draft */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <div className="w-12 h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
            <div className="w-6 h-5 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Updated */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <div className="w-12 h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
            <div className="w-6 h-5 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Deleted */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <div className="w-12 h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
            <div className="w-6 h-5 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <div className="w-12 h-8 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-16 h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>

        <div className="flex gap-2">
          <div className="w-16 h-8 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-14 h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>

      {/* User Grid - 4 columns */}
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 20 }, (_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-full h-20 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersSkeleton;
