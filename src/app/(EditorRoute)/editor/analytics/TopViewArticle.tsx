import DashboardHeader from "@/components/reusable/DashboardHeader";
import React from "react";

const articles = [
  {
    id: 1,
    articleName: "The Rise of AI in Everyday Life",
    author: "Jane Doe",
    views: 1023,
  },
  {
    id: 2,
    articleName: "Mastering Next.js for Beginners",
    author: "John Smith",
    views: 876,
  },
  {
    id: 3,
    articleName: "Understanding the Stock Market Basics",
    author: "Alice Johnson",
    views: 540,
  },
  {
    id: 4,
    articleName: "10 Tips for a Healthy Lifestyle",
    author: "Bob Lee",
    views: 1270,
  },
  {
    id: 5,
    articleName: "How Tech is Changing Education",
    author: "Sarah Parker",
    views: 698,
  },
];

const TopViewArticle = () => {
  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow">
      <DashboardHeader title="Views per Article & Author" />
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left min-w-[400px]">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="p-3 text-sm font-medium text-gray-600 min-w-[200px]">
                Article
              </th>
              <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">
                Author
              </th>
              <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">
                Views
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((contributor) => (
              <tr
                key={contributor.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3 text-sm">{contributor.articleName}</td>
                <td className="p-3 text-sm text-gray-600 text-center">
                  {contributor.author}
                </td>
                <td className="p-3 text-sm text-gray-600 text-center">
                  {contributor.views}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopViewArticle;
