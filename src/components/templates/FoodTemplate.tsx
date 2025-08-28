"use client";

import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
import Ad from "@/components/reusable/Ad";
import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { newsItems } from "@/utils/demoData";
import NewsCard4 from "../reusable/NewsCard4";
import { MenuItem } from "@/types";

const normalizeString = (str: string) =>
  str.toLowerCase().replace(/[&\s]+/g, "-");

const FoodTemplate = ({ category }: { category: MenuItem;}) => {
  // filter main category
  const categoryArticles = newsItems.filter(
    (item) => normalizeString(item.category) === normalizeString(category.label)
  );

  // group by subcategory
  const articlesBySubcategory = (category?.submenus || []).map((submenu) => {
    const subArticles = newsItems.filter(
      (item) =>
        normalizeString(item.category) === normalizeString(category.label) &&
        normalizeString(item.subcategory || "") ===
          normalizeString(submenu.label)
    );
    return { submenu, subArticles };
  });

  return (
    <CommonWrapper>
      <CommonPadding>
        {/* Main Category Title */}
        <PrimaryHeading title={category.label} icon={false} />

        {/* Empty state */}
        {categoryArticles.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <p>No articles found for this category.</p>
          </div>
        )}

        {/* 🔹 Top Row: Whole Category Grid */}
        {categoryArticles.length > 0 && (
          <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4">
            {categoryArticles[0] && (
              <NewsCardSecondary {...categoryArticles[0]} layout="right" />
            )}
            {categoryArticles[1] && (
              <div className="lg:col-start-1 lg:row-start-2">
                <NewsCardSecondary {...categoryArticles[1]} layout="right" />
              </div>
            )}
            {categoryArticles[2] && (
              <div className="col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-2 lg:row-start-1">
                <NewsCard4 {...categoryArticles[2]} />
              </div>
            )}
            {categoryArticles[3] && (
              <div className="lg:col-start-3 lg:row-start-1">
                <NewsCardSecondary {...categoryArticles[3]} layout="left" />
              </div>
            )}
            {categoryArticles[4] && (
              <div className="lg:col-start-1 lg:row-start-2">
                <NewsCardSecondary {...categoryArticles[4]} layout="left" />
              </div>
            )}
          </div>
        )}
        <div className="my-10">
          <Ad />
        </div>

        {/* 🔹 Subcategory Sections */}
        {articlesBySubcategory.map(({ submenu, subArticles }) =>
          subArticles.length > 0 ? ( // ✅ render only if there are articles
            <div key={submenu.label} className="mt-12">
              {/* Subcategory heading */}
              <PrimaryHeading title={submenu.label} />

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {subArticles.map((item) => (
                  <NewsCardSecondary key={item.id} {...item} />
                ))}
              </div>
            </div>
          ) : null
        )}
      </CommonPadding>
    </CommonWrapper>
  );
};

export default FoodTemplate;
