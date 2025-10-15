"use client";

import React from "react";
import { Play, Calendar, User } from "lucide-react";
import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
import { useGetAllLiveEventQuery } from "@/store/features/live-events/live.api";
import { useRouter } from "next/navigation";
import PrimaryHeading from "../reusable/PrimaryHeading";

const LiveEventsPage = () => {
  const router = useRouter();
  const {
    data: liveEventData,
    isLoading,
    isError,
  } = useGetAllLiveEventQuery({});

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        Loading live events...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-60 text-red-500">
        Failed to load live events
      </div>
    );

  // Utility function for extracting YouTube thumbnail
  const getYouTubeThumbnail = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : null;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleViewDetails = (id: string) => {
    router.push(`/details/live/${id}`);
  };

  return (
    <CommonWrapper>
      <CommonPadding>
        <div>
          <PrimaryHeading title="Live Events" className="mb-4" />

          {(!liveEventData || liveEventData.length === 0) && (
            <div className="text-gray-500 text-center py-10">
              No live events available.
            </div>
          )}

          {/* 🔥 Live Event Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveEventData?.map((event: any) => {
              const thumbnail =
                getYouTubeThumbnail(event.youtubeLiveUrl) || event.thumbnail;

              return (
                <div
                  onClick={() => handleViewDetails(event.id)}
                  key={event.id}
                  className="group bg-white overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  {/* 🖼 Thumbnail */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={thumbnail}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay + Play */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
                      <div className="bg-white/80 p-3 rounded-full shadow-lg group-hover:scale-110 transition">
                        <Play
                          className="w-6 h-6 text-black"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 📝 Details */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                      {event.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {event.subTitle}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-col gap-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDateTime(event.startTime)} →{" "}
                          {formatDateTime(event.endTime)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{event.user?.fullName || "Unknown Host"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CommonPadding>
    </CommonWrapper>
  );
};

export default LiveEventsPage;
