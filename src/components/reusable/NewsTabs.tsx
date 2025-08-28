"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Article, MenuItem } from "@/types";
import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";

interface NewsTabsProps {
  category: MenuItem;
  activeSubcategory?: string;
  articlesBySubcategory: {
    submenu: { href: string; label: string };
    subArticles: Article[];
  }[];
  categoryArticles: Article[]; // 👈 pass all category articles
}

const NewsTabs: React.FC<NewsTabsProps> = ({
  category,
  activeSubcategory,
  articlesBySubcategory,
  categoryArticles,
}) => {
  const pathname = usePathname();

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center space-x-6 mb-6 border-b border-[#EDEFF0]">
        {/* All Tab */}
        <Link
          href={`${category.href}`} // adjust route
          className={`py-2 text-sm text-nowrap transition-colors duration-200 ${
            !activeSubcategory
              ? "text-accent-orange font-semibold border-b-2 border-accent-orange"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          All
        </Link>

        {/* Subcategory Tabs */}
        {category.submenus.map((submenu) => {
          const subSlug = submenu.href.split("/").pop();
          const isActive =
            pathname === submenu.href || subSlug === activeSubcategory;

          return (
            <Link
              key={submenu.href}
              href={submenu.href}
              className={`py-2 text-sm text-nowrap transition-colors duration-200 ${
                isActive
                  ? "text-accent-orange font-semibold border-b-2 border-accent-orange"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {submenu.label}
            </Link>
          );
        })}
      </div>

      {/* Articles */}
      <div className="space-y-10">
        {/* Show All */}
        {!activeSubcategory && (
          <div>
            {categoryArticles.length === 0 ? (
              <p className="text-center text-gray-500">
                No articles found in {category.label}.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {categoryArticles.map((article) => (
                  <div key={article.id}>
                    <NewsCardSecondary {...article} layout="left" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Show Subcategory */}
        {articlesBySubcategory.map(({ submenu, subArticles }) => {
          const subSlug = submenu.href.split("/").pop();
          const isActive = subSlug === activeSubcategory;

          if (!isActive) return null;

          return (
            <div key={submenu.href}>
              {subArticles.length === 0 ? (
                <p className="text-center text-gray-500">
                  No articles found for {submenu.label}.
                </p>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {subArticles.map((article, i) => (
                    <NewsCardSecondary key={i} {...article} layout="right" />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsTabs;
