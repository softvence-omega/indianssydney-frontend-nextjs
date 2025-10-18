import { useGetCommunityModerationQuery } from "@/store/features/admin/analytics.api";

interface MetricData {
  label: string;
  value: string | number;
  color?: string;
}

const CommunityModeration: React.FC = () => {
  const { data, isLoading, isError, error } = useGetCommunityModerationQuery(
    undefined,
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
    }
  );

  // Debugging: Log the full API response and statsData
  console.log("API Response:", { data, isLoading, isError, error });
  const statsData = data?.data?.data; // Access the nested data object
  console.log("Stats Data:", statsData);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-gray-500">
        Loading community moderation data...
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-red-500">
        Failed to load community moderation data.{" "}
        {error && <span>Error: {JSON.stringify(error)}</span>}
      </div>
    );
  }

  if (!statsData || typeof statsData !== "object") {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-red-500">
        Invalid data structure received from API. Received:{" "}
        {JSON.stringify(statsData)}
      </div>
    );
  }

  const stats: MetricData[] = [
    {
      label: "Article Scanned",
      value:
        statsData.articlesScanned !== undefined ? statsData.articlesScanned : 0,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Flagged for Review",
      value:
        statsData.flaggedForReview !== undefined
          ? statsData.flaggedForReview
          : 0,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      label: "Hate Speech Removed",
      value:
        statsData.hateSpeechRemoved !== undefined
          ? statsData.hateSpeechRemoved
          : 0,
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
