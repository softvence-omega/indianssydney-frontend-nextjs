"use client";

import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import ContentLoader from "@/common/ContentLoader";
import ArticleDetails from "@/components/details/ArticleDetails";
import AustralianCanvasLoader from "@/components/reusable/AustralianCanvasLoader";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { useGetArticleDetailsQuery } from "@/store/features/article/article.api";
import { useRouter } from "next/navigation";
import React from "react";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const router = useRouter();
  const { articleId } = React.use(params);
  const {
    data: article,
    isLoading,
    isError,
  } = useGetArticleDetailsQuery(articleId);

  if (isLoading) {
    return (
      <AustralianCanvasLoader />
      // <ContentLoader />
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

  return (
    <ArticleDetails formData={article?.data} onBack={() => router.back()} />
  );
}
