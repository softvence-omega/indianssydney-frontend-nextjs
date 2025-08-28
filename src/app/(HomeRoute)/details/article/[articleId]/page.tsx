"use client";

import ArticleDetails from "@/components/details/ArticleDetails";
import { demoContents } from "@/utils/demoContent";

export default function ArticleDetailPage({ params }: { params: { articleId: string } }) {
  const article = demoContents.find(
    (item) => item.id === params.articleId && item.contentType === "article"
  );

  if (!article) return <div>Article not found</div>;

  return (
    <ArticleDetails
      formData={article}
      onBack={() => history.back()}
      onPublish={() => console.log("Publish", article)}
    />
  );
}
