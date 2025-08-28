import React from "react";

// Updated props to match Article interface
type NewsCardProps = {
  id: string;
  title: string;
  description?: string;
  content?: string;
  image: string;
  category?: string;
  subcategory?: string;
  readTime?: string;
  author?: string;
  publishedAt?: string;
  views?: number;
  likes?: number;
  comments?: number;
  tag?: string;
  featured?: boolean;
  layout?: "left" | "right"; // layout prop for component flexibility
  imageHeight?: string; // custom image height
};

const NewsCardSecondary: React.FC<NewsCardProps> = ({
  image,
  tag,
  title,
  description,
  author = "Unknown",
  readTime = "0 min read",
  layout = "left", // default to left
  imageHeight = "lg:h-[190px]", // default large screen height
  category,
  publishedAt,
}) => {
  return (
    <div
      className={`grid md:grid-cols-2 gap-6 ${
        layout === "right" ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Image Section */}
      <div className={`w-full h-[140px] ${imageHeight} overflow-hidden`}>
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col">
        {(tag || category) && (
          <span className="text-xs font-bold uppercase text-accent-orange border border-accent-orange px-2 py-1 w-fit mb-3">
            {tag || category}
          </span>
        )}
        <h2 className="text-lg font-semibold mb-2 font-playfair text-blk-1 line-clamp-2">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {description}
          </p>
        )}

        <div className="text-xs lg:text-sm text-accent-orange font-medium">
          <span>by {author}</span> • {readTime}
          {publishedAt && <span> • {publishedAt}</span>}
        </div>
      </div>
    </div>
  );
};

export default NewsCardSecondary;
