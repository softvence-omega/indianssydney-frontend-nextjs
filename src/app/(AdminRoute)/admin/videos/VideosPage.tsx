// "use client";

// import React, { useState } from "react";
// import VideoCard, { Video } from "./VideoCard";
// import DashboardHeader from "@/components/reusable/DashboardHeader";

// type VideoStatus = "recent" | "pending" | "approved" | "declined";

// const initialArticles: Video[] = [
//   {
//     id: "1",
//     title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
//     coverImage: "/register.png",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
//     author: "John",
//     date: "23 June 2025",
//     status: "recent",
//     negativity: {
//       score: 95,
//       positives: [],
//       negatives: [
//         "Lorem ipsum is simply dummy text",
//         "Lorem ipsum is simply dummy text",
//         "Lorem ipsum is simply dummy text",
//       ],
//     },
//   },
//   {
//     id: "2",
//     title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
//     coverImage: "/register.png",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
//     author: "John",
//     date: "23 June 2025",
//     status: "recent",
//     negativity: {
//       score: 95,
//       positives: [],
//       negatives: [
//         "Lorem ipsum is simply dummy text",
//         "Lorem ipsum is simply dummy text",
//         "Lorem ipsum is simply dummy text",
//       ],
//     },
//   },
//   {
//     id: "3",
//     title: "The Rise of Remote Work",
//     coverImage: "/register.png",
//     description:
//       "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
//     author: "John",
//     date: "23 June 2025",
//     status: "pending",
//     negativity: {
//       score: 20,
//       positives: [
//         "Lorem ipsum is simply dummy text",
//         "Lorem ipsum is simply dummy text",
//       ],
//       negatives: [],
//     },
//   },
//   {
//     id: "4",
//     title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
//     coverImage: "/register.png",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
//     author: "John",
//     date: "23 June 2025",
//     status: "approved",
//     negativity: {
//       score: 95,
//       positives: [],
//       negatives: [
//         "Lorem ipsum is simply dummy text",
//         "Lorem ipsum is simply dummy text",
//         "Lorem ipsum is simply dummy text",
//       ],
//     },
//   },
//   {
//     id: "5",
//     title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
//     coverImage: "/register.png",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
//     author: "John",
//     date: "23 June 2025",
//     status: "declined",
//     negativity: {
//       score: 95,
//       positives: [],
//       negatives: [
//         "Lorem ipsum is simply dummy text",
//         "Lorem ipsum is simply dummy text",
//         "Lorem ipsum is simply dummy text",
//       ],
//     },
//   },
// ];

// const VideosPage = () => {
//   const [videos, setVideos] = useState<Video[]>(initialArticles);
//   const [filter, setFilter] = useState<VideoStatus>("recent");

//   const handleStatusChange = (id: string, status: "approved" | "declined") => {
//     setVideos((prev) =>
//       prev.map((a) => (a.id === id ? { ...a, status: status } : a))
//     );
//   };

//   const filteredVideos = videos.filter((a) => a.status === filter);

//   return (
//     <div>
//       <DashboardHeader title="Videos" />
//       {/* Tabs */}
//       <div className="flex gap-4 mb-6">
//         {["recent", "pending", "approved", "declined"].map((tab) => (
//           <button
//             key={tab}
//             className={`cursor-pointer ${
//               filter === tab ? "text-accent-orange" : ""
//             }`}
//             onClick={() => setFilter(tab as VideoStatus)}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Articles */}
//       {filteredVideos.map((video) => (
//         <VideoCard
//           key={video.id}
//           video={video}
//           onStatusChange={handleStatusChange}
//         />
//       ))}
//     </div>
//   );
// };

// export default VideosPage;

"use client";

import React, { useEffect, useState } from "react";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import VideoCard, { Video } from "./VideoCard";
import {
  useGetVideosApprovedQuery,
  useGetVideosDeclinedQuery,
  useGetVideosPendingQuery,
} from "@/store/features/videoPodcast/video.api";

type VideoStatus = "APPROVE" | "PENDING" | "Declined";

const VideosPage = () => {
  const [filter, setFilter] = useState<VideoStatus>("APPROVE");
  const [videos, setVideos] = useState<Video[]>([]);

  // ✅ Fetch data for each status
  const {
    data: approvedData,
    isLoading: approvedLoading,
    isError: approvedError,
  } = useGetVideosApprovedQuery({});

  const {
    data: pendingData,
    isLoading: pendingLoading,
    isError: pendingError,
  } = useGetVideosPendingQuery({});

  const {
    data: declinedData,
    isLoading: declinedLoading,
    isError: declinedError,
  } = useGetVideosDeclinedQuery({});

  // ✅ Combine and format based on filter
  useEffect(() => {
    let currentData: any[] = [];

    if (filter === "APPROVE") currentData = approvedData?.VIDEO || [];
    if (filter === "PENDING") currentData = pendingData?.VIDEO || [];
    if (filter === "Declined") currentData = declinedData?.VIDEO || [];

    const formattedVideos: Video[] = currentData
      .filter((item) => item.contentType === "VIDEO")
      .map((item) => ({
        id: item.id,
        title: item.title,
        coverImage: item.videoThumbnail || item.image || "/placeholder.png",
        description:
          item.subTitle || item.paragraph || "No description available",
        author: item.user?.fullName || "Unknown",
        date: new Date(item.createdAt).toLocaleDateString(),
        status: item.status,
        negativity: {
          score: item.evaluationResult?.negativityScore || 0,
          positives: [],
          negatives: [],
        },
      }));

    setVideos(formattedVideos);
  }, [filter, approvedData, pendingData, declinedData]);

  const handleStatusChange = (id: string, status: "approved" | "declined") => {
    console.log(`Video ${id} status changed to ${status}`);
  };

  // ✅ Handle Loading & Error
  const isLoading = approvedLoading || pendingLoading || declinedLoading;
  const isError = approvedError || pendingError || declinedError;

  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-500">Loading videos...</div>
    );
  if (isError)
    return (
      <div className="p-8 text-center text-red-500">Failed to load videos.</div>
    );

  return (
    <div>
      <DashboardHeader title="Videos" />

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["APPROVE", "PENDING", "Declined"].map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer ${
              filter === tab
                ? "text-accent-orange font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setFilter(tab as VideoStatus)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Video Cards */}
      {videos.length === 0 ? (
        <div className="text-gray-500 text-center">No videos found.</div>
      ) : (
        videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onStatusChange={handleStatusChange}
          />
        ))
      )}
    </div>
  );
};

export default VideosPage;
