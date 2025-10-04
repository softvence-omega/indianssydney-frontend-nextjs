import DashboardHeader from "@/components/reusable/DashboardHeader";

const EditorActivity = () => {
  const data = [
    {
      id: 1,
      name: "Marvin McKinney",
      profileImage: "/path-to-profile-image/marvin.jpg",
      approved: "1000",
      declined: "2000",
      totalReview: "4000",
    },
    {
      id: 2,
      name: "Kristin Watson",
      profileImage: "/path-to-profile-image/kristin.jpg",
      approved: "1200",
      declined: "800",
      totalReview: "3000",
    },
    {
      id: 3,
      name: "Cody Fisher",
      profileImage: "/path-to-profile-image/cody.jpg",
      approved: "2500",
      declined: "700",
      totalReview: "5000",
    },
    {
      id: 4,
      name: "Savannah Nguyen",
      profileImage: "/path-to-profile-image/savannah.jpg",
      approved: "1800",
      declined: "900",
      totalReview: "3500",
    },
    {
      id: 5,
      name: "Darrell Steward",
      profileImage: "/path-to-profile-image/darrell.jpg",
      approved: "2200",
      declined: "600",
      totalReview: "4000",
    },
        {
      id: 6,
      name: "Darrell Steward",
      profileImage: "/path-to-profile-image/darrell.jpg",
      approved: "2200",
      declined: "600",
      totalReview: "4000",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <DashboardHeader title="Editor Activity" />
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left min-w-[400px]">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="p-3 text-sm font-medium text-gray-600 min-w-[200px]">
                Profile
              </th>
              <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[100px]">
                Approved
              </th>
              <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[100px]">
                Declined
              </th>
              <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[100px]">
                Total Review
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((contributor) => (
              <tr
                key={contributor.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3 text-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={contributor.profileImage}
                      alt={contributor.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {contributor.name}
                    </span>
                  </div>
                </td>
                <td className="p-3 text-sm text-gray-600 text-center">
                  {contributor.approved}
                </td>
                <td className="p-3 text-sm text-gray-600 text-center">
                  {contributor.declined}
                </td>
                <td className="p-3 text-sm text-gray-600 text-center">
                  {contributor.totalReview}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditorActivity;
