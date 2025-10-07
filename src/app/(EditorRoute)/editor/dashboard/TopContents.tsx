"use client";

import { useGetTopPerformingContentsQuery } from "@/store/features/editor/editor.api";

const TopContents = () => {
  const { data, isLoading, isError } = useGetTopPerformingContentsQuery({});

  // Extract actual API data safely
  const topContents = data?.data?.data?.slice(0, 5) || [];

  if (isLoading) {
    return (
      <div className="bg-[#f9fbfd] p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">Loading top performing contents...</p>
      </div>
    );
  }

  if (isError || !topContents.length) {
    return (
      <div className="bg-[#f9fbfd] p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No top performing contents found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f9fbfd] p-4 lg:p-8 rounded-lg shadow-md">
      <h2 className="text-lg lg:text-xl font-semibold mb-6 text-gray-800">
        Top Performing Contents
      </h2>

      <div className="space-y-4">
        {topContents.map((content: any, index: number) => (
          <div
            key={index}
            className="p-4 bg-[#F4F5F4] rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-base font-medium text-gray-800">
              {content.title || "Untitled"}
            </h3>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <p>Views: {content.views ?? 0}</p>
              <p>Author: {content.author || "Unknown"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContents;
