"use client";
import React from "react";
import Link from "next/link";

// Sample dynamic data - in a real app, this would come from an API or database
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
    // In a real app, this would make an API call to delete the report
    console.log(`Delete report with id: ${id}`);
    // Add your delete logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            All Reports
          </h1>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {report.profile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.content}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      <p className="truncate">{report.reason}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link
                        href={`/admin/reports/${report.id}`}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(report.id)}
                        className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                      >
                        Delete
                      </button>
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

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Link
                      href={`/reports/${report.id}`}
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {reportsData.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reports found
            </h3>
            <p className="text-gray-500">
              There are no reports to display at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsListPage;
