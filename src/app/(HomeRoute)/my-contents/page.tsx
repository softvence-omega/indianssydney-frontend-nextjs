"use client";

import React, { useState, useMemo } from "react";
import CommonWrapper from "@/common/CommonWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import GridCard from "@/components/profile/GridCard";
import ListCard from "@/components/profile/ListCard";
import UploadCard from "@/components/profile/UploadCard";
import { LayoutGrid, LayoutList } from "lucide-react";
import CommonPadding from "@/common/CommonPadding";
import SavedContents from "@/components/profile/ContentStatus";
import { useGetMyArticlesQuery } from "@/store/features/article/article.api";
import SkeletonLoader from "@/components/reusable/SkeletonLoader";

type TabKey = "my" | "saved" | "status";
type ViewMode = "grid" | "list";

const TABS: { key: TabKey; label: string }[] = [
  { key: "my", label: "My Contents" },
];

const ITEMS_PER_PAGE_GRID = 5;
const ITEMS_PER_PAGE_LIST = 5;

const MyContents = () => {
  const { data, isLoading, isFetching } = useGetMyArticlesQuery({});
  console.log(data);
  const user = useSelector((state: RootState) => state?.auth?.user);

  const [activeTab, setActiveTab] = useState<TabKey>("my");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const myArticles = data?.data || [];

  const pageSize =
    viewMode === "grid" ? ITEMS_PER_PAGE_GRID : ITEMS_PER_PAGE_LIST;
  const totalPages = Math.max(1, Math.ceil(myArticles.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = myArticles.slice(startIndex, startIndex + pageSize);

  const onChangeTab = (tab: TabKey) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const onChangeView = (mode: ViewMode) => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  const nextPage = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  return (
    <div className="bg-white">
      <CommonWrapper>
        <CommonPadding>
          {/* 🧑‍💻 User Info */}
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

          {/* 🗂 Tabs */}
          <div className="flex items-center gap-6 justify-start border-b border-[#EDEFF0]">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => onChangeTab(t.key)}
                className={`py-2 -mb-px border-b-2 ${
                  activeTab === t.key
                    ? "border-black text-black"
                    : "border-transparent text-gray-500"
                }`}
              >
                {t.label}
              </button>
            ))}

            {/* Grid / List Toggle */}
            {activeTab === "my" && (
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => onChangeView("grid")}
                  className={` ${
                    viewMode === "grid"
                      ? "text-brick-red"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <LayoutGrid />
                </button>
                <button
                  onClick={() => onChangeView("list")}
                  className={` ${
                    viewMode === "list"
                      ? "text-brick-red"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <LayoutList />
                </button>
              </div>
            )}
          </div>

          {/* 📰 Content Section */}
          <div className="mt-6 md:mt-10">
            {isLoading || isFetching ? (
              <SkeletonLoader />
            ) : myArticles.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No contents found.
              </div>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <UploadCard viewMode={viewMode} />
                    {currentItems.map((item: any) => (
                      <GridCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <UploadCard viewMode={viewMode} />
                    {currentItems.map((item: any) => (
                      <ListCard key={item.id} item={item} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-accent-orange"
                    }`}
                  >
                    Previous
                  </button>
                  <div>
                    Page {currentPage} of {totalPages}
                  </div>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-accent-orange"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default MyContents;
