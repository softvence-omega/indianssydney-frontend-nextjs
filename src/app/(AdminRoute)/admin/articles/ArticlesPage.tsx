"use client";

import React, { useState } from "react";
import ArticleCard, { Article } from "./ArticleCard";
import DashboardHeader from "@/components/reusable/DashboardHeader";

type ArticleStatus = "recent" | "pending" | "approved" | "declined";

const initialArticles: Article[] = [
  {
    id: "1",
    title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    author: "John",
    date: "23 June 2025",
    status: "recent",
    negativity: {
      score: 95,
      positives: [],
      negatives: [
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
      ],
    },
  },
  {
    id: "2",
    title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    author: "John",
    date: "23 June 2025",
    status: "recent",
    negativity: {
      score: 95,
      positives: [],
      negatives: [
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
      ],
    },
  },
  {
    id: "3",
    title: "The Rise of Remote Work",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    author: "John",
    date: "23 June 2025",
    status: "pending",
    negativity: {
      score: 20,
      positives: [
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
      ],
      negatives: [],
    },
  },
  {
    id: "4",
    title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    author: "John",
    date: "23 June 2025",
    status: "approved",
    negativity: {
      score: 95,
      positives: [],
      negatives: [
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
      ],
    },
  },
  {
    id: "5",
    title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    author: "John",
    date: "23 June 2025",
    status: "declined",
    negativity: {
      score: 95,
      positives: [],
      negatives: [
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
        "Lorem ipsum is simply dummy text",
      ],
    },
  },
];

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [filter, setFilter] = useState<
    ArticleStatus
  >("recent");

  const handleStatusChange = (id: string, status: "approved" | "declined") => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: status } : a))
    );
  };

  const filteredArticles = articles.filter((a) => a.status === filter);

  return (
    <div>
      <DashboardHeader title="Videos" />
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["recent", "pending", "approved", "declined"].map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer ${
              filter === tab ? "text-accent-orange" : ""
            }`}
            onClick={() => setFilter(tab as ArticleStatus)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Articles */}
      {filteredArticles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default ArticlesPage;
