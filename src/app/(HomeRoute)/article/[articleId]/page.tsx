"use client";

import ArticleDetails from "@/components/details/ArticleDetails";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Mock function to fetch article data (replace with your actual API call)
const fetchArticleData = async (articleId: string): Promise<FormData> => {
  // Simulate API call
  const mockArticles = {
    "1": {
      contentType: "article",
      category: "Business",
      subCategory: "Finance",
      title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
      subTitle: "German automaker faces challenges amid trade disputes",
      imageOrVideo: null,
      imageCaption: "A modern Volkswagen car design",
      shortQuote: "Trade tensions are reshaping the auto industry.",
      paragraph:
        "Volkswagen reported a sharp decline in third-quarter profits...",
      tags: ["Business", "Finance", "Automotive"],
      additionalFields: {
        additional_1756283976752: {
          type: "paragraph",
          value: "zxvxvsdvgdsgv",
        },
        additional_1756283985335: {
          type: "quote",
          value: "cbxcbb",
        },
        additional_1756283991656: {
          type: "image/video",
          value: "kjoksjof",
        },
      },
    },
    // Add more mock articles as needed
  };

  return new Promise((resolve) => {
    setTimeout(
      () => resolve(mockArticles[articleId] || mockArticles["1"]),
      500
    );
  });
};

export default function ArticleDetailPage({
  params,
}: {
  params: { articleId: string };
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchArticleData(params.articleId);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [params.articleId]);

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  const handlePublish = () => {
    // Handle publish logic (e.g., API call to publish)
    console.log("Article published:", formData);
  };

  if (loading) return <div>Loading...</div>;
  if (!formData) return <div>Article not found</div>;

  return (
    <ArticleDetails
      formData={formData}
      onBack={handleBack}
      onPublish={handlePublish}
    />
  );
}
