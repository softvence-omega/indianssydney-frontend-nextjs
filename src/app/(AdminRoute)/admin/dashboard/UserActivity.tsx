"use client";

import React from "react";
import dynamic from "next/dynamic";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import { useGetTotalUserActivityCountQuery } from "@/store/features/admin/admin.api";
import SkeletonLoader from "@/components/reusable/SkeletonLoader";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DonutChart: React.FC = () => {
  const {
    data: userActivityCount,
    isLoading: userActivityLoading,
    isFetching: userActivityFetching,
  } = useGetTotalUserActivityCountQuery({});

  // Extract series dynamically from API response
  const series = [
    userActivityCount?.data?.adminCount ?? 0,
    userActivityCount?.data?.superAdminCount ?? 0,
    userActivityCount?.data?.contributorCount ?? 0,
    userActivityCount?.data?.memberCount ?? 0,
    userActivityCount?.data?.visitorCount ?? 0,
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      width: "100%",
    },
    labels: ["Editor", "Admin", "Contributor", "Member", "User"],
    colors: ["#A43C2F", "#7C3AED", "#F9A03F", "#2B77A0", "#10B981"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      labels: {
        colors: "#374151", // Tailwind gray-700
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 240,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <DashboardHeader title="User Activity" />
      {userActivityLoading || userActivityFetching ? (
        <SkeletonLoader />
      ) : (
        <Chart options={options} series={series} type="donut" width="100%" />
      )}
    </div>
  );
};

export default DonutChart;
