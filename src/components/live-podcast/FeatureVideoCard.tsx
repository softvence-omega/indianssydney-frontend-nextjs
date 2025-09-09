import React from "react";
import { Clock, Eye, Calendar } from "lucide-react";

const FeatureVideoCard = ({
  image = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=300&fit=crop",
  category = "General",
  timeAgo = "1 day ago",
  title = "Article Title",
  description = "Article description goes here",
  readTime = "5 min read",
  views = "1,234 views",
  onClick = () => {},
}) => {
  return (
    <div
      className="bg-transparent overflow-hidden cursor-pointer  duration-200 "
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative h-64 bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content Section with beige background */}
      <div className=" py-3">
        {/* Category Badge and Date Row */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`bg-accent-orange text-white px-3 py-1  text-sm font-medium`}
          >
            {category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {timeAgo}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-gray-900 mb-2 leading-tight font-playfair">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span className="font-medium">{readTime}</span>
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            <span className="font-medium">{views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureVideoCard;
