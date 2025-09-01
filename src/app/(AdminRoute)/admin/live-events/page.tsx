"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import LiveEventCard, { LiveEvent } from "./LiveEventCard";
type LiveEventStatus = "current" | "past" | "upcoming";
export const demoLiveEvents: LiveEvent[] = [
  {
    id: "1",
    title: "Next.js Best Practices",
    description: "Learn how to build scalable Next.js apps.",
    coverImage: "/images/nextjs.jpg",
    author: "John Doe",
    date: "2025-09-01",
    startTime: "09:00",
    endTime: "10:00",
    status: "current",
  },
  {
    id: "2",
    title: "React Performance Workshop",
    description: "Optimize your React apps for speed.",
    coverImage: "/images/react.jpg",
    author: "Jane Smith",
    date: "2025-09-03",
    startTime: "15:00",
    endTime: "16:30",
    status: "upcoming",
  },
  {
    id: "3",
    title: "AI in Web Development",
    description: "How AI is transforming frontend workflows.",
    coverImage: "/images/ai.jpg",
    author: "Alex Johnson",
    date: "2025-08-25",
    startTime: "11:00",
    endTime: "12:00",
    status: "past",
  },
];

const LiveEventsPage = () => {
  const [filter, setFilter] = useState<LiveEventStatus>("current");

  const filteredEvents = demoLiveEvents.filter(
    (event) => event.status === filter
  );

  return (
    <div>
      <DashboardHeader title="Live Events" />

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["current", "upcoming", "past"].map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer ${
              filter === tab
                ? "text-accent-orange font-semibold"
                : "text-gray-600"
            }`}
            onClick={() => setFilter(tab as LiveEventStatus)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Events */}
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <LiveEventCard key={event.id} live={event} />
        ))
      ) : (
        <p className="text-sm text-gray-500">No {filter} events available.</p>
      )}
    </div>
  );
};

export default LiveEventsPage;
