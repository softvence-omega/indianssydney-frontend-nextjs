"use client";

import React, { useState } from "react";
import ArticleCard from "./ArticleCard";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import {
  useGetRecentArticleQuery,
  useGetPendingArticleQuery,
  useGetApprovedArticleQuery,
  useGetDeclinedArticleQuery,
  useUpdateArticleStatusMutation,
} from "@/store/features/article/article.api";
import SkeletonLoader from "@/components/reusable/SkeletonLoader";

type ArticleStatus = "recent" | "PENDING" | "APPROVE" | "DECLINE";

const ArticlesPage = () => {
  const [activeTab, setActiveTab] = useState<ArticleStatus>("recent");

  const { data: recentArticles = [], isLoading: loadingRecent } =
    useGetRecentArticleQuery(undefined);

  const { data: pendingArticles = [], isLoading: loadingPending } =
    useGetPendingArticleQuery(undefined);

  const { data: approvedArticles = [], isLoading: loadingApproved } =
    useGetApprovedArticleQuery(undefined);

  const { data: declinedArticles = [], isLoading: loadingDeclined } =
    useGetDeclinedArticleQuery(undefined);

  const [updateStatus] = useUpdateArticleStatusMutation();

  const handleStatusChange = async (
    id: string,
    status: "APPROVE" | "Declined"
  ) => {
    try {
      await updateStatus({ id, status });
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const parseCompareResult = (compareResult: any) => {
    try {
      if (typeof compareResult === "string") {
        const parsed = JSON.parse(compareResult);
        // Extract nested compareResult if present, otherwise use parsed object
        return parsed.compareResult || parsed;
      }
      // If already an object, return it (handle nested compareResult if needed)
      return compareResult?.compareResult || compareResult || null;
    } catch (error) {
      console.error("Error parsing compareResult:", error);
      return null;
    }
  };

  const renderArticles = (articles: any[], isLoading: boolean) => {
    if (isLoading) return <SkeletonLoader />;
    if (!articles?.length) return <p>No articles found.</p>;

    return articles.map((article) => {
      const parsedCompareResult = parseCompareResult(article.compareResult);

      return (
        <ArticleCard
          key={article.id}
          article={{
            id: article.id,
            contentType: article.contentType,
            title: article.title,
            description: article.paragraph,
            author: article.user?.fullName || "Unknown",
            date: new Date(article.createdAt).toLocaleDateString(),
            status: article.status,
            negativity: {
              score: 0,
              positives: [],
              negatives: [],
            },
            compareResult: parsedCompareResult, // Pass normalized result
          }}
          onStatusChange={handleStatusChange}
        />
      );
    });
  };

  return (
    <div>
      <DashboardHeader title="Articles" />

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["recent", "PENDING", "APPROVE", "DECLINE"].map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer ${
              activeTab === tab ? "text-accent-orange" : ""
            }`}
            onClick={() => setActiveTab(tab as ArticleStatus)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)?.toLowerCase()}
          </button>
        ))}
      </div>

      {/* Render each tab's data */}
      {activeTab === "recent" && renderArticles(recentArticles, loadingRecent)}

      {activeTab === "PENDING" &&
        renderArticles(pendingArticles, loadingPending)}

      {activeTab === "APPROVE" &&
        renderArticles(approvedArticles, loadingApproved)}

      {activeTab === "DECLINE" &&
        renderArticles(declinedArticles, loadingDeclined)}
    </div>
  );
};

export default ArticlesPage;
