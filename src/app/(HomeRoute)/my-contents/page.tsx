"use client";

import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { newsItems } from "@/utils/demoData";
import BookmarkCard from "@/components/reusable/BookmarkCard";
import { useMemo, useState } from "react";
import Image from "next/image";

type TabKey = "my" | "saved" | "status";
type ViewMode = "grid" | "list";

const TABS: { key: TabKey; label: string }[] = [
  { key: "my", label: "My Contents" },
  { key: "saved", label: "Saved Contents" },
  { key: "status", label: "Content Status" },
];

const ITEMS_PER_PAGE_GRID = 9;  // 3x3
const ITEMS_PER_PAGE_LIST = 5;  // 5 rows per page

/** Small upload card shown at the top-left (grid view) and at header (list view) */
const UploadCard = () => (
  <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center h-full">
    <div className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center mb-4">
      <span className="text-xl">🡅</span>
    </div>
    <h3 className="font-semibold">Upload your best story</h3>
    <p className="text-sm text-gray-500 mt-1">
      Publish your best work. Get feedback, likes and be a part of our growing community.
    </p>
    <button className="mt-4 px-4 py-2 rounded-md bg-black text-white">Upload</button>
  </div>
);

/** Simple list-row version for list view */
const ListRow = ({ item }: { item: any }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 md:p-6 flex gap-4 md:gap-6 items-start">
      <Image
        src={item?.image || "https://via.placeholder.com/160x110"}
        alt={item?.title}
        className="w-28 h-20 md:w-40 md:h-28 object-cover rounded"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            {item?.type && (
              <span className="inline-block text-[10px] tracking-wide px-2 py-1 rounded border border-gray-300 text-gray-600">
                {item.type.toUpperCase()}
              </span>
            )}
            <h3 className="font-semibold leading-snug">{item?.title}</h3>
            {item?.excerpt && (
              <p className="text-sm text-gray-600">
                {item.excerpt}
              </p>
            )}
            {item?.status && (
              <span
                className={`inline-block text-[10px] font-semibold px-2 py-1 rounded ${
                  item.status === "APPROVED"
                    ? "bg-emerald-600 text-white"
                    : item.status === "PENDING"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {item.status}
              </span>
            )}
            <p className="text-[12px] text-gray-500">
              {item?.meta || "24 VIEWS · 8 COMMENTS · 13 LIKES"}
            </p>
          </div>
          {item?.date && (
            <span className="text-xs text-gray-500 whitespace-nowrap mt-1">
              {item.date}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const MyContents = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  // tabs & view mode
  const [activeTab, setActiveTab] = useState<TabKey>("saved");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  // filter by tab (customize as needed)
  const filteredItems = useMemo(() => {
    if (activeTab === "saved") return newsItems;
    if (activeTab === "my") return newsItems.slice(0, Math.ceil(newsItems.length / 2));
    return newsItems;
  }, [activeTab]);

  // page size depends on view
  const pageSize = viewMode === "grid" ? ITEMS_PER_PAGE_GRID : ITEMS_PER_PAGE_LIST;

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const onChangeTab = (tab: TabKey) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const onChangeView = (mode: ViewMode) => {
    setViewMode(mode);
    setCurrentPage(1); // reset pagination when switching view
  };

  const nextPage = () => currentPage < totalPages && setCurrentPage(p => p + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(p => p - 1);

  return (
    <div className="bg-white">
      <CommonWrapper>
        <CommonPadding>
          {/* profile header */}
          <div className="flex gap-4 items-center justify-center mt-2 mb-6">
            <img
              src={user?.profileImage || "https://via.placeholder.com/100"}
              alt="User Avatar"
              className="w-18 h-18 rounded-full border-2 border-gray-200 object-cover"
            />
            <div>
              <p className="text-lg font-semibold">{user?.name || "Guest User"}</p>
              <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
            </div>
          </div>

          {/* tabs + view toggle */}
          <div className="flex items-center gap-6 justify-start border-b border-[#EDEFF0]">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => onChangeTab(t.key)}
                className={`py-2 -mb-px border-b-2 ${
                  activeTab === t.key ? "border-black text-black" : "border-transparent text-gray-500"
                }`}
              >
                {t.label}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2">
              {/* Grid button */}
              <button
                aria-label="Grid view"
                onClick={() => onChangeView("grid")}
                className={`p-2 rounded-md border ${
                  viewMode === "grid"
                    ? "border-black text-black"
                    : "border-gray-300 text-gray-500 hover:border-gray-400"
                }`}
                title="Grid view"
              >
                {/* simple grid icon */}
                <span className="grid grid-cols-2 gap-0.5 w-4 h-4">
                  <span className="bg-current/80"></span>
                  <span className="bg-current/80"></span>
                  <span className="bg-current/80"></span>
                  <span className="bg-current/80"></span>
                </span>
              </button>

              {/* List button */}
              <button
                aria-label="List view"
                onClick={() => onChangeView("list")}
                className={`p-2 rounded-md border ${
                  viewMode === "list"
                    ? "border-black text-black"
                    : "border-gray-300 text-gray-500 hover:border-gray-400"
                }`}
                title="List view"
              >
                {/* simple list icon */}
                <span className="flex flex-col gap-0.5 w-4">
                  <span className="h-0.5 bg-current/80"></span>
                  <span className="h-0.5 bg-current/80"></span>
                  <span className="h-0.5 bg-current/80"></span>
                </span>
              </button>
            </div>
          </div>

          {/* section title */}
          <div className="mt-6 md:mt-10">
            <p className="text-lg font-semibold text-accent-orange pb-1 mb-4 border-b border-[#EDEFF0]">
              {activeTab === "saved" ? "Saved Articles" : activeTab === "my" ? "My Articles" : "Content Status"}
            </p>

            {/* list view header upload bar (to match your second mockup) */}
            {viewMode === "list" && (
              <div className="border border-gray-200 rounded-lg p-4 md:p-6 flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center">
                    <span className="text-xl">🡅</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Upload your best story</h3>
                    <p className="text-sm text-gray-500">
                      Publish your best work. Get feedback, likes and be a part of our growing community.
                    </p>
                  </div>
                </div>
                <button className="mt-0 px-4 py-2 rounded-md bg-black text-white">Upload</button>
              </div>
            )}

            {/* content */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* upload card in first cell for grid */}
                <UploadCard />
                {currentItems.map((item) => (
                  <BookmarkCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {currentItems.map((item) => (
                  <ListRow key={item.id} item={item} />
                ))}
              </div>
            )}

            {/* pagination */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevPage}
                className={`${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-accent-orange"}`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={nextPage}
                className={`${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-accent-orange"}`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default MyContents;
