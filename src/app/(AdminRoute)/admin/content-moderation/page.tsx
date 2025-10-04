"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

// Mock dashboard header component
const DashboardHeader = ({ title }: { title: string }) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
  </div>
);

type ContentItem = {
  id: string;
  title: string;
  content: string;
  reason: string;
  status: "flagged" | "approved" | "rejected";
  flaggedAt: string;
  author: string;
  category: string;
  type: "Articles" | "Videos" | "Podcasts";
};

type ContentStatus = "flagged" | "approved" | "rejected";

const demoContentItems: ContentItem[] = [
  {
    id: "1",
    title: "The Rise of AI in 2024",
    content:
      "This article is full of propaganda. It should be taken down immediately.",
    reason: "Hate Speech Detected by AI.",
    status: "flagged",
    flaggedAt: "2025-09-12T10:30:00Z",
    author: "Jane Doe",
    category: "Business & Innovation",
    type: "Articles",
  },
  {
    id: "2",
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content:
      "This article is full of propaganda. It should be taken down immediately.",
    reason: "Hate Speech Detected by AI.",
    status: "flagged",
    flaggedAt: "2025-09-12T09:15:00Z",
    author: "John Smith",
    category: "News & Affairs",
    type: "Articles",
  },
  {
    id: "3",
    title: "The Rise of AI in 2024",
    content: "Comprehensive analysis of AI trends and developments.",
    reason: "Manual Review - Approved",
    status: "approved",
    flaggedAt: "2025-06-17T08:45:00Z",
    author: "Jane Doe",
    category: "News & Affairs",
    type: "Articles",
  },
  {
    id: "4",
    title: "The Rise of AI in 2024",
    content: "Comprehensive analysis of AI trends and developments.",
    reason: "Manual Review - Approved",
    status: "approved",
    flaggedAt: "2025-06-17T16:20:00Z",
    author: "Jane Doe",
    category: "News & Affairs",
    type: "Articles",
  },
  {
    id: "5",
    title: "The Rise of AI in 2024",
    content: "Comprehensive analysis of AI trends and developments.",
    reason: "Manual Review - Approved",
    status: "approved",
    flaggedAt: "2025-06-17T14:10:00Z",
    author: "Jane Doe",
    category: "News & Affairs",
    type: "Articles",
  },
  {
    id: "6",
    title: "The Rise of AI in 2024",
    content: "Comprehensive analysis of AI trends and developments.",
    reason: "Manual Review - Approved",
    status: "approved",
    flaggedAt: "2025-06-17T12:00:00Z",
    author: "Jane Doe",
    category: "News & Affairs",
    type: "Articles",
  },
  {
    id: "7",
    title: "The Rise of AI in 2024",
    content: "Comprehensive analysis of AI trends and developments.",
    reason: "Manual Review - Approved",
    status: "approved",
    flaggedAt: "2025-06-17T10:30:00Z",
    author: "Jane Doe",
    category: "News & Affairs",
    type: "Articles",
  },
  {
    id: "8",
    title: "The Rise of AI in 2024",
    content: "Comprehensive analysis of AI trends and developments.",
    reason: "Manual Review - Approved",
    status: "approved",
    flaggedAt: "2025-06-17T10:30:00Z",
    author: "Jane Doe",
    category: "News & Affairs",
    type: "Articles",
  },
];

const ContentModerationCard = ({
  item,
  onAction,
}: {
  item: ContentItem;
  onAction: (
    id: string,
    action: "approve" | "reject" | "delete",
    reason?: string
  ) => void;
}) => {
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    "approve" | "reject" | "delete" | null
  >(null);
  const [actionReason, setActionReason] = useState("");

  const handleAction = (action: "approve" | "reject" | "delete") => {
    if (action === "delete") {
      onAction(item.id, action);
    } else {
      setPendingAction(action);
      setShowReasonDialog(true);
    }
  };

  const confirmAction = () => {
    if (pendingAction) {
      onAction(item.id, pendingAction, actionReason);
      setShowReasonDialog(false);
      setPendingAction(null);
      setActionReason("");
    }
  };

  const getStatusBadge = (status: ContentStatus) => {
    switch (status) {
      case "flagged":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            Flagged
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Rejected
          </Badge>
        );
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">{getStatusBadge(item.status)}</div>
        </div>

        <h3 className="font-medium text-gray-900 mb-3 leading-relaxed">
          {item.title}
        </h3>

        <p className="text-gray-700 mb-4 italic">{item.content}</p>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-900 mb-1">Reason:</p>
          <p className="text-sm text-red-600">{item.reason}</p>
        </div>

        <div className="flex gap-3">
          {item.status === "flagged" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction("approve")}
                className="border-gray-300 hover:bg-gray-50"
              >
                No Action
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction("reject")}
                className="border-gray-300 hover:bg-gray-50"
              >
                Edit
              </Button>
            </>
          )}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleAction("delete")}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete Content
          </Button>
        </div>
      </div>

      <Dialog open={showReasonDialog} onOpenChange={setShowReasonDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {pendingAction === "approve"
                ? "Approve Content"
                : "Reject Content"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Reason for {pendingAction}</Label>
              <Textarea
                placeholder={`Enter reason for ${pendingAction}ing this content...`}
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowReasonDialog(false);
                setPendingAction(null);
                setActionReason("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmAction}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Confirm {pendingAction}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ContentModerationPage = () => {
  const [filter, setFilter] = useState<"moderation" | "all">("moderation");
  const [contentItems, setContentItems] =
    useState<ContentItem[]>(demoContentItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    date: "all",
    status: "all",
  });

  const filteredContent = contentItems.filter((item) => {
    if (filter === "moderation") {
      return item.status === "flagged";
    }
    return true; // Show all content for "All Contents" tab
  });

  const handleAction = (
    id: string,
    action: "approve" | "reject" | "delete",
    reason?: string
  ) => {
    setContentItems((prev) => {
      if (action === "delete") {
        return prev.filter((item) => item.id !== id);
      } else {
        return prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: action === "approve" ? "approved" : "rejected",
                reason: reason || item.reason,
              }
            : item
        );
      }
    });
  };

  const getTabCounts = () => {
    return {
      moderation: contentItems.filter((item) => item.status === "flagged")
        .length,
      all: contentItems.length,
    };
  };

  const tabCounts = getTabCounts();

  // Table view logic
  const itemsPerPage = 7;
  const totalPages = Math.ceil(contentItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = contentItems.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: ContentStatus) => {
    switch (status) {
      case "flagged":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Under Review
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Published
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Rejected
          </Badge>
        );
    }
  };

  const renderTableView = () => (
    <div className="space-y-4">
      {/* Advanced Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Advanced Filters
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <Select
              value={filters.type}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Articles">Articles</SelectItem>
                <SelectItem value="Videos">Videos</SelectItem>
                <SelectItem value="Podcasts">Podcasts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={filters.category}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="News & Affairs">News & Affairs</SelectItem>
                <SelectItem value="Business & Innovation">
                  Business & Innovation
                </SelectItem>
                <SelectItem value="Voice & Perspective">
                  Voice & Perspective
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={filters.date}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, date: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="last7">Last 7 Days</SelectItem>
                <SelectItem value="last15">Last 15 Days</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Published</SelectItem>
                <SelectItem value="flagged">Under Review</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 w-2/5">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(item.flaggedAt)}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-900">{item.author}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-900">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center px-6 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="h-8"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {Array.from(
              { length: Math.min(totalPages, 5) },
              (_, i) => i + 1
            ).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 ${
                  currentPage === page ? "bg-gray-900 text-white" : ""
                }`}
              >
                {page}
              </Button>
            ))}

            {totalPages > 5 && (
              <span className="text-sm text-gray-500">...</span>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="h-8"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <div className="flex justify-between items-center gap-4 mb-6">
          <DashboardHeader title="Content Moderation" />
        </div>

        <div className="flex gap-8 mb-6 border-b border-gray-200">
          <button
            className={`pb-3 px-1 relative ${
              filter === "moderation"
                ? "text-orange-500 font-semibold border-b-2 border-orange-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setFilter("moderation")}
          >
            Moderation Queue
            {tabCounts.moderation > 0 && (
              <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {tabCounts.moderation}
              </span>
            )}
          </button>
          <button
            className={`pb-3 px-1 relative ${
              filter === "all"
                ? "text-orange-500 font-semibold border-b-2 border-orange-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setFilter("all")}
          >
            All Contents
          </button>
        </div>

        <div className="space-y-4">
          {filter === "moderation" &&
            // Card view for Moderation Queue
            (filteredContent.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredContent.map((item) => (
                  <ContentModerationCard
                    key={item.id}
                    item={item}
                    onAction={handleAction}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No flagged content available.</p>
              </div>
            ))}

          {filter === "all" && renderTableView()}
        </div>
      </div>
    </div>
  );
};

export default ContentModerationPage;
