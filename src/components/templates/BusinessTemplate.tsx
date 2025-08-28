"use client";

import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
import Ad from "@/components/reusable/Ad";
import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";
import NewsTabs from "@/components/reusable/NewsTabs";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { newsItems } from "@/utils/demoData";
import NewsSlider from "../home/NewsCurrent/NewsSlider";
import { MenuItem } from "@/types";

const normalizeString = (str: string) =>
  str.toLowerCase().replace(/[&\s]+/g, "-");

const BusinessTemplate = ({ category, subcategorySlug }: { category: MenuItem; subcategorySlug: string }) => {
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
          <div>
            <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4 xl:divide-x xl:divide-slight-border">
              {/* Main slider section */}
              <div className="xl:col-span-2 xl:pr-4">
                <NewsSlider items={categoryArticles.slice(0, 4)} />
              </div>

              {/* Secondary cards */}
              <div className="grid grid-cols-2 xl:grid-cols-1 gap-4">
                {categoryArticles.slice(0, 2).map((item) => (
                  <NewsCardSecondary key={item.id} {...item} />
                ))}
              </div>
            </div>
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

export default BusinessTemplate;
