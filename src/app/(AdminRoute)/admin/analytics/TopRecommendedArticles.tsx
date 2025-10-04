"use client";

interface ArticleData {
  title: string;
  clicks: string;
}

const TopRecommendedArticles: React.FC = () => {
  const articles: ArticleData[] = [
    { title: "A Chef's Journey to Melbourne", clicks: "3,204 clicks" },
    { title: "Unsung Heroes of Perth", clicks: "3,204 clicks" },
    { title: "The Evolution of Digital Puja", clicks: "3,204 clicks" },
    { title: "Unsung Heroes of Perth", clicks: "3,204 clicks" },
    { title: "Unsung Heroes of Perth", clicks: "3,204 clicks" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Top AI-Recommended Articles
      </h3>
      <div className="space-y-3">
        {articles.map((article, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-medium">
                {index + 1}.
              </span>
              <span className="text-sm text-gray-700 truncate max-w-48">
                {article.title}
              </span>
            </div>
            <span className="text-sm font-semibold text-blue-600 whitespace-nowrap">
              {article.clicks}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRecommendedArticles;
