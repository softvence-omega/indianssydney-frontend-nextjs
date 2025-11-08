"use client";

import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import BookmarkCard from "@/components/reusable/BookmarkCard";
import { selectUser } from "@/store/features/auth/auth.slice";
import { useAppSelector } from "@/store/hook";

const BookmarkedArticles = () => {
  const user = useAppSelector(selectUser)
  const bookmarks = useAppSelector((state) => state.bookMark?.bookMarks);


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
                  {bookmarks.map((item: any) => (
                    <BookmarkCard key={item.id} item={item} />
                  ))}
                </div>
              </>
            )}
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default BookmarkedArticles;
