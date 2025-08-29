import Wrapper from "@/common/Wrapper";
import EngagementChart from "@/components/Admin/dashboard/EngagementChart";
import OverviewCard from "@/components/Admin/dashboard/OverviewCard";
import React from "react";

const page = () => {
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
      </div>
    </Wrapper>
  );
};

export default page;
