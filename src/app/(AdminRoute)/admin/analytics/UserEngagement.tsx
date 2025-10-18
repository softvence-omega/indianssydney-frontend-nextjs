"use client";

import { useEngagementPersonalizationQuery } from "@/store/features/admin/llm.api";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";



// Dynamically import ApexCharts with no SSR
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-32 bg-gray-100 animate-pulse rounded" />
  ),
});

const UserEngagement: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">(
    "week"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Fetch API data based on selected period
  const { data, isLoading, isError } = useEngagementPersonalizationQuery({
    period: timeRange,
  });

  // ✅ Extract data from response (fallback if API not yet loaded)
  const engagement = data?.data || {
    totalUsers: 0,
    totalBookmarks: 0,
    totalComments: 0,
    totalReactions: 0,
    averageGrowth: 0,
  };

  // --- Chart Configuration ---
  const chartOptions = {
    chart: {
      type: "area" as const,
      toolbar: { show: false },
      sparkline: { enabled: true },
      background: "transparent",
    },
    stroke: {
      curve: "smooth" as const,
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
      },
    },
    colors: ["#f97316"],
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
      theme: "light",
    },
  };

  // ✅ Show the average growth in chart (simple static visual)
  const series = [
    {
      name: "CTR",
      data: [
        engagement.averageGrowth / 2,
        engagement.averageGrowth / 1.8,
        engagement.averageGrowth / 1.4,
        engagement.averageGrowth / 1.2,
        engagement.averageGrowth,
      ],
    },
  ];

  if (!mounted || isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="h-32 bg-gray-100 animate-pulse rounded"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-red-500">
        Failed to load engagement data
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          User Engagement & Personalization AI
        </h3>
        <select
          className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={timeRange}
          onChange={(e) =>
            setTimeRange(e.target.value as "week" | "month" | "quarter")
          }
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
        </select>
      </div>

      <div className="h-32 mb-4">
        <Chart options={chartOptions} series={series} type="area" height={128} />
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Recommendation Engine CTR</span>
        <span className="font-semibold text-orange-500">
          {engagement.averageGrowth.toFixed(1)}%
        </span>
      </div>
      <div className="text-xs text-gray-500 mt-1">0.3% vs last week</div>
    </div>
  );
};

export default UserEngagement;
