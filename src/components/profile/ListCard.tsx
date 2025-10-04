// ListCard.tsx (Responsive List View)
import React from "react";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Popover, Transition } from "@headlessui/react";
import { ContentItem } from "@/utils/myContentData";

type ListCardProps = {
  item: ContentItem;
};

const ListCard: React.FC<ListCardProps> = ({ item }) => {
  // Safely format date
  const formattedDate = item.publishedAt
    ? new Date(item.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  const handleRemove = () => {
    toast.success("Article removed from bookmarks!");
    console.log(`Removed article with id: ${item.id}`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border border-[#EDEFF0] p-4 sm:p-6 bg-pure-white ">
      {/* Left: Image + Details */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <img
          src={item?.image}
          alt="News Image"
          className="w-full sm:w-28 sm:h-28 md:w-40 md:h-40 object-cover"
        />
        <div className="flex flex-col justify-center">
          <div className="flex justify-start items-center gap-2">
            <p className="text-xs capitalize border px-2 py-1 border-accent-orange text-accent-orange font-semibold">
              {item.contentType}
            </p>
            <p
              className={`text-xs py-1 px-2 capitalize text-white ${
                item.status === "APPROVE"
                  ? "bg-blue-primary"
                  : item.status === "PENDING"
                  ? "bg-[#8D9B90] "
                  : "bg-brick-red "
              }`}
            >
              {item.status}
            </p>
          </div>
          <p className="font-bold font-playfair text-base md:text-lg sm:text-xl my-2 line-clamp-2">
            {item.title}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2 sm:line-clamp-3 max-w-xl">
            {item.description}
          </p>
          <div className={`text-xs font-medium mt-1`}>
            {item.views} views • {item.likes} likes• {item.comments} comments
          </div>
        </div>
      </div>

      {/* Right: Date + Actions */}
      <div className="flex  items-start sm:items-center justify-between sm:justify-center gap-2 sm:gap-4 w-full sm:w-auto">
        <p className="text-sm text-gray-500 text-nowrap">{formattedDate}</p>
        <div>
          {" "}
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`text-gray-500 hover:text-gray-700 focus:outline-none ${
                    open ? "text-gray-700" : ""
                  }`}
                >
                  <EllipsisVertical className="h-6 w-6" />
                </Popover.Button>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Popover.Panel className="absolute right-0 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                    <button
                      onClick={handleRemove}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </button>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
