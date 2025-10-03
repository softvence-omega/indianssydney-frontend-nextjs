"use client";

import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
import Ad from "@/components/reusable/Ad";
import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { newsItems } from "@/utils/demoData";
import NewsSlider from "../home/NewsCurrent/NewsSlider";
import NewsCard3 from "../reusable/NewsCard3";
import { MenuItem } from '../../types/index';

const normalizeString = (str: string) =>
  str?.toLowerCase().replace(/[&\s]+/g, "-");

const EducationTemplate = ({ category }: { category: MenuItem }) => {
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
           <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-1 lg:grid-cols-4 gap-4 xl:divide-x xl:divide-slight-border">
            {/* Main slider section */}
            <div className="lg:col-span-3 xl:pr-4">
              <NewsSlider items={categoryArticles.slice(0, 4)} />

              <div className="mt-4 grid grid-cols-2 gap-4">
                {categoryArticles.slice(0, 2).map((item) => (
                  <NewsCardSecondary key={item.id} {...item} />
                ))}
              </div>
            </div>

            {/* Secondary cards */}
            <div className="hidden lg:grid grid-cols-2 lg:grid-cols-1 gap-4">
              {categoryArticles.slice(1, 2).map((item) => (
                <NewsCard3
                  key={item.id}
                  {...item}
                  imgHeight="h-[200px] md:h-[300px] lg:h-auto"
                />
              ))}
            </div>
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

export default EducationTemplate;
