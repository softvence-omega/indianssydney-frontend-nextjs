"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Sample dynamic data
const reportsData = [
  {
    id: "1",
    profile: "John Doe",
    content: "Lorem Ipsum",
    reason:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "2",
    profile: "John Doe",
    content: "Lorem Ipsum",
    reason:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "3",
    profile: "Jane Smith",
    content: "Sample Content",
    reason:
      "Another sample reason for demonstration purposes in the reporting system.",
  },
  {
    id: "4",
    profile: "Mike Johnson",
    content: "Test Content",
    reason:
      "This is a test content report with a longer reason to show text wrapping capabilities.",
  },
];

const ReportsListPage = () => {
  const handleDelete = (id: string) => {
    console.log(`Delete report with id: ${id}`);
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
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportsData.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {report.profile}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {report.content}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {report.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link href={`/admin/reports/${report.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(report.id)}
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
        {reportsData.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-lg shadow p-4 sm:p-6"
          >
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {report.profile}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </h3>
                <p className="mt-1 text-sm text-gray-900">{report.content}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </h3>
                <p className="mt-1 text-sm text-gray-700">{report.reason}</p>
              </div>
              <div className="pt-3 border-t border-gray-200 flex gap-2">
                <Link href={`/admin/reports/${report.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleDelete(report.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {reportsData.length === 0 && (
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
