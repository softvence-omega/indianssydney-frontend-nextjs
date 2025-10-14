
// "use client";

// import React, { useEffect, useState } from "react";
// import DashboardHeader from "@/components/reusable/DashboardHeader";
// import VideoCard, { Video } from "./VideoCard";
// import {
//   useGetVideosApprovedQuery,
//   useGetVideosDeclinedQuery,
//   useGetVideosPendingQuery,
// } from "@/store/features/videoPodcast/video.api";
// import ArticleCard from "../articles/ArticleCard";

// type VideoStatus = "APPROVE" | "PENDING" | "Declined";

// const VideosPage = () => {
//   const [filter, setFilter] = useState<VideoStatus>("APPROVE");
//   const [videos, setVideos] = useState<Video[]>([]);

//   // ✅ Fetch data for each status
//   const {
//     data: approvedData,
//     isLoading: approvedLoading,
//     isError: approvedError,
//   } = useGetVideosApprovedQuery({});

//   const {
//     data: pendingData,
//     isLoading: pendingLoading,
//     isError: pendingError,
//   } = useGetVideosPendingQuery({});

//   const {
//     data: declinedData,
//     isLoading: declinedLoading,
//     isError: declinedError,
//   } = useGetVideosDeclinedQuery({});

//   // ✅ Combine and format based on filter
//   useEffect(() => {
//     let currentData: any[] = [];

//     if (filter === "APPROVE") currentData = approvedData?.VIDEO || [];
//     if (filter === "PENDING") currentData = pendingData?.VIDEO || [];
//     if (filter === "Declined") currentData = declinedData?.VIDEO || [];

//     const formattedVideos: Video[] = currentData
//       .filter((item) => item.contentType === "VIDEO")
//       .map((item) => ({
//         id: item.id,
//         title: item.title,
//         coverImage: item.videoThumbnail || item.image || "/placeholder.png",
//         description:
//           item.subTitle || item.paragraph || "No description available",
//         author: item.user?.fullName || "Unknown",
//         date: new Date(item.createdAt).toLocaleDateString(),
//         status: item.status,
//         negativity: {
//           score: item.evaluationResult?.negativityScore || 0,
//           positives: [],
//           negatives: [],
//         },
//       }));

//     setVideos(formattedVideos);
//   }, [filter, approvedData, pendingData, declinedData]);

//   const handleStatusChange = (id: string, status: "approved" | "declined") => {
//     console.log(`Video ${id} status changed to ${status}`);
//   };

//   // ✅ Handle Loading & Error
//   const isLoading = approvedLoading || pendingLoading || declinedLoading;
//   const isError = approvedError || pendingError || declinedError;

//   if (isLoading)
//     return (
//       <div className="p-8 text-center text-gray-500">Loading videos...</div>
//     );
//   if (isError)
//     return (
//       <div className="p-8 text-center text-red-500">Failed to load videos.</div>
//     );

//   return (
//     <div>
//       <DashboardHeader title="Videos" />

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
//             onClick={() => setFilter(tab as VideoStatus)}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
//           </button>
//         ))}
//       </div>

//       {/* Video Cards */}
//       {videos.length === 0 ? (
//         <div className="text-gray-500 text-center">No videos found.</div>
//       ) : (
//         videos.map((video) => (
//           <ArticleCard
//            key={video.id}
//         article={{
//           id: video.id,
//           title: video.title,
//           description: video?.description,
//           author: video.author || "Unknown",
//           date: new Date(article.createdAt).toLocaleDateString(),
//           status: article.status,
//           negativity: {
//             score: 0,
//             positives: [],
//             negatives: [],
//           },
//           compareResult: parsedCompareResult, // 👈 add parsed result here
//         }}
//         onStatusChange={handleStatusChange}
//           />
//         ))
//       )}
//     </div>
//   );
// };

// export default VideosPage;


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

  // ✅ Fetch all video data by status
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

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["APPROVE", "PENDING", "Declined"].map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer ${
              activeTab === tab ? "text-accent-orange font-semibold" : "text-gray-500"
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
