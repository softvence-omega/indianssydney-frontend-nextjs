const TopPerformingTags: React.FC = () => {
  const tags: string[] = [
    "#Climate Change",
    "#Sydney",
    "#Indigenous Art",
    "#Technology",
    "#Technology",
    "#Politics",
    "#Culture",
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Top Performing Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-orange-100 hover:text-orange-700 transition-colors cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopPerformingTags;
