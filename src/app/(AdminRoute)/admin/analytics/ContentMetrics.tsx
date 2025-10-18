"use client";

import { useContentmetricsQuery } from "@/store/features/admin/llm.api";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import ApexCharts (no SSR)
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-32 bg-gray-100 animate-pulse rounded" />
  ),
});

const ContentMetrics: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  // ✅ Fetch data from your RTK Query hook
  const { data, isLoading, isError } = useContentmetricsQuery(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Extract API values safely
  const averagePerformance = data?.data?.data?.averagePerformance ?? 0;

  const chartOptions = {
    chart: {
      type: "donut" as const,
      toolbar: { show: false },
    },
    colors: ["#f97316", "#fed7aa"],
    labels: ["Quality Content", "Other"],
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: { show: false },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: "bold",
              color: "#f97316",
              formatter: () => `${averagePerformance.toFixed(1)}%`,
            },
            total: {
              show: true,
              label: "Quality Score",
              fontSize: "12px",
              color: "#6b7280",
            },
          },
        },
      },
    },
  };

  const series = [averagePerformance, 100 - averagePerformance];

  if (!mounted || isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="w-32 h-32 mx-auto bg-gray-100 animate-pulse rounded-full"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-red-500">
        Failed to load metrics
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Content Metrics (AI)
      </h3>
      <div className="flex items-center justify-center mb-4">
        <div className="w-32 h-32">
          <Chart
            options={chartOptions}
            series={series}
            type="donut"
            height={128}
          />
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm text-gray-600">Content Quality Score</div>
        <div className="text-sm font-semibold text-orange-500 mt-1">
          {averagePerformance.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default ContentMetrics;
