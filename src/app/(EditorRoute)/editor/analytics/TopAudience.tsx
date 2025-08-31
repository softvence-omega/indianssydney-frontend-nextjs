import DashboardHeader from "@/components/reusable/DashboardHeader";
import React from "react";
export const categories = [
  { name: "English (US)", percentage: 42 },
  { name: "Spanish (Mexican)", percentage: 35 },
  { name: "French (Canada)", percentage: 20 },
  { name: "German (Germany)", percentage: 3 },
];
const TopAudience = () => {
  return (
      <div className="bg-white rounded-lg p-4 lg:p-6 shadow">
      <DashboardHeader title="Audience by Language" />
      <div>
        {categories.map((item) => (
          <div
            key={item.name}
            className="flex justify-between py-2 border-b border-gray-200  text-sm md:text-base"
          >
            <span className=" font-medium">{item.name}</span>
            <span className="text-accent-orange font-medium">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAudience;
