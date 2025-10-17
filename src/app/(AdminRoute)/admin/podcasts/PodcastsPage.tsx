

"use client";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import SkeletonLoader from "@/components/reusable/SkeletonLoader";
import { useUpdateArticleStatusMutation } from "@/store/features/article/article.api";
import {
  useGetPodcastsApprovedQuery,
  useGetPodcastsDeclinedQuery,
  useGetPodcastsPendingQuery,
} from "@/store/features/videoPodcast/podcast.api";
import { useState } from "react";
import ArticleCard from "../articles/ArticleCard";

type PodcastStatus = "APPROVE" | "PENDING" | "Declined";

const PodcastsPage = () => {
  const [activeTab, setActiveTab] = useState<PodcastStatus>("APPROVE");

  // ✅ Fetch podcast data by status
  const {
    data: approvedData,
    isLoading: loadingApproved,
    isError: errorApproved,
  } = useGetPodcastsApprovedQuery({});

  const {
    data: pendingData,
    isLoading: loadingPending,
    isError: errorPending,
  } = useGetPodcastsPendingQuery({});

  const {
    data: declinedData,
    isLoading: loadingDeclined,
    isError: errorDeclined,
  } = useGetPodcastsDeclinedQuery({});
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

  // ✅ Render podcasts similar to video rendering
  const renderPodcasts = (data: any, isLoading: boolean, isError: boolean) => {
    if (isLoading) return <SkeletonLoader />;
    if (isError)
      return <p className="text-red-500">Failed to load podcasts.</p>;

    const podcasts = data?.PODCAST?.filter(
      (item: any) => item.contentType === "PODCAST"
    );

    if (!podcasts?.length) return <p>No podcasts found.</p>;

    return podcasts.map((podcast: any) => {
      let parsedCompareResult = null;
      if (podcast.compareResult) {
        try {
          parsedCompareResult = JSON.parse(podcast.compareResult);
        } catch (error) {
          console.error("Error parsing compareResult:", error);
        }
      }

      return (
        <ArticleCard
          key={podcast.id}
          article={{
            id: podcast.id,
            contentType: podcast.contentType,
            title: podcast.title,
            description:
              podcast.subTitle ||
              podcast.paragraph ||
              "No description available",
            author: podcast.user?.fullName || "Unknown",
            date: new Date(podcast.createdAt).toLocaleDateString(),
            status: podcast.status,
            negativity: {
              score: podcast.evaluationResult?.negativityScore || 0,
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
      <DashboardHeader title="Podcasts" />

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["APPROVE", "PENDING", "Declined"].map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer ${activeTab === tab
                ? "text-accent-orange font-semibold"
                : "text-gray-500"
              }`}
            onClick={() => setActiveTab(tab as PodcastStatus)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Render Based on Active Tab */}
      {activeTab === "APPROVE" &&
        renderPodcasts(approvedData, loadingApproved, errorApproved)}

      {activeTab === "PENDING" &&
        renderPodcasts(pendingData, loadingPending, errorPending)}

      {activeTab === "Declined" &&
        renderPodcasts(declinedData, loadingDeclined, errorDeclined)}
    </div>
  );
};

export default PodcastsPage;
