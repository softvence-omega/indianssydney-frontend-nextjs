"use client";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import { useGetEditorActivityQuery } from "@/store/features/admin/admin.api";
import SkeletonLoader from "@/components/reusable/SkeletonLoader";

interface EditorStats {
  id: string;
  name: string;
  profileImage?: string;
  approved: number;
  declined: number;
  totalReview: number;
}

const EditorActivity = () => {
  const {
    data: editorActivity,
    isLoading,
    isFetching,
  } = useGetEditorActivityQuery({});

  const rawActivities = editorActivity?.data?.data || [];

  // Group and count stats per editor
  const editorStats: EditorStats[] = Object.values(
    rawActivities.reduce((acc: Record<string, EditorStats>, item: any) => {
      const editorName = item?.changedBy?.name || "Unknown Editor";

      if (!acc[editorName]) {
        acc[editorName] = {
          id: item.id,
          name: editorName,
          profileImage: item?.changedBy?.profileImage || "/default-avatar.png",
          approved: 0,
          declined: 0,
          totalReview: 0,
        };
      }

      // Increment counts based on newStatus
      if (item.newStatus?.toUpperCase() === "APPROVE")
        acc[editorName].approved++;
      if (item.newStatus?.toUpperCase() === "DECLINED")
        acc[editorName].declined++;

      acc[editorName].totalReview++;
      return acc;
    }, {})
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <DashboardHeader title="Editor Activity" />

      {isLoading || isFetching ? (
        <SkeletonLoader />
      ) : editorStats.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left min-w-[400px]">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="p-3 text-sm font-medium text-gray-600 min-w-[200px]">
                  Profile
                </th>
                <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[100px]">
                  Approved
                </th>
                <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[100px]">
                  Declined
                </th>
                <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[100px]">
                  Total Review
                </th>
              </tr>
            </thead>
            <tbody>
              {editorStats.map((editor) => (
                <tr
                  key={editor.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-3">
                      <img
                        src={editor.profileImage}
                        alt={editor.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {editor.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-center text-green-600">
                    {editor.approved}
                  </td>
                  <td className="p-3 text-sm text-center text-red-500">
                    {editor.declined}
                  </td>
                  <td className="p-3 text-sm text-center text-gray-700">
                    {editor.totalReview}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-sm mt-3">No editor activity found.</p>
      )}
    </div>
  );
};

export default EditorActivity;
