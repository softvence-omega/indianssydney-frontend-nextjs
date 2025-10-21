import React from "react";
import FeatureVideoCard from "@/components/live-podcast/FeatureVideoCard";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { useGetAllVideosQuery } from "@/store/features/videoPodcast/video.api";

const WeeklyMagazine = () => {
  const { data, isLoading, isError } = useGetAllVideosQuery({});

  // if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading videos.</p>;

  const videos = data?.data || [];

  return (
    <div>
      <PrimaryHeading title="Featured Video Articles" className="mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((item: any) => (
          <FeatureVideoCard
            id={item.id}
            key={item.id}
            video={item.video}
            youtubeVideoUrl={item.youtubeVideoUrl}
            category={item.category?.name}
            title={item.title}
            description={item.subTitle || item.paragraph}
            createdAt={item.createdAt}
            contentviews={item.contentviews}
            onClick={() =>
              window.open(item.youtubeVideoUrl || item.video, "_blank")
            }
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklyMagazine;
