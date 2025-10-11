"use client";

import { useState } from "react";
import { Select } from "@headlessui/react";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import { useGetNotificationsQuery } from "@/store/features/notifications/notification.api";

const Notifications = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  const { data, isLoading, isError } = useGetNotificationsQuery({});
  const notifications = data?.data?.notifications || [];

  if (isLoading)
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <DashboardHeader title="Notifications" />
        <p className="text-center text-gray-500 mt-6">
          Loading notifications...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <DashboardHeader title="Notifications" />
        <p className="text-center text-red-500 mt-6">
          Failed to load notifications.
        </p>
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <DashboardHeader title="Notifications" />

        {/* Filter Dropdown */}
        <Select
          as="select"
          value={selectedFilter}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md text-gray-600"
        >
          <option value="All">All</option>
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </Select>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification: any, index: number) => (
            <div
              key={notification.id || index}
              className="flex justify-between items-center border-b border-gray-200 py-4"
            >
              {/* Left Section */}
              <div className="flex items-center gap-3">
                {notification.meta?.thumbnail && (
                  <img
                    src={notification.meta.thumbnail}
                    alt={notification.title}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold">{notification.title}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notification.meta?.date).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Right Section - Type Tag */}
              <span
                className={`text-xs py-1 px-3 rounded-md text-white ${
                  notification.type === "LiveEvent"
                    ? "bg-blue-primary"
                    : "bg-gray-500"
                }`}
              >
                {notification.type}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">
            No notifications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
