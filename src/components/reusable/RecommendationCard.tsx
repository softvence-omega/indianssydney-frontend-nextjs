
import React from "react";

interface RecommendationCardProps {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  isSelected: boolean;
  onSelectionChange: (id: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  id,
  icon,
  title,
  subtitle,
  description,
  isSelected,
  onSelectionChange,
}) => {
  return (
    <div
      className={`p-5 border bg-[#EDEFF0] ${
        !isSelected ? "border-[#EDEFF0]" : "border-accent-orange"
      }`}
    >
      <div className="flex items-start justify-between">
        <img src={icon} alt="" />
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelectionChange(id)}
          className="h-5 w-5"
        />
      </div>
      <div className="mt-4">
        <p className="uppercase text-xs">{subtitle}</p>
        <h3 className="font-semibold text-ink-black font-playfair text-2xl my-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default RecommendationCard;
