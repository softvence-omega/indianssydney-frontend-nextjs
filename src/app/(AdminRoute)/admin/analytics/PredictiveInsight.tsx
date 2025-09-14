import { MdLightbulbCircle } from "react-icons/md";

// AI Predictive Insight Component
const PredictiveInsight: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#D96B3B] to-[#B13C2D] rounded-lg p-4 text-white mb-6">
      <div className="flex items-center gap-3 mb-2">
    
          <MdLightbulbCircle className="h-8 w-8" />

        <h3 className="font-semibold text-xl">AI Predictive Insight</h3>
      </div>
      <p className="text-sm opacity-90">
        AI predicts that &quot;Community Interview&quot; articles published on
        **Sunday mornings** have the highest engagement. Consider scheduling
        your next one then.
      </p>
    </div>
  );
};

export default PredictiveInsight;
