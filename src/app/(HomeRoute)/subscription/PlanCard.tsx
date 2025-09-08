import React from "react";
import { Check } from "lucide-react";

type PlanCardProps = {
  price: string;
  duration: string;
  description: string;
  features: string[];
  buttonText: string;
};

const PlanCard: React.FC<PlanCardProps> = ({
  price,
  duration,
  description,
  features,
  buttonText,
}) => {
  return (
    <div className="max-w-sm w-full border border-gray-200 bg-gray-50 rounded-md shadow-sm p-6">
      {/* Price */}
      <div className="flex items-baseline space-x-1">
        <span className="text-3xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-500">{duration}</span>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm mt-2">{description}</p>
      <hr className="my-4" />

      {/* Features */}
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2 text-gray-700">
            <Check className="w-4 h-4 text-green-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition-colors duration-300">
        {buttonText}
      </button>
    </div>
  );
};

export default PlanCard;
