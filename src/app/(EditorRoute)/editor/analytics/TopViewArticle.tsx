"use client";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import { useGetTopPerformingContentsQuery } from "@/store/features/editor/editor.api";
import React from "react";

const TopViewArticle = () => {
  const { data, isLoading, isError } = useGetTopPerformingContentsQuery({});

  // Extract API data safely
  const topArticles = data?.data?.data || [];

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow">
      <DashboardHeader title="Views per Article & Author" />

      {/* Loading and error states */}
      {isLoading ? (
        <div className="text-center text-gray-500 py-6">Loading...</div>
      ) : isError ? (
        <div className="text-center text-red-500 py-6">
          Failed to load top articles.
        </div>
      ) : topArticles.length === 0 ? (
        <div className="text-center text-gray-500 py-6">
          No data available.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left min-w-[400px]">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="p-3 text-sm font-medium text-gray-600 min-w-[200px]">
                  Article
                </th>
                <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">
                  Author
                </th>
                <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">
                  Views
                </th>
              </tr>
            </thead>
            <tbody>
              {topArticles.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3 text-sm font-medium text-gray-800">
                    {item.title || "Untitled"}
                  </td>
                  <td className="p-3 text-sm text-gray-600 text-center">
                    {item.author || "Unknown"}
                  </td>
                  <td className="p-3 text-sm text-gray-600 text-center">
                    {item.views ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TopViewArticle;
