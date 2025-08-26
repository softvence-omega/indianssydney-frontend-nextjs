import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface NewsItem {
  id: string;
  image: string;
  author: string;
  title: string;
  description: string;
  publishedAt: string;
}

interface BookmarkCardProps {
  item: NewsItem;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ item }) => {
  // Format date to show only the date (e.g., "August 25, 2025")
  const formattedDate = new Date(item.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleRemove = () => {
    // Simulate removing an article from the bookmarks
    toast.success("Article removed from bookmarks!");
    console.log(`Removed article with id: ${item.id}`);
  };

  return (
    <div className="flex justify-between items-center gap-4 border border-[#EDEFF0] p-6 bg-pure-white">
      {/* Article Image and Details */}
      <div className="flex gap-4">
        <img
          src={item.image}
          alt="News Image"
          className="w-24 h-24 object-cover"
        />
        <div>
          <p className="text-xs text-gray-800">{item.author}</p>
          <p className=" font-bold font-playfair text-xl my-2">{item.title}</p>
          <p className="text-sm">{item.description}</p>
        </div>
      </div>

      {/* Date and Three-Dot Menu */}
      <div className="flex items-center space-x-4">
        <p className="text-sm text-gray-500 text-nowrap">{formattedDate}</p>
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
                <Popover.Panel className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10">
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
  );
};

export default BookmarkCard;