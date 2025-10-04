import DashboardHeader from "@/components/reusable/DashboardHeader";

export const categories = [
  { name: "Technology", percentage: 52 },
  { name: "Education", percentage: 45 },
  { name: "Business", percentage: 20 },
  { name: "Health", percentage: 13 },
];

const TopCategories = () => {
  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow">
      <DashboardHeader title="Top Categories" />
      <div>
        {categories.map((item) => (
          <div
            key={item.name}
         className="flex justify-between py-2 border-b border-gray-200 text-sm md:text-base"
          >
            <span className=" font-medium">{item.name}</span>
            <span className="text-accent-orange font-medium">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
