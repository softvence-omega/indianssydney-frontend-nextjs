"use client";

import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { useRef } from "react";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetTrafficEngagementQuery } from "@/store/features/admin/admin.api";
import SkeletonLoader from "@/components/reusable/SkeletonLoader";

const AdminEngagementChart = () => {
  const { data, isLoading, isFetching } = useGetTrafficEngagementQuery({});
  const chartRef = useRef<HTMLDivElement>(null);

  // Generate years dynamically
  const years = Array.from({ length: 11 }, (_, i) => 2023 + i);
  const [selectedYear, setSelectedYear] = useState("2025");

  useEffect(() => {
    if (!data?.data?.monthly?.posts) return;

    // Extract months and values from API
    const postsData = data?.data?.monthly?.posts;
    console.log(postsData, "postsData");
    const categories = Object.keys(postsData); // ["September 2025", "October 2025", ...]
    const values = Object.values(postsData); // [11, 20, 15, ...]

    const options: ApexCharts.ApexOptions = {
      series: [
        {
          name: "Posts",
          data: values,
        },
      ],
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ["#D96B3B"], // Line color
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          shade: "dark",
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100],
        },
        colors: ["#D96B3B66", "#D96B3B0D"],
      },
      yaxis: {
        labels: {
          style: { fontSize: "14px" },
          formatter: (val: number) => val,
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      xaxis: {
        categories,
        labels: {
          rotate: -45,
          rotateAlways: true,
          style: {
            colors: "#000",
            fontSize: "14px",
          },
        },
      },
      tooltip: { shared: true },
      legend: {
        position: "top",
        horizontalAlign: "right",
        offsetX: -10,
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [data, selectedYear]);

  return (
    <div className="bg-white px-2 py-4 rounded-xl shadow">
      <div className="px-4 flex flex-col md:flex-row justify-between items-center md:gap-4 mb-4 md:mb-0">
        <DashboardHeader title="Content Engagement" />

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading || isFetching ? (
        <SkeletonLoader />
      ) : (
        <div id="chart" ref={chartRef}></div>
      )}
    </div>
  );
};

export default AdminEngagementChart;
