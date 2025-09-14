"use client"

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';


// Dynamically import ApexCharts with no SSR
const Chart = dynamic(() => import('react-apexcharts'), { 
  ssr: false,
  loading: () => <div className="w-full h-32 bg-gray-100 animate-pulse rounded" />
});
const ContentMetrics: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              formatter: () => "90%",
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

  const series = [90, 10];

  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="w-32 h-32 mx-auto bg-gray-100 animate-pulse rounded-full"></div>
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
      </div>
    </div>
  );
};

export default ContentMetrics;
