"use client";

import { useTopperformancetagsQuery } from "@/store/features/admin/llm.api";

const TopPerformingTags = () => {
  const { data, isLoading, isError } = useTopperformancetagsQuery(undefined);

  const tags: string[] = data?.data?.data || data?.data || [];

  console.log("top tags:", tags);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Top Performing Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 text-gray-300 text-sm rounded-full animate-pulse"
            >
              ####
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-red-500">
        Failed to load tags
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Top Performing Tags
      </h3>

      <div className="flex flex-wrap gap-2">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-orange-100 hover:text-orange-700 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))
        ) : (
          <p className="text-sm text-gray-500">No tags available</p>
        )}
      </div>
    </div>
  );
};

export default TopPerformingTags;
