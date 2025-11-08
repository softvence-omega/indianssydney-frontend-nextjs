"use client";

import { useRouter } from "next/navigation";
import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import VideoDetails from "@/components/details/VideoDetails";
import React from "react";
import { useGetArticleDetailsQuery } from "@/store/features/article/article.api";
import AustralianCanvasLoader from "@/components/reusable/AustralianCanvasLoader";

export default function VideoDetailPage({
  params,
}: {
  params: Promise<{ videoId: string }>; // params is a Promise now
}) {
  // unwrap params with React.use()
  const { videoId } = React.use(params);
  const router = useRouter();
  const {
    data: video,
    isLoading,
    isError,
  } = useGetArticleDetailsQuery(videoId);

  if (isLoading) {
    return (
      <CommonWrapper>
        <CommonPadding>
          <AustralianCanvasLoader />
          {/* <div className="h-[60vh] flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-lg text-gray-600">Loading video...</p>
          </div> */}
        </CommonPadding>
      </CommonWrapper>
    );
  }

  if (isError || !video?.data) {
    return (
      <CommonWrapper>
        <CommonPadding>
          <div className="h-[60vh] flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">
              The video you are looking for does not exist.
            </p>
            <PrimaryButton title="GO BACK" onClick={() => router.back()} />
          </div>
        </CommonPadding>
      </CommonWrapper>
    );
  }

  // Pass the found article to the ArticleDetails component
  return <VideoDetails formData={video?.data} onBack={() => router.back()} />;
}
