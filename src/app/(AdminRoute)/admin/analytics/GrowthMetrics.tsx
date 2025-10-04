interface MetricData {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

const GrowthMetrics: React.FC = () => {
  const metrics: MetricData[] = [
    { label: 'Organic Traffic', value: '+15.3%', trend: 'up' },
    { label: 'Search Rankings', value: '+8.7%', trend: 'up' },
    { label: 'Page Load Speed', value: '2.1s avg', trend: 'neutral' }
  ];

  const getTrendColor = (trend?: string): string => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Growth Metrics</h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between py-1">
            <span className="text-sm text-gray-600">{metric.label}</span>
            <span className={`text-sm font-semibold ${getTrendColor(metric.trend)}`}>
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowthMetrics;