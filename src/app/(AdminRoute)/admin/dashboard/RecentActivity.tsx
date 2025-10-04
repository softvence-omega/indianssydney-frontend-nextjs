"use client";

import { useGetRecentUserActivityQuery } from "@/store/features/admin/admin.api";
import SkeletonLoader from "@/components/reusable/SkeletonLoader";

const RecentActivity = () => {
  const {
    data: activityData,
    isLoading,
    isFetching,
  } = useGetRecentUserActivityQuery({});

  const activities = activityData?.data?.data || [];

  return (
    <div className="bg-[#f9fbfd] p-4 lg:p-8 rounded-lg shadow-md">
      <h2 className="text-lg lg:text-xl font-medium mb-6">Recent Activity</h2>

      {isLoading || isFetching ? (
        <SkeletonLoader />
      ) : activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity: any, index: number) => (
            <div
              key={index}
              className="flex items-center space-x-3 border-b border-gray-200 py-2"
            >
              <span className="text-green-500">●</span>
              <div>
                <p className="font-medium text-gray-800">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No recent activity found.</p>
      )}
    </div>
  );
};

export default RecentActivity;
