// "use client";


// const RecentActivity = () => {


//   // Sample dynamic data
//   const data = [
//     {
//       id: 1,
//       user: "Jane Doe",
//       action: 'submitted "The Rise of Remote Work"',
//       timeAgo: "2 hrs ago",
//     },
//     {
//       id: 2,
//       user: "Jane Doe",
//       action: 'submitted "The Rise of Remote Work"',
//       timeAgo: "5 hrs ago",
//     },
//     {
//       id: 3,
//       user: "Jane Doe",
//       action: 'submitted "The Rise of Remote Work"',
//       timeAgo: "21 hrs ago",
//     },
//     {
//       id: 4,
//       user: "Jane Doe",
//       action: 'submitted "The Rise of Remote Work"',
//       timeAgo: "1 day ago",
//     },
//     {
//       id: 5,
//       user: "Jane Doe",
//       action: 'submitted "The Rise of Remote Work"',
//       timeAgo: "1 day ago",
//     },
//   ];


//   return (
//     <div className="bg-[#f9fbfd] p-4 lg:p-8 rounded-lg shadow-md">
//       <h2 className="text-lg lg:text-xl font-medium mb-6">Recent Activity</h2>


//       <div className="space-y-3">
//         {data.map((activity) => (
//           <div key={activity.id} className="flex items-center space-x-3 border-b border-gray-200 py-2">
//             <span className="text-green-500">●</span>
//             <div>
//               <p className="font-medium text-gray-800">
//                 {activity.user} {activity.action}
//               </p>
//               <p className="text-sm text-gray-500">{activity.timeAgo}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentActivity;


"use client";

import { useGetRecentUserActivityQuery } from "@/store/features/admin/admin.api";
import SkeletonLoader from "@/components/reusable/SkeletonLoader";
import { useGetRecentActivityEditorQuery } from "@/store/features/editor/editor.api";

const RecentActivity = () => {
  const {
    data: activityData,
    isLoading,
    isFetching,
  } = useGetRecentActivityEditorQuery({});

  const activities = activityData?.data?.data?.slice(0, 5) || [];

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
