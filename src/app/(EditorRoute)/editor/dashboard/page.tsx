"use client";

import Wrapper from "@/common/Wrapper";
import dynamic from "next/dynamic";
import OverviewCard from "@/app/(EditorRoute)/editor/dashboard/OverviewCard";
import RecentActivity from "@/app/(EditorRoute)/editor/dashboard/RecentActivity";
import TopContents from "@/app/(EditorRoute)/editor/dashboard/TopContents";
import TopContributor from "@/app/(EditorRoute)/editor/dashboard/TopContributor";

const EngagementChart = dynamic(
  () => import("@/app/(EditorRoute)/editor/dashboard/EngagementChart"),
  { ssr: false }
);

const Page = () => {
  return (
    <Wrapper>
      <div>
        <p className="mb-2">
          Welcome back! Here&apos;s an overview of your content.
        </p>
        <OverviewCard />
        <div className="my-6 md:my-8 lg:my-10">
          <EngagementChart />
        </div>
        <div className="my-6 md:my-8 lg:my-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RecentActivity />
          <TopContents />
        </div>
        <div className="my-6 md:my-8 lg:my-10">
          <TopContributor />
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
