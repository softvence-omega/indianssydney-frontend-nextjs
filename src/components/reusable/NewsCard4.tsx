import React from "react";

type NewsCardProps = {
  image: string;
  tag?: string;
  title: string;
  description?: string;
  author: string;
  readTime: string;
  imgHeight?: string;
  type?: "transparent" | "gradient";
};

const NewsCard4: React.FC<NewsCardProps> = ({
  image,
  tag,
  title,
  author,
  readTime,
  imgHeight = "h-[300px] md:h-[500px]",
  type = "transparent",
}) => {
  return (
    <div className={`relative w-full overflow-hidden ${imgHeight}`}>
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay with blur */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black to-transparent ${
          type === "transparent" ? "opacity-30" : "opacity-90"
        }`}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-1">
        <div
          className={`p-4 text-white ${
            type === "transparent"
              ? "backdrop-blur-[4px] bg-white/20 border-t border-white/40"
              : ""
          }`}
        >
          {tag && (
            <span
              className={`text-xs font-bold uppercase border px-2 py-1 mb-3 inline-block ${
                type === "transparent"
                  ? "text-white border-white"
                  : "text-accent-orange border-accent-orange"
              }`}
            >
              {tag}
            </span>
          )}
          <h2 className="text-lg md:text-xl font-semibold mb-2 font-playfair line-clamp-2">
            {title}
          </h2>
          <div
            className={`text-xs lg:text-sm font-medium ${
              type === "transparent" ? "text-white" : "text-accent-orange"
            }`}
          >
            <span>by {author}</span> • {readTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard4;
