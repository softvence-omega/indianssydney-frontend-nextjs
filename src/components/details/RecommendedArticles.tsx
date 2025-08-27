import { newsItems } from "@/utils/demoData";
import React from "react";
import NewsCardSecondary from "../reusable/NewsCardSecondary";
import PrimaryHeading from "../reusable/PrimaryHeading";

const RecommendedArticles = () => {
  return (
    <div>
      <PrimaryHeading title="Recommended Articles" className="mb-6" />
      <div className="space-y-4">
        {newsItems.slice(0, 5).map((item) => (
          <NewsCardSecondary
            key={item.id}
            {...item}
            imageHeight="lg:h-[140px]"
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedArticles;
