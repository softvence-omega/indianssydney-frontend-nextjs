"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  useGetAllReportsQuery,
  useSoftDeleteReportMutation,
} from "@/store/features/admin/report.api";
import { toast } from "sonner";

const ReportsListPage = () => {
  const { data, isLoading, isError } = useGetAllReportsQuery({});
  const [deleteReport] = useSoftDeleteReportMutation();

  if (isLoading)
    return <p className="text-center text-gray-500">Loading reports...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500">
        Failed to load reports. Please try again.
      </p>
    );

  const reports = data?.data || [];

  const handleDelete = async (reportId: string) => {
    try {
      const response = await deleteReport(reportId).unwrap();
      if (response?.success) {
        toast.success(response?.message);
      }
    } catch (err) {
      console.error("Failed to delete report:", err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between mb-6 sm:mb-8 gap-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
          <p className="text-sm text-gray-500">
            View, review, and manage reported content.
          </p>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reporter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Screenshot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report: any) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  {/* Reporter Info */}
                  <td className="px-6 py-4 flex items-center gap-2">
                    <img
                      src={report.user?.profilePhoto}
                      alt={report.user?.fullName || "User"}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {report.user?.fullName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {report.user?.email}
                      </p>
                    </div>
                  </td>

                  {/* Content Title */}
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {report?.content?.title || "Untitled"}
                  </td>

                  {/* Reason */}
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {report.reason}
                  </td>

                  {/* Screenshot */}
                  <td className="px-6 py-4">
                    {report.images?.[0]?.imageUrl ? (
                      <img
                        src={report.images[0].imageUrl}
                        alt="Screenshot"
                        width={80}
                        height={50}
                        className="rounded-md object-cover border"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No image</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link href={`/admin/reports/${report.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleDelete(report.id)}
                      variant="destructive"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {reports.map((report: any) => (
          <div
            key={report.id}
            className="bg-white rounded-lg shadow p-4 sm:p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={report.user?.profilePhoto}
                alt={report.user?.fullName || "User"}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">
                  {report.user?.fullName}
                </p>
                <p className="text-xs text-gray-500">{report.user?.email}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                {report.content?.title || "Untitled"}
              </h3>
              <p className="text-sm text-gray-600">{report.reason}</p>

              {report.images?.[0]?.imageUrl && (
                <img
                  src={report.images[0].imageUrl}
                  alt="Screenshot"
                  width={300}
                  height={200}
                  className="rounded-md mt-3 border object-cover"
                />
              )}
            </div>

            <div className="pt-3 border-t border-gray-200 flex gap-2 mt-4">
              <Link href={`/admin/reports/${report.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View
                </Button>
              </Link>
              <Button variant="destructive" className="flex-1">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {reports.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No reports found
          </h3>
          <p className="text-gray-500">
            There are no reports to display at this time.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportsListPage;
