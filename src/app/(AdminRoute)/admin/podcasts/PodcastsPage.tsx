// "use client";

// import React, { useEffect, useState } from "react";
// import DashboardHeader from "@/components/reusable/DashboardHeader";
// import PodcastCard, { Podcast } from "./PodcastCard";
// import {
//   useGetPodcastsApprovedQuery,
//   useGetPodcastsDeclinedQuery,
//   useGetPodcastsPendingQuery,
// } from "@/store/features/videoPodcast/podcast.api";

// type PodcastStatus = "APPROVE" | "PENDING" | "Declined";

// const PodcastsPage = () => {
//   const [filter, setFilter] = useState<PodcastStatus>("APPROVE");
//   const [podcasts, setPodcasts] = useState<Podcast[]>([]);

//   const { data: approvedData, isLoading: approvedLoading } =
//     useGetPodcastsApprovedQuery({});
//   const { data: pendingData, isLoading: pendingLoading } =
//     useGetPodcastsPendingQuery({});
//   const { data: declinedData, isLoading: declinedLoading } =
//     useGetPodcastsDeclinedQuery({});

//   useEffect(() => {
//     let currentData: any[] = [];

//     if (filter === "APPROVE") currentData = approvedData?.PODCAST || [];
//     if (filter === "PENDING") currentData = pendingData?.PODCAST || [];
//     if (filter === "Declined") currentData = declinedData?.PODCAST || [];

//     const formatted: Podcast[] = currentData.map((item) => ({
//       id: item.id,
//       title: item.title,
//       coverImage: item.image || "/placeholder.png",
//       description:
//         item.paragraph || item.subTitle || "No description available",
//       author: item.user?.fullName || "Unknown",
//       date: new Date(item.createdAt).toLocaleDateString(),
//       status: item.status,
//       negativity: {
//         score: item.evaluationResult?.negativityScore || 0,
//         positives: [],
//         negatives: [],
//       },
//     }));

//     setPodcasts(formatted);
//   }, [filter, approvedData, pendingData, declinedData]);

//   const handleStatusChange = (id: string, status: "approved" | "declined") => {
//     // Handle status change logic here if needed
//     console.log(`Podcast ${id} status changed to ${status}`);
//   };

//   const isLoading = approvedLoading || pendingLoading || declinedLoading;

//   if (isLoading)
//     return (
//       <div className="p-8 text-center text-gray-500">Loading podcasts...</div>
//     );

//   return (
//     <div>
//       <DashboardHeader title="Podcasts" />

//       {/* Tabs */}
//       <div className="flex gap-4 mb-6">
//         {["APPROVE", "PENDING", "Declined"].map((tab) => (
//           <button
//             key={tab}
//             className={`cursor-pointer ${
//               filter === tab
//                 ? "text-accent-orange font-semibold"
//                 : "text-gray-500"
//             }`}
//             onClick={() => setFilter(tab as PodcastStatus)}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
//           </button>
//         ))}
//       </div>

//       {/* Podcast Cards */}
//       {podcasts.length === 0 ? (
//         <div className="text-gray-500 text-center">No podcasts found.</div>
//       ) : (
//         podcasts.map((podcast) => (
//           <PodcastCard key={podcast.id} podcast={podcast} onStatusChange={handleStatusChange} />
//         ))
//       )}
//     </div>
//   );
// };

// export default PodcastsPage;

"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import SkeletonLoader from "@/components/reusable/SkeletonLoader";
import PodcastCard from "./PodcastCard";
import {
  useGetPodcastsApprovedQuery,
  useGetPodcastsPendingQuery,
  useGetPodcastsDeclinedQuery,
} from "@/store/features/videoPodcast/podcast.api";
import ArticleCard from "../articles/ArticleCard";
import { useUpdateArticleStatusMutation } from "@/store/features/article/article.api";

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
            className={`cursor-pointer ${
              activeTab === tab
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
