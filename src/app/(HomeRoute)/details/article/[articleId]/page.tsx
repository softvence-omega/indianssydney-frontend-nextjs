"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import ArticleDetails from "@/components/details/ArticleDetails";
import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { useGetArticleDetailsQuery } from "@/store/features/article/article.api";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ articleId: string }>; // 🚀 params is a Promise now
}) {
  const router = useRouter();

  // ✅ unwrap params with React.use()
  const { articleId } = React.use(params);

  // ✅ Fetch article details from API
  const {
    data: article,
    isLoading,
    isError,
  } = useGetArticleDetailsQuery(articleId);

  if (isLoading) {
    return (
      <CommonWrapper>
        <CommonPadding>
          <div className="h-[60vh] flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-lg text-gray-600">Loading article...</p>
          </div>
        </CommonPadding>
      </CommonWrapper>
    );
  }

  if (isError || !article?.data) {
    return (
      <CommonWrapper>
        <CommonPadding>
          <div className="h-[60vh] flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">
              The article you are looking for does not exist.
            </p>
            <PrimaryButton title="GO BACK" onClick={() => router.back()} />
          </div>
        </CommonPadding>
      </CommonWrapper>
    );
  }

  console.log(article.data);

  return (
    <ArticleDetails formData={article?.data} onBack={() => router.back()} />
  );
}
