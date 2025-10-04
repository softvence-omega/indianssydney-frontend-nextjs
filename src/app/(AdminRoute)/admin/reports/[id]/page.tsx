"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
        "It is a long established fact that a reader will be distracted by the readable content...",
      screenshots: ["/api/placeholder/200/150", "/api/placeholder/200/150"],
      reportedAt: "2024-01-15T10:30:00Z",
      status: "pending",
    },
  };

  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  return reports[numericId];
};

interface ReportDetailPageProps {
  params: { id: string };
}

const ReportDetailPage: React.FC<ReportDetailPageProps> = ({ params }) => {
  const reportData = getReportData(params.id);

  const [report, setReport] = useState(reportData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<Report["status"]>("pending");

  if (!report) {
    return (
      <div className="p-6">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Report Not Found</h2>
          <p className="text-gray-500 mb-4">
            The report you are looking for does not exist.
          </p>
          <Link href="/admin/reports">
            <Button>Back to Reports</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

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

  const handleSaveStatus = () => {
    if (report) {
      setReport({ ...report, status: newStatus });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          href="/admin/reports"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to Reports
        </Link>

        {/* Report Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{report.profile}</h1>
                <p className="text-sm text-gray-500">
                  Reported on {formatDate(report.reportedAt)}
                </p>
              </div>
              <Badge className={getStatusColor(report.status)}>
                {report.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Content Title */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase">
                Content Title
              </h3>
              <p className="mt-1 text-base">{report.contentTitle}</p>
            </div>

            {/* Reason */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase">
                Reason
              </h3>
              <p className="mt-1 text-base">{report.reason}</p>
            </div>

            {/* Screenshots */}
            {report.screenshots.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                  Screenshots
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {report.screenshots.map((s, i) => (
                    <img
                      key={i}
                      src={s}
                      alt={`screenshot-${i}`}
                      className="rounded-lg border"
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
            <Button
              variant="outline"
              onClick={() => setReport({ ...report, status: "reviewed" })}
            >
              Mark as Reviewed
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Take Action
            </Button>
          </div>
        </Card>
      </div>

      {/* Action Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Take Action on Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Select a new status for this report.
            </p>
            <Select
              value={newStatus}
              onValueChange={(value: Report["status"]) => setNewStatus(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStatus} className="bg-red-600">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportDetailPage;
