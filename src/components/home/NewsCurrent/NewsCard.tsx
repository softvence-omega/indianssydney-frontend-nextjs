import { useCountViewMutation } from "@/store/features/article/article.api";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

type NewsCardProps = {
  id: string;
  image: string;
  tags?: string[];
  title: string;
  subTitle: string;
  user: {
    fullName?: string;
  };
  video?: string;
};

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  image,
  video,
  tags,
  title,
  subTitle,
  user,
}) => {
  const [updateViewCount] = useCountViewMutation();
  const router = useRouter()
  // Generate random read time (5–12 minutes)
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
      className="grid md:grid-cols-2 lg:grid-cols-12 gap-6 text-left"
    >
      {/* Image Section */}
      <div className="w-full h-[300px] md:h-[400px] overflow-hidden lg:col-span-7">
        {video && <video src={video} className="w-full h-full object-cover" controls autoPlay />}
        {image && <img src={image} alt={title} className="w-full h-full object-cover" />}
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:col-span-5">
        {tags && (
          <span className="text-xs font-bold uppercase text-accent-orange border border-accent-orange px-2 py-1 w-fit mb-3">
            {tags[0]}
          </span>
        )}
        <h2 className="text-xl md:text-2xl font-semibold mb-2 font-playfair text-blk-1">
          {title}
        </h2>
        <p className="text-sm mb-6 text-blk-2">{subTitle}</p>
        <div className="text-xs lg:text-sm text-accent-orange font-medium">
          <span>by {user?.fullName?.split(" ")[0] || "Unknown Author"}</span> •{" "}
          {readTime}
        </div>
      </div>
    </button>
  );
};

export default NewsCard;
