
"use client";

import { useGetAllArticleQuery } from "@/store/features/article/article.api";
import React from "react";
import NewsCard3 from "@/components/reusable/NewsCard3";

const Test = () => {
  const { data, isLoading, isError } = useGetAllArticleQuery({});

  if (isLoading) return <div className="p-10 text-xl">Loading...</div>;
  if (isError) return <div className="p-10 text-xl text-red-500">Error loading articles</div>;

  const articles = data?.data || [];

  return (
    <div className="min-h-screen p-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article: any) => (
        <NewsCard3
          key={article.id}
          image={
            article.image ||
            "/fallback-image.png" // 👈 fallback if image is null
          }
          tag={article.tags?.[0]} // show first tag if available
          title={article.title}
          author={article.user?.fullName || "Unknown"}
          readTime={"5 min read"} // 👈 no readTime in API, so hardcoded
          description={article?.paragraph}
        />
      ))}
    </div>
  );
};

export default Test;
