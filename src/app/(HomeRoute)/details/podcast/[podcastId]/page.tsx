"use client";

import { DetailsData } from "@/app/(HomeRoute)/publish-content/page";
import PodcastDetails from "@/components/details/PodcastDetails";
import { demoContents } from "@/utils/demoContent";
import { useRouter } from "next/navigation";

export default function PodcastDetailsPage({
  params,
}: {
  params: { podcastId: string };
}) {
  const router = useRouter();
  const podcast = demoContents.find(
    (item) => item.id === params?.podcastId && item.contentType === "podcast"
  ) as DetailsData | undefined;

  if (!podcast) return <div>Video not found</div>;

  return <PodcastDetails formData={podcast} onBack={() => router.back()} />;
}
