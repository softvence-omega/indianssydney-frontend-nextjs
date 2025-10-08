"use client";

import { useState } from "react";
import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { Select } from "@headlessui/react"; // For dropdown filtering
import { useGetNotificationsQuery } from "@/store/features/notifications/notification.api";

// Sample notifications data
const notificationsData = [
  {
    type: "Saved",
    author: "Jenny Wilson",
    title:
      "'Doomsday Mom': What to Know About Lori Vallow Daybell’s Life Sentences",
    date: "July 26, 2025",
    status: "saved",
  },
  {
    type: "Submitted",
    author: "John Doe",
    title: "Pakistani star offers condolences after Milestone crash",
    date: "July 22, 2025",
    status: "pending",
  },
  {
    type: "Rejected",
    author: "Jane Smith",
    title: "Breaking News: Market crash",
    date: "July 20, 2025",
    status: "rejected",
  },
];

const Notifications = () => {
  const { data, isLoading, isError } = useGetNotificationsQuery({});
  console.log(data);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div>
      <CommonWrapper>
        <CommonPadding>
          <div>
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
              <PrimaryHeading title="Notifications" icon={false} />

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
              {notificationsData.map((notification, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 py-4"
                >
                  {/* Left Section - Article Details */}

                  <div>
                    <p className="text-xs text-gray-500">
                      {notification.status === "saved"
                        ? "You have saved this article"
                        : notification.status === "pending"
                        ? "You've submitted an article"
                        : "You're submitted article has been rejected"}
                    </p>
                    <p className="text-sm font-semibold py-1">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-400">{notification.date}</p>
                  </div>

                  {/* Right Section - Status and Action */}
                  <div className="flex">
                    <span
                      className={`text-xs py-1 px-3 text-white ${
                        notification.status === "saved"
                          ? "bg-blue-primary"
                          : notification.status === "pending"
                          ? "bg-[#8D9B90] "
                          : "bg-brick-red "
                      }`}
                    >
                      {notification.status === "saved"
                        ? "Saved"
                        : notification.status === "pending"
                        ? "Pending"
                        : "Rejected"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default Notifications;
