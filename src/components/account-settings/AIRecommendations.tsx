import { useState } from "react";
import { recommendationsData } from "@/utils/recommendationData"; // Assuming this is where your data is stored
import RecommendationCard from "../reusable/RecommendationCard";
import { toast } from "sonner";
import PrimaryButton from "../reusable/PrimaryButton";

const AIRecommendations = () => {
  const [selectedRecommendations, setSelectedRecommendations] = useState<
    string[]
  >([]);

  const handleSelectionChange = (id: string) => {
    setSelectedRecommendations(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // Deselect if already selected
          : [...prev, id] // Select the recommendation
    );
  };

  const handleSave = () => {
    toast.success("Changes saved!");
    console.log("Selected Recommendations:", selectedRecommendations);
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Recommendation</h2>
      <p className="text-sm text-gray-600 mb-6">
        Select which areas of the news you'd like to explore. This will help
        refine your preferences.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendationsData.map((rec) => (
          <RecommendationCard
            key={rec.id}
            id={rec.id}
            icon={rec.icon}
            title={rec.title}
            subtitle={rec.subtitle}
            description={rec.description}
            isSelected={selectedRecommendations.includes(rec.id)}
            onSelectionChange={handleSelectionChange}
          />
        ))}
      </div>

      <PrimaryButton onClick={handleSave} title="Save Changes" className="mt-4 md:mt-6" />
    </div>
  );
};

export default AIRecommendations;
