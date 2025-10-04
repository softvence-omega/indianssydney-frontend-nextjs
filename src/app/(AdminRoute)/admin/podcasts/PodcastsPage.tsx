"use client";

import React, { useState } from "react";
import PodcastCard, { Podcast } from "./PodcastCard";
import DashboardHeader from "@/components/reusable/DashboardHeader";


type PodcastStatus = "recent" | "pending" | "approved" | "declined";
const initialPodcasts: Podcast[] = [
  {
    id: "1",
    title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
    coverImage: "/register.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    author: "John",
    date: "23 June 2025",
    status: "recent",
    negativity: {
      score: 95,
      positives: [],
      negatives: [
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
      ],
    },
  },
  {
    id: "2",
    title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
    coverImage: "/register.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    author: "John",
    date: "23 June 2025",
    status: "recent",
    negativity: {
      score: 95,
      positives: [],
      negatives: [
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
      ],
    },
  },
  {
    id: "3",
    title: "The Rise of Remote Work",
    coverImage: "/register.png",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    author: "John",
    date: "23 June 2025",
    status: "pending",
    negativity: {
      score: 20,
      positives: [
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
      ],
      negatives: [],
    },
  },
  {
    id: "4",
    title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
    coverImage: "/register.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    author: "John",
    date: "23 June 2025",
    status: "approved",
    negativity: {
      score: 95,
      positives: [],
      negatives: [
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
      ],
    },
  },
  {
    id: "5",
    title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
    coverImage: "/register.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    author: "John",
    date: "23 June 2025",
    status: "declined",
    negativity: {
      score: 95,
      positives: [],
      negatives: [
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
      ],
    },
  },
];

const PodcastsPage = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>(initialPodcasts);
  const [filter, setFilter] = useState<
  PodcastStatus
  >("recent");

  const handleStatusChange = (id: string, status: "approved" | "declined") => {
    setPodcasts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: status } : a))
    );
  };

  const filteredPodcasts = podcasts.filter((a) => a.status === filter);

  return (
    <div>
      <DashboardHeader title="Podcasts" />
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["recent", "pending", "approved", "declined"].map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer ${
              filter === tab ? "text-accent-orange" : ""
            }`}
            onClick={() => setFilter(tab as PodcastStatus)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Articles */}
      {filteredPodcasts.map((podcast) => (
        <PodcastCard
          key={podcast.id}
          podcast={podcast}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default PodcastsPage;
