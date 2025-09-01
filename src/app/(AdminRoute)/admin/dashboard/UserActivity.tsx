"use client";

import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import DashboardHeader from "@/components/reusable/DashboardHeader";

const UserActivity = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options: ApexCharts.ApexOptions = {
      series: [50, 30, 20], // Example values
      chart: {
        type: "donut",
      },
      labels: ["User", "Contributor", "Editor"],
      colors: ["#A43C2F", "#F9A03F", "#2B77A0"], // Blue, Amber, Green
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
              width: 220,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <DashboardHeader title="User Activity" />
      <div id="chart" ref={chartRef}></div>
    </div>
  );
};

export default UserActivity;
