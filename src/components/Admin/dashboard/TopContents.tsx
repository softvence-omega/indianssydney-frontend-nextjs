

const TopContents = () => {


  // Sample dynamic data
  const data = [
    {
      id: 1,
      title: "10 Ways to Improve Your Workflow",
      views: 5432,
      reactions: 1201,
    },
    {
      id: 2,
      title: "The Power of Data-Driven Decisions",
      views: 5432,
      reactions: 1201,
    },
    {
      id: 3,
      title: "Beginner's Guide to Photography",
      views: 5432,
      reactions: 1201,
    },
    {
      id: 4,
      title: "The Power of Data-Driven Decisions",
      views: 5432,
      reactions: 1201,
    },
  ];



  return (
    <div className="bg-[#f9fbfd] p-4 lg:p-8 rounded-lg shadow-md">
      <h2 className="text-lg lg:text-xl font-medium mb-6">Top Performing Contents</h2>

      <div className="space-y-4">
        {data.map((content) => (
          <div
            key={content.id}
            className="p-4 bg-[#F4F5F4] rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-base font-medium text-gray-800">
              {content.title}
            </h3>
            <div className="flex justify-between mt-2">
              <p className="text-sm text-gray-600">Views: {content.views}</p>
              <p className="text-sm text-gray-600">
                Reactions: {content.reactions}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContents;
