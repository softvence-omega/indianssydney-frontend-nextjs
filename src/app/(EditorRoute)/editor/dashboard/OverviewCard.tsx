"use client";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import { useGetEditorDashboardOverviewQuery } from "@/store/features/editor/editor.api";
import { Newspaper, ScanEye, SquareActivity, Users } from "lucide-react";

const OverviewCard = () => {
  const { data, isLoading, isError } = useGetEditorDashboardOverviewQuery({});

  // Handle loading/error states
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 text-center shadow">
        <p className="text-gray-500">Loading overview...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="bg-white rounded-xl p-6 text-center shadow">
        <p className="text-red-500">Failed to load overview data.</p>
      </div>
    );
  }

  const { users, content } = data.data;

  const statusData = [
    {
      title: "Total Articles Published",
      amount: content?.published ?? 0,
      icon: Newspaper,
    },
    {
      title: "Total Contributors",
      amount: users?.contributors ?? 0,
      icon: Users,
    },
    {
      title: "Pending Review",
      amount: content?.pending ?? 0,
      icon: ScanEye,
    },
    {
      title: "Top Performing Topic",
      amount: "AI Revolution", // You can replace this with real data if available later
      icon: SquareActivity,
    },
  ];

  return (
    <div>
      <DashboardHeader title="Overview" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {statusData.map((single) => (
          <div
            key={single.title}
            className="p-6 sm:p-7 bg-white rounded-xl shadow-md flex flex-col justify-between items-center gap-3 transition-all hover:shadow-lg"
          >
            <div className="p-3 bg-bg-cream rounded-lg text-ink-black">
              <single.icon className="w-7 h-7" />
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-brick-red font-Roboto tracking-[-0.68px]">
              {single.amount}
            </h2>

            <p className="text-sm sm:text-base text-[#484848] font-Roboto font-semibold text-center">
              {single.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCard;
