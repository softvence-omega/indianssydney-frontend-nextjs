// "use client";

// import { DetailsData } from "@/app/(HomeRoute)/publish-content/types";
// import VideoDetails from "@/components/details/VideoDetails";
// import { demoContents } from "@/utils/demoContent";
// import { useRouter } from "next/navigation";

// export default function VideoDetailPage({
//   params,
// }: {
//   params: { videoId: string };
// }) {
//   const router = useRouter();
//   const video = demoContents.find(
//     (item) => item.id === params.videoId && item.contentType === "video"
//   ) as DetailsData | undefined;

//   if (!video) return <div>Video not found</div>;

//   return <VideoDetails formData={video} onBack={() => router.back()} />;
// }

"use client";

import { useRouter } from "next/navigation";
import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { demoDetailsData } from "@/app/(HomeRoute)/publish-content/demoDetailsData"; // Import demo data
import VideoDetails from "@/components/details/VideoDetails";

export default function VideoDetailPage({
  params,
}: {
  params: { videoId: string };
}) {
  const router = useRouter();

  // Find the article by matching articleId with the data.id
  const video =
    demoDetailsData.data && demoDetailsData.data.id === params?.videoId
      ? demoDetailsData.data
      : undefined;

  // If no article found, display "Article Not Found" message
  if (!video) {
    return (
      <div>
        <CommonWrapper>
          <CommonPadding>
            <div className="h-[60vh] flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold mb-4">Video Not Found</h1>
              <p className="text-lg text-gray-600 mb-6">
                The video you are looking for does not exist.
              </p>
              <PrimaryButton title="GO BACK" onClick={() => router.back()} />
            </div>
          </CommonPadding>
        </CommonWrapper>
      </div>
    );
  }

  // Pass the found article to the ArticleDetails component
  return <VideoDetails formData={video} onBack={() => router.back()} />;
}
