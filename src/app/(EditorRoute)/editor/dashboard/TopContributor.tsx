import React from "react";

const TopContributor = () => {

  const data = [
    {
      id: 1,
      name: "Marvin McKinney",
      profileImage: "/path-to-profile-image/marvin.jpg",
      articlesPublished: 5000,
      userEngagement: "12k+",
    },
    {
      id: 2,
      name: "Arlene McCoy",
      profileImage: "/path-to-profile-image/arlene.jpg",
      articlesPublished: 4567,
      userEngagement: "8k+",
    },
    {
      id: 3,
      name: "Savannah Nguyen",
      profileImage: "/path-to-profile-image/savannah.jpg",
      articlesPublished: 4210,
      userEngagement: "11k+",
    },
    {
      id: 4,
      name: "John Smith",
      profileImage: "/path-to-profile-image/john.jpg",
      articlesPublished: 4069,
      userEngagement: "10k+",
    },
    {
      id: 5,
      name: "Jane Cooper",
      profileImage: "/path-to-profile-image/jane.jpg",
      articlesPublished: 4012,
      userEngagement: "12k+",
    },
    {
      id: 6,
      name: "Floyd Miles",
      profileImage: "/path-to-profile-image/floyd.jpg",
      articlesPublished: 3125,
      userEngagement: "12k+",
    },
    {
      id: 7,
      name: "Robert Fox",
      profileImage: "/path-to-profile-image/robert.jpg",
      articlesPublished: 3008,
      userEngagement: "12k+",
    },
  ];

  return (
    <div className="bg-[#f9fbfd] p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Top Contributor</h2>
        <div className="flex items-center">
          <label htmlFor="month" className="text-sm text-gray-600 mr-2">
            Select Month:
          </label>
          <select
            id="month"
            className="text-sm bg-white p-2 rounded-md"
            defaultValue="July"
          >
            <option>July</option>
            <option>August</option>
            <option>September</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left min-w-[400px]">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="p-3 text-sm font-medium text-gray-600 min-w-[200px]">Profile</th>
              <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">Article Published</th>
              <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">User Engagement</th>
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
                <td className="p-3 text-sm text-gray-600 text-center">{contributor.articlesPublished}</td>
                <td className="p-3 text-sm text-gray-600 text-center">{contributor.userEngagement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopContributor;