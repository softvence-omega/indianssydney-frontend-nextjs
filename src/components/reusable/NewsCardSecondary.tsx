"use client"
import { useCountViewMutation } from "@/store/features/article/article.api";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

// Updated props to match Article interface
type NewsCardProps = {
  id: string;
  title: string;
  subTitle?: string;
  paragraph?: string;
  image: string;
  category?: string;
  subcategory?: string;
  author?: string;
  publishedAt?: string;
  views?: number;
  likes?: number;
  comments?: number;
  tag?: string;
  video?: string;
  featured?: boolean;
  layout?: "left" | "right"; // layout prop for component flexibility
  imageHeight?: string; // custom image height
};

const NewsCardSecondary: React.FC<NewsCardProps> = ({
  id,
  image,
  tag,
  title,
  author = "Unknown",
  layout = "left",
  imageHeight = "lg:h-[190px]", // default large screen height
  category,
  publishedAt,
  subTitle,
  video
}) => {
  const [updateViewCount] = useCountViewMutation();
  const router = useRouter();
  const readTime = useMemo(() => {
    const randomMinutes = Math.floor(Math.random() * 8) + 5; // 5 to 12
    return `${randomMinutes} min read`;
  }, []);

  const countView = async () => {
    if (id) {
      await updateViewCount(id);
    }
  }

  const navigateToDetails = () => {
    countView();
    router.push(`/details/article/${id}`);
  }

  return (
    <button
      onClick={navigateToDetails}
      className={`grid md:grid-cols-2 gap-6 cursor-pointer ${layout === "right" ? "md:flex-row-reverse" : "md:flex-row"
        } text-left`}
    >
      {/* Image Section */}
      <div className={`w-auto h-[140px] ${imageHeight} overflow-hidden`}>
        {/* <img
          src={image}
          alt={title}
          className="w-full h-full object-cover overflow-hidden"
        /> */}
        {video && <video src={video} className="w-full h-full object-cover" controls />}
        {image && <img src={image} alt={title} className="w-full h-full object-cover" />}
      </div>

      {/* Content Section */}
      <div className="flex flex-col">
        {(tag || category) && (
          <span className="text-xs font-bold uppercase text-accent-orange border border-accent-orange px-2 py-1 w-fit mb-3">
            {tag || category}
          </span>
        )}
        <h2 className="text-lg font-semibold mb-2 font-playfair text-blk-1 line-clamp-2 overflow-hidden">
          {title}
        </h2>

        {subTitle && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{subTitle}</p>
        )}

        <div className="text-xs lg:text-sm text-accent-orange font-medium">
          <span>by {author}</span> • {readTime}
          {publishedAt && <span> • {publishedAt}</span>}
        </div>
      </div>
    </button>
  );
};

export default NewsCardSecondary;
