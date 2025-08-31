import DashboardHeader from "@/components/reusable/DashboardHeader";
import React from "react";
import TopCategories from "./TopCategories";
import TopAudience from "./TopAudience";
import TopViewArticle from "./TopViewArticle";

const page = () => {
  return (
    <div>
      <DashboardHeader title="Analytics" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopCategories />
        <TopAudience />
      </div>
    <div className="mt-4">
        <TopViewArticle />
    </div>
    </div>
  );
};

export default page;
