"use client";

import { DetailsData } from "@/app/(HomeRoute)/publish-content/page";
import VideoDetails from "@/components/details/VideoDetails";
import { demoContents } from "@/utils/demoContent";
import { useRouter } from "next/router";

export default function VideoDetailPage({
  params,
}: {
  params: { videoId: string };
}) {
  const router = useRouter();
  const video = demoContents.find(
    (item) => item.id === params.videoId && item.contentType === "video"
  ) as DetailsData | undefined;

  if (!video) return <div>Video not found</div>;

  return <VideoDetails formData={video} onBack={() => router.back()} />;
}
