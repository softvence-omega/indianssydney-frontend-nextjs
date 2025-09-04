

"use client";

import { useRouter } from "next/navigation";
import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { demoDetailsData } from "@/app/(HomeRoute)/publish-content/demoDetailsData"; // Import demo data
import PodcastDetails from "@/components/details/PodcastDetails";

export default function VideoDetailPage({
  params,
}: {
  params: { podcastId: string };
}) {
  const router = useRouter();

  // Find the article by matching articleId with the data.id
  const podcast =
    demoDetailsData.data && demoDetailsData.data.id === params?.podcastId
      ? demoDetailsData.data
      : undefined;

  // If no article found, display "Article Not Found" message
  if (!podcast) {
    return (
      <div>
        <CommonWrapper>
          <CommonPadding>
            <div className="h-[60vh] flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold mb-4">Podcast Not Found</h1>
              <p className="text-lg text-gray-600 mb-6">
                The Podcast you are looking for does not exist.
              </p>
              <PrimaryButton title="GO BACK" onClick={() => router.back()} />
            </div>
          </CommonPadding>
        </CommonWrapper>
      </div>
    );
  }

  // Pass the found article to the ArticleDetails component
  return <PodcastDetails formData={podcast} onBack={() => router.back()} />;
}
