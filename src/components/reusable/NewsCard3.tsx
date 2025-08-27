import Image from "next/image";
import React from "react";

type NewsCardProps = {
  image: string;
  tag?: string;
  title: string;
  description: string;
  author: string;
  readTime: string;
  imgHeight?: string;
};

const NewsCard3: React.FC<NewsCardProps> = ({
  image,
  tag,
  title,
  //   description,
  author,
  readTime,
  imgHeight = "h-[200px] md:h-[300px]",
}) => {
  return (
    <div className="grid  gap-6">
      {/* Image Section */}
      <div className={`w-full overflow-hidden ${imgHeight}`}>
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col">
        {tag && (
          <span className="text-xs font-bold uppercase text-accent-orange border border-accent-orange px-2 py-1 w-fit mb-3">
            {tag}
          </span>
        )}
        <h2 className="text-lg md:text-xl font-semibold mb-2 font-playfair text-blk-1 line-clamp-2">
          {title}
        </h2>
        {/* <p className="text-sm mb-6 text-blk-2">{description}</p> */}
        <div className="text-xs lg:text-sm text-accent-orange font-medium">
          <span>by {author}</span> • {readTime}
        </div>
      </div>
    </div>
  );
};

export default NewsCard3;
