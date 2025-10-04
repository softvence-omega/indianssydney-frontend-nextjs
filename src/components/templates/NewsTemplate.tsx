"use client";

import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
import Ad from "@/components/reusable/Ad";
import NewsCard3 from "@/components/reusable/NewsCard3";
import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";
import NewsTabs from "@/components/reusable/NewsTabs";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { newsItems } from "@/utils/demoData";
import { MenuItem } from "@/types";

const normalizeString = (str: string) =>
  str.toLowerCase().replace(/[&\s]+/g, "-");

const NewsTemplate = ({ category, subcategorySlug }: {category: MenuItem; subcategorySlug: string}) => {
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
        <PrimaryHeading title={category.label} icon={false} />

        {/* Empty state */}
        {categoryArticles.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <p>No articles found for this category.</p>
          </div>
        )}

        {/* Category grid */}
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
                <NewsCard3 {...categoryArticles[2]} />
              </div>
            )}
            {categoryArticles[3] && (
              <div className="lg:col-start-3 lg:row-start-1">
                <NewsCardSecondary {...categoryArticles[3]} layout="left" />
              </div>
            )}
            {categoryArticles[4] && (
              <div className="lg:col-start-1 lg:row-start-2">
                <NewsCardSecondary {...categoryArticles[1]} layout="left" />
              </div>
            )}
          </div>
        )}
      </CommonPadding>

      <Ad />

      <CommonPadding>
        <NewsTabs
          category={category}
          activeSubcategory={subcategorySlug}
          articlesBySubcategory={articlesBySubcategory}
          categoryArticles={categoryArticles} // 👈 added
        />
      </CommonPadding>
    </CommonWrapper>
  );
};

export default NewsTemplate;
