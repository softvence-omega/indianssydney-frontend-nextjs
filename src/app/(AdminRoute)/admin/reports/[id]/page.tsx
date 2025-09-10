import React from "react";
import Link from "next/link";

// Define types for report data
interface Report {
  id: number;
  profile: string;
  avatar: string;
  contentTitle: string;
  reason: string;
  screenshots: string[];
  reportedAt: string;
  status: "pending" | "reviewed" | "rejected";
}

const getReportData = (id: string | number): Report | undefined => {
  const reports: Record<number, Report> = {
    1: {
      id: 1,
      profile: "John Doe",
      avatar: "/api/placeholder/40/40",
      contentTitle:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      reason:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      screenshots: ["/api/placeholder/200/150", "/api/placeholder/200/150"],
      reportedAt: "2024-01-15T10:30:00Z",
      status: "pending",
    },
    2: {
      id: 2,
      profile: "John Doe",
      avatar: "/api/placeholder/40/40",
      contentTitle: "Another sample content report for demonstration purposes.",
      reason:
        "This is another example report with different content to show how the detail page adapts to various content lengths and types. The system should handle both short and long descriptions effectively.",
      screenshots: ["/api/placeholder/200/150"],
      reportedAt: "2024-01-14T15:45:00Z",
      status: "reviewed",
    },
    3: {
      id: 3,
      profile: "Jane Smith",
      avatar: "/api/placeholder/40/40",
      contentTitle: "Sample content report for testing purposes.",
      reason:
        "This is a comprehensive test report to verify the functionality and layout of the reporting system across different devices and screen sizes.",
      screenshots: [
        "/api/placeholder/200/150",
        "/api/placeholder/200/150",
        "/api/placeholder/200/150",
      ],
      reportedAt: "2024-01-13T09:15:00Z",
      status: "pending",
    },
    4: {
      id: 4,
      profile: "Mike Johnson",
      avatar: "/api/placeholder/40/40",
      contentTitle: "Test content with longer description.",
      reason:
        "This report contains extensive details about the reported content to test how the system handles longer text content and ensures proper formatting and readability across different viewport sizes.",
      screenshots: ["/api/placeholder/200/150"],
      reportedAt: "2024-01-12T14:20:00Z",
      status: "reviewed",
    },
  };

  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  return reports[numericId];
};

// App Router page props
interface ReportDetailPageProps {
  params: {
    id: string;
  };
}

const ReportDetailPage: React.FC<ReportDetailPageProps> = ({ params }) => {
  const report = getReportData(params.id);

  if (!report) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Report Not Found
            </h2>
            <p className="text-gray-500 mb-4">
              The report you are looking for does not exist.
            </p>
            <Link
              href="/admin/reports"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Reports
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: Report["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  return (
    <div className=" p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/admin/reports"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-4 transition-colors"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Reports
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Reports
          </h1>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Profile Section */}
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {report.profile
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {report.profile}
                </h2>
                <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <p className="text-sm text-gray-500">
                    Reported on {formatDate(report.reportedAt)}
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize mt-1 sm:mt-0 ${getStatusColor(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Details */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Content Title */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Content Title:
              </h3>
              <p className="text-base text-gray-900 leading-relaxed">
                {report.contentTitle}
              </p>
            </div>

            {/* Reason */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Reason:
              </h3>
              <p className="text-base text-gray-900 leading-relaxed">
                {report.reason}
              </p>
            </div>

            {/* Screenshots */}
            {report.screenshots && report.screenshots.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                  Screen-shots:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {report.screenshots.map((screenshot, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg overflow-hidden">
                        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                          <div className="text-center">
                            <svg
                              className="mx-auto h-8 w-8 text-gray-400 mb-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-xs text-gray-500">
                              Screenshot {index + 1}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Overlay for interaction */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg cursor-pointer"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <button className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                Mark as Reviewed
              </button>
              <button className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                Take Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;
