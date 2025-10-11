"use client";

import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import BookmarkCard from "@/components/reusable/BookmarkCard";
import { useState, useMemo } from "react";
import { useGetBookmarksQuery } from "@/store/features/bookmark/bookmark.api";
import { Loader2 } from "lucide-react"; // optional loading spinner

const ITEMS_PER_PAGE = 3; // number of items per page

const BookmarkedArticles = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data, isLoading, isError } = useGetBookmarksQuery({});
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Ensure we always have an array even if data is undefined
  const bookmarks = useMemo(() => data || [], [data]);

  // Pagination calculations
  const totalPages = Math.ceil(bookmarks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = bookmarks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Pagination handlers
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Loading and Error States
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading bookmarks...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load bookmarks. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-white">
      <CommonWrapper>
        <CommonPadding>
          {/* --- User Profile Section --- */}
          <div className="flex gap-4 items-center justify-center mt-2 mb-6">
            <img
              src={user?.profilePhoto || "https://via.placeholder.com/100"}
              alt="User Avatar"
              className="w-18 h-18 rounded-full border-2 border-gray-200 object-cover"
            />
            <div>
              <p className="text-lg font-semibold">
                {user?.fullName || "Guest User"}
              </p>
              <p className="text-sm text-gray-500">
                {user?.email || "No email"}
              </p>
            </div>
          </div>

          {/* --- Bookmarks Section --- */}
          <div className="mt-10 md:mt-16">
            <p className="text-lg font-semibold text-accent-orange pb-1 mb-4 border-b border-[#EDEFF0]">
              Saved Articles
            </p>

            {bookmarks.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">
                You haven’t saved any articles yet.
              </p>
            ) : (
              <>
                <div className="grid gap-4">
                  {currentItems.map((item: any) => (
                    <BookmarkCard key={item.id} item={item} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={prevPage}
                      className={`${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-accent-orange cursor-pointer"
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
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-accent-orange cursor-pointer"
                      }`}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default BookmarkedArticles;
