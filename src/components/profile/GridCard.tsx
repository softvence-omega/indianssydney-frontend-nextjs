// GridCard.tsx
import { ContentItem } from "@/utils/myContentData";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

type GridCardProps = {
  item: ContentItem;
};

const GridCard: React.FC<GridCardProps> = ({ item }) => {
  const router = useRouter();

  const handleEdit = (contentType: string) => {
    contentType === "ARTICLE"
      ? router.push(`/edit-article/${item.id}`)
      : contentType === "VIDEO"
      ? router.push(`/edit-video/${item.id}`)
      : router.push(`/edit-podcast/${item.id}`);
    // router.push(`/edit-article/${item.id}`);
    console.log(item);
  };

  const handleViewDetails = (contentType: string) => {
    contentType === "ARTICLE"
      ? router.push(`/details/article/${item.id}`)
      : contentType === "VIDEO"
      ? router.push(`/details/video/${item.id}`)
      : router.push(`/details/podcast/${item.id}`);
  };

  return (
    <div className="relative w-full overflow-hidden h-[300px] cursor-pointer group">
      <img
        src={item?.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="p-4 text-white">
          <div className="flex justify-start items-center gap-2">
            <span className="text-xs py-1 px-2 capitalize border border-accent-orange text-accent-orange font-semibold bg-white">
              {item.contentType}
            </span>
            <span
              className={`text-xs py-1 px-2 capitalize text-white border ${
                item.status === "APPROVE"
                  ? "bg-blue-primary border-blue-primary"
                  : item.status === "PENDING"
                  ? "bg-[#8D9B90] border-[#8D9B90]"
                  : "bg-brick-red border-brick-red"
              }`}
            >
              {item.status}
            </span>
          </div>
          <div onClick={()=>handleViewDetails(item.contentType)}>
            <h2 className="text-lg md:text-xl font-semibold mb-2 font-playfair line-clamp-2">
              {item.title}
            </h2>
            <div className="text-xs font-medium">
              {item.views} views • {item.likes} likes • {item.comments} comments
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button - Hover Effect */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(item?.contentType);
          }}
          className="bg-white text-black hover:bg-gray-100"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default GridCard;
