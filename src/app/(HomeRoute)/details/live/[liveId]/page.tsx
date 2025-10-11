"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import { useGetSingleLiveEventQuery } from "@/store/features/live-events/live.api";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, Youtube } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const LiveEventDetailsPage = ({
  params,
}: {
  params: Promise<{ liveId: string }>;
}) => {
  const router = useRouter();

  // ✅ unwrap params using React.use()
  const { liveId } = React.use(params);

  const {
    data: liveDetailsData,
    isLoading,
    isError,
  } = useGetSingleLiveEventQuery(liveId);

  // 🔹 Loading State
  if (isLoading) {
    return (
      <CommonWrapper>
        <CommonPadding>
          <div className="space-y-4">
            <Skeleton className="w-full h-[400px] rounded-xl" />
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-2/3 h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        </CommonPadding>
      </CommonWrapper>
    );
  }

  // 🔹 Error State
  if (isError || !liveDetailsData) {
    return (
      <CommonWrapper>
        <CommonPadding>
          <div className="text-center text-red-500 py-10">
            Failed to load live event details.
          </div>
        </CommonPadding>
      </CommonWrapper>
    );
  }

  // 🔹 Extract data safely
  const {
    title,
    subTitle,
    thumbnail,
    startTime,
    endTime,
    youtubeLiveUrl,
    tags,
    user,
  } = liveDetailsData;

  const formattedStart = new Date(startTime).toLocaleString();
  const formattedEnd = new Date(endTime).toLocaleString();

  return (
    <CommonWrapper>
      <CommonPadding>
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* 🎥 YouTube Embed */}
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src={youtubeLiveUrl.replace("watch?v=", "embed/")}
              title={title}
              allowFullScreen
            ></iframe>
          </div>

          {/* 🏷️ Title and Info */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600">{subTitle}</p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{user?.fullName || "Unknown Host"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formattedStart}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Ends: {formattedEnd}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {tags?.map((tag: string, idx: number) => (
                <Badge key={idx} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* 📖 Description */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-3">About this Live</h2>
            <p className="text-gray-700 leading-relaxed">
              {subTitle || "No description available for this live event."}
            </p>
          </div>

          {/* 🎬 Watch on YouTube Button */}
          {youtubeLiveUrl && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => window.open(youtubeLiveUrl, "_blank")}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
              >
                <Youtube className="w-4 h-4" />
                Watch on YouTube
              </Button>
            </div>
          )}
        </div>
      </CommonPadding>
    </CommonWrapper>
  );
};

export default LiveEventDetailsPage;
