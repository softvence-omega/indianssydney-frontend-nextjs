import React from "react";

type NewsCardProps = {
  image: string;
  tag?: string;
  title: string;
  description?: string;
  author: string;
  readTime: string;
  layout?: "left" | "right"; // new prop
  imageHeight?: string; // new prop for large screens
};

const NewsCardSecondary: React.FC<NewsCardProps> = ({
  image,
  tag,
  title,
  author,
  readTime,
  layout = "left", // default to left
  imageHeight = "lg:h-[190px]", // default large screen height
}) => {
  return (
    <div
      className={`grid md:grid-cols-2 gap-6 ${
        layout === "right" ? "md:[direction:rtl]" : ""
      }`}
    >
      {/* Image Section */}
      <div className={`w-full h-[140px] ${imageHeight} overflow-hidden`}>
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content Section */}
      <div
        className={`flex flex-col ${
          layout === "right" ? "md:[direction:ltr]" : ""
        }`}
      >
        {tag && (
          <span className="text-xs font-bold uppercase text-accent-orange border border-accent-orange px-2 py-1 w-fit mb-3">
            {tag}
          </span>
        )}
        <h2 className="text-lg font-semibold mb-2 font-playfair text-blk-1 line-clamp-2">
          {title}
        </h2>

        <div className="text-xs lg:text-sm text-accent-orange font-medium">
          <span>by {author}</span> • {readTime}
        </div>
      </div>
    </div>
  );
};

export default NewsCardSecondary;
