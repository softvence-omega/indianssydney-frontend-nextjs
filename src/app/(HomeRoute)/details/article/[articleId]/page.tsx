"use client";

import { useRouter } from "next/navigation";
import ArticleDetails from "@/components/details/ArticleDetails";
import { demoContents } from "@/utils/demoContent";
import { DetailsData } from "@/app/(HomeRoute)/publish-content/page";

export default function ArticleDetailPage({
  params,
}: {
  params: { articleId: string };
}) {
  const router = useRouter();

  const article = demoContents.find(
    (item) => item.id === params.articleId && item.contentType === "article"
  ) as DetailsData | undefined;

  if (!article) {
    return <div>Article not found</div>;
  }

  return <ArticleDetails formData={article} onBack={() => router.back()} />;
}
