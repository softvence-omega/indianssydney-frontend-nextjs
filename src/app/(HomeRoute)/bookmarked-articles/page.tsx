"use client"

import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { newsItems } from "@/utils/demoData";
import BookmarkCard from "@/components/reusable/BookmarkCard";
import { useState } from "react";

const ITEMS_PER_PAGE = 3; // Number of items to display per page

const BookmarkedArticles = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);

  // Get items to display for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = newsItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle next page
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Handle previous page
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-white">
      <CommonWrapper>
        <CommonPadding>
          <div>
            <div className="flex gap-4 items-center justify-center mt-2 mb-6">
              <img
                src={user?.profileImage || "https://via.placeholder.com/100"}
                alt="User Avatar"
                className="w-18 h-18 rounded-full border-2 border-gray-200 object-cover"
              />
              <div>
                <p className="text-lg font-semibold">
                  {user?.name || "Guest User"}
                </p>
                <p className="text-sm text-gray-500">
                  {user?.email || "No email"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-16">
            <div>
              <p className="text-lg font-semibold text-accent-orange pb-1 mb-4 border-b border-[#EDEFF0]">
                Saved Articles
              </p>

              {/* Display bookmarked articles */}
              <div className="grid gap-4">
                {currentItems.map((item) => (
                  <BookmarkCard key={item.id} item={item} />
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={prevPage}
                  className={`${
                    currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-accent-orange cursor-pointer"
                  }`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <div>
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={nextPage}
                  className={`${
                    currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-accent-orange cursor-pointer"
                  }`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default BookmarkedArticles;
