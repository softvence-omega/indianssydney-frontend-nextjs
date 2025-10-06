"use client";

import { useGetTopContributorsQuery } from "@/store/features/editor/editor.api";
import React from "react";

const TopContributor = () => {
  const { data, isLoading, isError } = useGetTopContributorsQuery({});

  // Extract API data safely
  const contributors = data?.data?.data?.slice(0, 5) || [];

  // Fallback avatar for users without profile photos
  const defaultAvatar = "https://via.placeholder.com/40x40.png?text=User";

  return (
    <div className="bg-[#f9fbfd] p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Top Contributors</h2>
        <div className="flex items-center">
          <label htmlFor="month" className="text-sm text-gray-600 mr-2">
            Select Month:
          </label>
          <select
            id="month"
            className="text-sm bg-white p-2 rounded-md border border-gray-300"
            defaultValue="October"
          >
            <option>August</option>
            <option>September</option>
            <option>October</option>
          </select>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center text-gray-500 py-4">
          Loading top contributors...
        </div>
      )}

      {/* Error or Empty state */}
      {isError || contributors.length === 0 ? (
        !isLoading && (
          <div className="text-center text-gray-500 py-4">
            No contributor data found.
          </div>
        )
      ) : (
        /* Table */
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left min-w-[400px]">
            <thead className="border-b border-gray-300 bg-gray-50">
              <tr>
                <th className="p-3 text-sm font-medium text-gray-600 min-w-[200px]">
                  Profile
                </th>
                <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">
                  Articles Published
                </th>
                <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">
                  Total Views
                </th>
              </tr>
            </thead>

            <tbody>
              {contributors.map((user: any, index: number) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          user.profilePhoto
                            ? user.profilePhoto.startsWith("http")
                              ? user.profilePhoto
                              : `https://indianssydney-backend.onrender.com${user.profilePhoto}`
                            : defaultAvatar
                        }
                        alt={user.name || "User"}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {user.name || "Unknown User"}
                      </span>
                    </div>
                  </td>

                  <td className="p-3 text-sm text-gray-600 text-center">
                    {user.totalPublished ?? 0}
                  </td>

                  <td className="p-3 text-sm text-gray-600 text-center">
                    {user.totalViews ?? 0}
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

export default TopContributor;
