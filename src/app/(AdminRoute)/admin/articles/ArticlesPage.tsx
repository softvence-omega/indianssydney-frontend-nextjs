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

  const renderArticles = (articles: any[], isLoading: boolean) => {
    if (isLoading) return <SkeletonLoader />;
    if (!articles?.length) return <p>No articles found.</p>;
    console.log(articles);

    return articles.map((article) => (
      <ArticleCard
        key={article.id}
        article={{
          id: article.id,
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
        }}
        onStatusChange={handleStatusChange}
      />
    ));
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
            {tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
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
