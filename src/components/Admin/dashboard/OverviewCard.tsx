"use client";

// import { useGetPaymentsQuery } from "@/redux/features/auth/paymentApi";
// import { useGetPlansQuery } from "@/redux/features/auth/planApi";
// import { useGetUsersQuery } from "@/redux/features/auth/userApi";

import { Newspaper, ScanEye, SquareActivity, Users } from "lucide-react";

const OverviewCard = () => {
  //   const { data: users } = useGetUsersQuery(undefined);
  //   const { data: plans } = useGetPlansQuery(undefined);
  //   const { data: payments } = useGetPaymentsQuery();

  //   const userCount = users?.length ?? 0;
  //   const planCount = plans?.length ?? 0;
  //   const paymentCount = payments?.length ?? 0;

  // Filter data created in last 30 days
  //   const getLast30DaysData = <T extends { createdAt?: string }>(
  //     data: T[] | undefined
  //   ) => {
  //     if (!data) return [];
  //     const now = new Date();
  //     const thirtyDaysAgo = new Date();
  //     thirtyDaysAgo.setDate(now.getDate() - 30);
  //     return data.filter((item) => {
  //       const createdDate = item.createdAt ? new Date(item.createdAt) : null;
  //       return createdDate && createdDate >= thirtyDaysAgo && createdDate <= now;
  //     });
  //   };

  //   const paymentsLast30 = getLast30DaysData(payments);
  //   const usersLast30 = getLast30DaysData(users);
  //   const plansLast30 = getLast30DaysData(plans);

  //   const totalRevenueAll =
  //     payments?.reduce((sum, p) => sum + (p.amount ?? 0), 0) ?? 0;
  //   const totalRevenue30 =
  //     paymentsLast30?.reduce((sum, p) => sum + (p.amount ?? 0), 0) ?? 0;

  // Percentage change between current period and previous period
  // Here current = last 30 days, total = all time, so previous = total - current
  // Return a formatted string with "increase" or "decrease"
  //   const getChange = (current: number, total: number): string => {
  //     if (total === 0) return "No data";
  //     const previous = total - current;

  //     // Avoid division by zero or nonsensical values
  //     if (previous === 0) return current > 0 ? "100% increase" : "No change";

  //     const diffPercent = ((current - previous) / previous) * 100;
  //     const isIncrease = diffPercent > 0;
  //     const formattedPercent = Math.abs(diffPercent).toFixed(1);

  //     return isIncrease
  //       ? `+${formattedPercent}% increase`
  //       : `-${formattedPercent}% decrease`;
  //   };

  // Average revenue per user all time and recent users
  //   const avgRevenueAll = userCount ? totalRevenueAll / userCount : 0;
  //   const avgRevenueRecent = usersLast30.length
  //     ? totalRevenue30 / usersLast30.length
  //     : 0;

  //   const statusData = [
  //     {
  //       title: "Total Revenue",
  //       amount: `$${totalRevenueAll.toFixed(2)} USD`,
  //       change: getChange(totalRevenue30, totalRevenueAll),
  //       unit: `(${paymentCount} transactions total)`,
  //     },
  //     {
  //       title: "Registered Users",
  //       amount: `${userCount} total`,
  //       change: getChange(usersLast30.length, userCount),
  //       unit: `${usersLast30.length} new this month`,
  //     },
  //     {
  //       title: "Active Courses",
  //       amount: `${planCount} courses`,
  //       change: getChange(plansLast30.length, planCount),
  //       unit: `${plansLast30.length} added recently`,
  //     },
  //     {
  //       title: "Avg. Revenue",
  //       amount: `$${avgRevenueAll.toFixed(2)}`,
  //       change: getChange(avgRevenueRecent, avgRevenueAll),
  //       unit: "based on recent activity",
  //     },
  //   ];

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
      <h2 className="text-lg font-medium mb-4">Overview</h2>
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
