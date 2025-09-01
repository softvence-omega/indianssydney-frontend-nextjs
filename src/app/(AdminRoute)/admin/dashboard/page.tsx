"use client";

import Wrapper from "@/common/Wrapper";
import dynamic from "next/dynamic";
import AdminOverviewCard from "./AdminOverviewCard";
import RecentActivity from "./RecentActivity";

const AdminEngagementChart = dynamic(() => import("./AdminEngagementChart"), {
  ssr: false,
});

const Page = () => {
  return (
    <Wrapper>
      <div>
        <p className="mb-2">
          Welcome back! Here&apos;s an overview of your content.
        </p>
        <AdminOverviewCard />
        <div className="my-6 md:my-8 lg:my-10">
          <AdminEngagementChart />
        </div>
        <div className="my-6 md:my-8 lg:my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
