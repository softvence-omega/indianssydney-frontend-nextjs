"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import ArticleCard from "../articles/ArticleCard"; // Reusing ArticleCard for videos
import SkeletonLoader from "@/components/reusable/SkeletonLoader";
import {
  useGetVideosApprovedQuery,
  useGetVideosPendingQuery,
  useGetVideosDeclinedQuery,
} from "@/store/features/videoPodcast/video.api";
import { useUpdateArticleStatusMutation } from "@/store/features/article/article.api";

type VideoStatus = "APPROVE" | "PENDING" | "Declined";

const VideosPage = () => {
  const [activeTab, setActiveTab] = useState<VideoStatus>("APPROVE");

  // Fetch all video data by status
  const {
    data: approvedData,
    isLoading: loadingApproved,
    isError: errorApproved,
  } = useGetVideosApprovedQuery({});

  const {
    data: pendingData,
    isLoading: loadingPending,
    isError: errorPending,
  } = useGetVideosPendingQuery({});

  const {
    data: declinedData,
    isLoading: loadingDeclined,
    isError: errorDeclined,
  } = useGetVideosDeclinedQuery({});

  const [updateStatus] = useUpdateArticleStatusMutation();

  const handleStatusChange = async (
    id: string,
    status: "APPROVE" | "Declined"
  ) => {
    try {
      await updateStatus({ id, status });
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // ✅ Render function (like ArticlesPage)
  const renderVideos = (data: any, isLoading: boolean, isError: boolean) => {
    if (isLoading) return <SkeletonLoader />;
    if (isError) return <p className="text-red-500">Failed to load videos.</p>;
    const videos = data?.VIDEO?.filter(
      (item: any) => item.contentType === "VIDEO"
    );

    if (!videos?.length) return <p>No videos found.</p>;

    return videos.map((video: any) => {
      let parsedCompareResult = null;
      if (video.compareResult) {
        try {
          parsedCompareResult = JSON.parse(video.compareResult);
        } catch (error) {
          console.error("Error parsing compareResult:", error);
        }
      }

      return (
        <ArticleCard
          key={video.id}
          article={{
            id: video.id,
            contentType: video.contentType,
            title: video.title,
            description:
              video.subTitle || video.paragraph || "No description available",
            author: video.user?.fullName || "Unknown",
            date: new Date(video.createdAt).toLocaleDateString(),
            status: video.status,
            negativity: {
              score: video.evaluationResult?.negativityScore || 0,
              positives: [],
              negatives: [],
            },
            compareResult: parsedCompareResult,
          }}
          onStatusChange={handleStatusChange}
        />
      );
    });
  };

  return (
    <div>
      <DashboardHeader title="Video Podcasts" />

      {/* ---------- Tabs. ------------------- */}
      <div className="flex gap-4 mb-6">
        {["APPROVE", "PENDING", "Declined"].map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer ${
              activeTab === tab
                ? "text-accent-orange font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab as VideoStatus)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Render Based on Active Tab */}
      {activeTab === "APPROVE" &&
        renderVideos(approvedData, loadingApproved, errorApproved)}

      {activeTab === "PENDING" &&
        renderVideos(pendingData, loadingPending, errorPending)}

      {activeTab === "Declined" &&
        renderVideos(declinedData, loadingDeclined, errorDeclined)}
    </div>
  );
};

export default VideosPage;
