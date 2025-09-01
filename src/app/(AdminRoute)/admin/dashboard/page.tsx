"use client";

import Wrapper from "@/common/Wrapper";
import AdminOverviewCard from "./AdminOverviewCard";
import RecentActivity from "./RecentActivity";
import UserActivity from "./UserActivity";
import EditorActivity from "./EditorActivity";
import dynamic from "next/dynamic";

// Dynamic import for browser-only components
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
        <div className="my-6 md:my-8 lg:my-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <UserActivity />
          </div>
          <div className="lg:col-span-2">
            <EditorActivity />
          </div>
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
