"use client";

import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import { useRef } from "react";

const EngagementChart = () => {
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
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100],
          colors: ["#FBB03B", "#D96B3B"], // Gradient colors relevant to orange
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#D96B3B",
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
          rotate: -15,
          rotateAlways: true,
          style: {
            colors: "#D96B3B",
          },
        },
      },
      title: {
        text: "Engagement in Content Articles",
        align: "left",
        offsetX: 4,
        style: {
          color: "#D96B3B",
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

  return <div id="chart" ref={chartRef}></div>;
};

export default EngagementChart;
