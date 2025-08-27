// GridCard.tsx (for Grid View)
import { ContentItem } from "@/utils/myContentData";
import React from "react";


type GridCardProps = {
  item: ContentItem;
};

const GridCard: React.FC<GridCardProps> = ({ item }) => {
  return (
    <div className="relative w-full overflow-hidden h-[300px]">
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="p-4 text-white">
          <div className="flex justify-start items-center gap-2">
            <span
              className="text-xs py-1 px-2 capitalize border border-accent-orange text-accent-orange font-semibold bg-white"
            >
              {item.type}
            </span>
            <span
              className={`text-xs py-1 px-2 capitalize text-white border ${
                item.status === "approved"
                  ? "bg-blue-primary border-blue-primary"
                  : item.status === "pending"
                  ? "bg-[#8D9B90] border-[#8D9B90]"
                  : "bg-brick-red border-brick-red"
              }`}
            >
              {item.status}
            </span>
          </div>

          <h2 className="text-lg md:text-xl font-semibold mb-2 font-playfair line-clamp-2">
            {item.title}
          </h2>
          <div className="text-xs font-medium">
            {item.views} views • {item.likes} likes • {item.comments} comments
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridCard;
