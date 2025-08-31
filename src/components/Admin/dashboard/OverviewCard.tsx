"use client";


import DashboardHeader from "@/components/reusable/DashboardHeader";
import { Newspaper, ScanEye, SquareActivity, Users } from "lucide-react";

const OverviewCard = () => {

  const statusData = [
    {
      title: "Total Articles Published",
      amount: "19,938",
      icon: Newspaper,
    },
    {
      title: "Total Contributor",
      amount: "200",

      icon: Users,
    },
    {
      title: "Pending Review",
      amount: "102",

      icon: ScanEye,
    },
    {
      title: "Top Performing Topic",
      amount: "AI Revolution",
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
            className="p-6 sm:p-7 bg-white rounded-xl shadow-md flex flex-col justify-between items-center gap-3"
          >
            <div className="p-3 bg-bg-cream rounded-lg text-ink-black">
              <single.icon className="w-7 h-7" />
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-brick-red font-Roboto tracking-[-0.68px] ">
              {single.amount}
            </h2>

            <p className="text-sm sm:text-base text-[#484848] font-Roboto font-semibold">
              {single.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OverviewCard;
