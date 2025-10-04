"use client";

import React from "react";
import dynamic from "next/dynamic";
import DashboardHeader from "@/components/reusable/DashboardHeader";
// import styles from '.';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DonutChart: React.FC = () => {
  const options: ApexCharts.ApexOptions = {
    series: [50, 30, 20],
    chart: {
      type: "donut",
      width: "100%",
    },
    labels: ["User", "Contributor", "Editor"],
    colors: ["#A43C2F", "#F9A03F", "#2B77A0"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      labels: {
        colors: "#374151", // Tailwind gray-700 for text color
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
      <Chart
        options={options}
        series={options.series}
        type="donut"
        width="100%"
      />
    </div>
  );
};

export default DonutChart;
