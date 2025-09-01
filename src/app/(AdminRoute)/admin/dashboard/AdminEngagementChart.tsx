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

const AdminEngagementChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const dataSet = [
      [120, 150, 180, 130, 170, 160, 200, 210, 130, 170, 160, 200], // PRODUCT A
    ];

    const options = {
      series: [
        {
          name: "PRODUCT A",
          data: dataSet[0],
        },
      ],
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
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
        colors: ["#D96B3B66", "#D96B3B0D"], // Gradient colors relevant to orange
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
          },
          offsetX: 0,
          formatter: function (val: number) {
            return val; // No need for transformation since it's already in the count of articles
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          rotate: -45,
          rotateAlways: true,
          style: {
            colors: "#000",
            fontSize: "14px",
          },
        },
      },
      tooltip: {
        shared: true,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        offsetX: -10,
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy(); // Cleanup when the component is unmounted
    };
  }, []);

  // Generate years dynamically
  const years = Array.from({ length: 11 }, (_, i) => 2023 + i);

  // Default year
  const [selectedYear, setSelectedYear] = useState("2025");

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

      <div id="chart" ref={chartRef}></div>
    </div>
  );
};

export default AdminEngagementChart;
