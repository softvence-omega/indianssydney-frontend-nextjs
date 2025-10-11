// "use client";

// import React, { useState } from "react";
// import PodcastCard, { Podcast } from "./PodcastCard";
// import DashboardHeader from "@/components/reusable/DashboardHeader";

// type PodcastStatus = "recent" | "pending" | "approved" | "declined";
// const initialPodcasts: Podcast[] = [
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

// const PodcastsPage = () => {
//   const [podcasts, setPodcasts] = useState<Podcast[]>(initialPodcasts);
//   const [filter, setFilter] = useState<
//   PodcastStatus
//   >("recent");

//   const handleStatusChange = (id: string, status: "approved" | "declined") => {
//     setPodcasts((prev) =>
//       prev.map((a) => (a.id === id ? { ...a, status: status } : a))
//     );
//   };

//   const filteredPodcasts = podcasts.filter((a) => a.status === filter);

//   return (
//     <div>
//       <DashboardHeader title="Podcasts" />
//       {/* Tabs */}
//       <div className="flex gap-4 mb-6">
//         {["recent", "pending", "approved", "declined"].map((tab) => (
//           <button
//             key={tab}
//             className={`cursor-pointer ${
//               filter === tab ? "text-accent-orange" : ""
//             }`}
//             onClick={() => setFilter(tab as PodcastStatus)}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Articles */}
//       {filteredPodcasts.map((podcast) => (
//         <PodcastCard
//           key={podcast.id}
//           podcast={podcast}
//           onStatusChange={handleStatusChange}
//         />
//       ))}
//     </div>
//   );
// };

// export default PodcastsPage;

"use client";

import React, { useEffect, useState } from "react";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import PodcastCard, { Podcast } from "./PodcastCard";
import {
  useGetPodcastsApprovedQuery,
  useGetPodcastsDeclinedQuery,
  useGetPodcastsPendingQuery,
} from "@/store/features/videoPodcast/podcast.api";

type PodcastStatus = "APPROVE" | "PENDING" | "Declined";

const PodcastsPage = () => {
  const [filter, setFilter] = useState<PodcastStatus>("APPROVE");
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  const { data: approvedData, isLoading: approvedLoading } =
    useGetPodcastsApprovedQuery({});
  const { data: pendingData, isLoading: pendingLoading } =
    useGetPodcastsPendingQuery({});
  const { data: declinedData, isLoading: declinedLoading } =
    useGetPodcastsDeclinedQuery({});

  useEffect(() => {
    let currentData: any[] = [];

    if (filter === "APPROVE") currentData = approvedData?.PODCAST || [];
    if (filter === "PENDING") currentData = pendingData?.PODCAST || [];
    if (filter === "Declined") currentData = declinedData?.PODCAST || [];

    const formatted: Podcast[] = currentData.map((item) => ({
      id: item.id,
      title: item.title,
      coverImage: item.image || "/placeholder.png",
      description:
        item.paragraph || item.subTitle || "No description available",
      author: item.user?.fullName || "Unknown",
      date: new Date(item.createdAt).toLocaleDateString(),
      status: item.status,
      negativity: {
        score: item.evaluationResult?.negativityScore || 0,
        positives: [],
        negatives: [],
      },
    }));

    setPodcasts(formatted);
  }, [filter, approvedData, pendingData, declinedData]);

  const handleStatusChange = (id: string, status: "approved" | "declined") => {
    // Handle status change logic here if needed
    console.log(`Podcast ${id} status changed to ${status}`);
  };

  const isLoading = approvedLoading || pendingLoading || declinedLoading;

  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-500">Loading podcasts...</div>
    );

  return (
    <div>
      <DashboardHeader title="Podcasts" />

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
            onClick={() => setFilter(tab as PodcastStatus)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Podcast Cards */}
      {podcasts.length === 0 ? (
        <div className="text-gray-500 text-center">No podcasts found.</div>
      ) : (
        podcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} onStatusChange={handleStatusChange} />
        ))
      )}
    </div>
  );
};

export default PodcastsPage;
