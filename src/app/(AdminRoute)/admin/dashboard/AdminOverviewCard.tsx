"use client";

import DashboardHeader from "@/components/reusable/DashboardHeader";

const AdminOverviewCard = () => {
  const statusData = [
    {
      title: "Total Posts",
      amount: "1938",
      percentage: "+12.1%",
      tag: "from last month",
    },
    {
      title: "Total Users",
      amount: "9938",
      percentage: "+12.1%",
      tag: "from last month",
    },
    {
      title: "Pending Articles",
      amount: "200",
      tag: "Needs review",
    },
    {
      title: "Page Views",
      amount: "1.4M",
      percentage: "2.1%",
      tag: "from last month",
    },
  ];

  return (
    <div>
      <DashboardHeader title="Overview" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {statusData.map((single) => (
          <div
            key={single.title}
            className="p-6 sm:p-7 bg-white rounded-xl shadow-md flex flex-col justify-between gap-3"
          >
            <p className="text-sm sm:text-base text-[#727C87] font-Roboto">
              {single.title}
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-brick-red font-Roboto tracking-[-0.68px] ">
              {single.amount}
            </h2>
            <div className="flex items-center gap-2">
              {single.percentage && (
                <p className="text-sm sm:text-base text-[#727C87] font-Roboto">
                  {single.percentage}
                </p>
              )}
              <p className="text-sm sm:text-base text-[#727C87] font-Roboto">
                {single.tag}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminOverviewCard;
