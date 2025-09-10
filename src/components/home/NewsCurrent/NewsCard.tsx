import Link from "next/link";
import React from "react";

type NewsCardProps = {
  image: string;
  tag?: string;
  title: string;
  description: string;
  author: string;
  readTime: string;
};

const NewsCard: React.FC<NewsCardProps> = ({
  image,
  tag,
  title,
  description,
  author,
  readTime,
}) => {
  return (
    <Link href="/details/article/1" className="grid md:grid-cols-2 lg:grid-cols-12 gap-6">
      {/* Image Section */}
      <div className="w-full h-[300px] md:h-[400px] overflow-hidden lg:col-span-7">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:col-span-5">
        {tag && (
          <span className="text-xs font-bold uppercase text-accent-orange border border-accent-orange px-2 py-1 w-fit mb-3">
            {tag}
          </span>
        )}
        <h2 className="text-xl md:text-2xl font-semibold mb-2 font-playfair text-blk-1">
          {title}
        </h2>
        <p className="text-sm mb-6 text-blk-2">{description}</p>
        <div className="text-xs lg:text-sm text-accent-orange font-medium">
          <span>by {author}</span> • {readTime}
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
