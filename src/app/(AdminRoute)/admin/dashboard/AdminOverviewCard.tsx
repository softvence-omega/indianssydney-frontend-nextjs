"use client";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import {
  useGetPageViewCountQuery,
  useGetTotalUserCountQuery,
} from "@/store/features/admin/admin.api";

const AdminOverviewCard = () => {
  // === User Count Query ===
  const {
    data: userCount,
    isLoading: userCountLoading,
    isFetching: userCountFetching,
  } = useGetTotalUserCountQuery({});

  // === Page View / Overview Query ===
  const {
    data: pageViewCount,
    isLoading: pageViewLoading,
    isFetching: pageViewFetching,
  } = useGetPageViewCountQuery({});

  // === Users ===
  const totalUsers = userCount?.data?.totalCurrentMonth ?? 0;
  const lastMonthUsers = userCount?.data?.totalLastMonth ?? 0;
  const userGrowth =
    lastMonthUsers !== 0
      ? (((totalUsers - lastMonthUsers) / lastMonthUsers) * 100).toFixed(1) +
        "%"
      : `${userCount?.data?.userGrowth ?? 0}%`;

  // === Page View / Articles Data ===
  const totalPosts = pageViewCount?.data?.totalArticles ?? 0;
  const pendingArticles =
    pageViewCount?.data?.totalArticleLastMonthPending ?? 0;
  const totalPageViews = pageViewCount?.data?.currentMonthCount ?? 0;
  const lastMonthViews = pageViewCount?.data?.lastMonthCount ?? 0;
  const contentGrowth = `${pageViewCount?.data?.contentGrowthPercentage ?? 0}%`;
  const pageGrowth =
    lastMonthViews !== 0
      ? (((totalPageViews - lastMonthViews) / lastMonthViews) * 100).toFixed(
          1
        ) + "%"
      : `${pageViewCount?.data?.pageGroth ?? 0}%`;

  // === Status Card Data ===
  const statusData = [
    {
      title: "Total Posts",
      amount: pageViewLoading ? "..." : String(totalPosts),
      percentage: contentGrowth,
      tag: "from last month",
    },
    {
      title: "Total Users",
      amount:
        userCountLoading || userCountFetching ? "..." : String(totalUsers),
      percentage: userGrowth,
      tag: "from last month",
    },
    {
      title: "Pending Articles",
      amount: pageViewLoading ? "..." : String(pendingArticles),
      tag: "Needs review",
    },
    {
      title: "Page Views",
      amount:
        pageViewLoading || pageViewFetching ? "..." : String(totalPageViews),
      percentage: pageGrowth,
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

            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-brick-red font-Roboto tracking-[-0.68px]">
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
