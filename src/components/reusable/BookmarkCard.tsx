"use client";

import { removeBookMark } from "@/store/features/bookmark/bookmark.slice";
import { useAppDispatch } from "@/store/hook";
import { Popover, Transition } from "@headlessui/react";
import { EllipsisVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BookmarkItem {
  id: string;
  title: string;
  subTitle: string;
  headingImage: string;
  createdAt: string;
}

interface BookmarkCardProps {
  item: BookmarkItem;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const formattedDate = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "No date available";

  // API integrated remove handler


  return (
    <div className="flex justify-between items-center gap-4 border border-[#EDEFF0] p-6 bg-pure-white rounded-lg hover:shadow-sm transition-all">
      {/* --- Left: Article Image and Info --- */}
      <div className="flex gap-4">
        <img
          src={
            item?.headingImage ||
            "https://via.placeholder.com/120x120.png?text=No+Image"
          }
          alt={item.title}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div>
          <Link href={`details/article/${item?.id}`} className="font-bold font-playfair text-lg my-1 line-clamp-1">
            {item.title}
          </Link>
          <p className="text-sm text-gray-600 line-clamp-2">
            {item.subTitle || "No description available."}
          </p>
        </div>
      </div>

      {/* --- Right: Date + Menu --- */}
      <div className="flex items-center space-x-4">
        <p className="text-sm text-gray-500 whitespace-nowrap">
          {formattedDate}
        </p>

        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`text-gray-500 hover:text-gray-700 focus:outline-none ${open ? "text-gray-700" : ""
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
                    onClick={() => dispatch(removeBookMark(item?.id))}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Remove
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
