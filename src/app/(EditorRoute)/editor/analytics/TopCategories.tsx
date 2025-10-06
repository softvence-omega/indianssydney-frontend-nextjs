"use client";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import { useGetTopCategoryQuery } from "@/store/features/admin/analytics.api";

interface Category {
  categoryId: string;
  categoryName: string;
  contentCount: number;
  percentage: string;
}

const TopCategories = () => {
  const { data, isLoading, isError } = useGetTopCategoryQuery({});

  console.log("Top categories data:", data);

  if (isLoading)
    return (
      <div className="bg-white rounded-lg p-4 lg:p-6 shadow text-gray-500">
        Loading top categories...
      </div>
    );

  if (isError || !data)
    return (
      <div className="bg-white rounded-lg p-4 lg:p-6 shadow text-red-500">
        Failed to load categories.
      </div>
    );

  const categories: Category[] = data || [];

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow">
      <DashboardHeader title="Top Categories" />
      <div>
        {categories.length === 0 ? (
          <p className="text-sm text-gray-500">No categories available.</p>
        ) : (
          categories.map((item: Category) => (
            <div
              key={item.categoryId}
              className="flex justify-between py-2 border-b border-gray-200 text-sm md:text-base"
            >
              <span className="font-medium text-gray-800">
                {item.categoryName}
              </span>
              <span className="text-accent-orange font-medium">
                {item.percentage}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopCategories;
