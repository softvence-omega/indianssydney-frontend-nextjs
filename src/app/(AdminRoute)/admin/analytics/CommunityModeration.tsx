interface MetricData {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  color?: string;
}

const CommunityModeration: React.FC = () => {
  const stats: MetricData[] = [
    {
      label: "Article Scanned",
      value: "1,452",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Flagged for Review",
      value: "38",
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      label: "Hate Speech Removed",
      value: "7",
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Community Moderation AI (Last 24h)
      </h3>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-lg p-3 flex items-center justify-between transition-all`}
          >
            <span className="text-sm font-medium">{stat.label}</span>
            <span className="text-lg font-bold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityModeration;
