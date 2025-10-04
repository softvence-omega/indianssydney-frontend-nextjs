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
  str?.toLowerCase().replace(/[&\s]+/g, "-");

interface SubCategory {
  id: string;
  subname: string;
  subslug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  tamplate: string;
  subCategories?: SubCategory[];
}

const BusinessTemplate = ({
  category,
  subcategorySlug,
}: {
  category: Category;
  subcategorySlug: string;
}) => {
  // ✅ Filter main category
  const categoryArticles = newsItems.filter(
    (item) => normalizeString(item.category) === normalizeString(category.name)
  );
  // ✅ Group by subcategory + construct href
  const articlesBySubcategory =
    (category?.subCategories || []).map((submenu) => {
      const subArticles = newsItems.filter(
        (item) =>
          normalizeString(item.category) === normalizeString(category.name) &&
          normalizeString(item.subcategory || "") ===
            normalizeString(submenu.subname)
      );

      return {
        submenu: {
          ...submenu,
          href: `/${category.slug}/${submenu.subslug}`, // 👈 ensure href is set
          label: submenu.subname,
        },
        subArticles,
      };
    }) || [];

  return (
    <CommonWrapper>
      <CommonPadding>
        <PrimaryHeading title={category?.name} icon={false} />

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
          category={{
            ...category,
            href: `/${category.slug}`, // 👈 also give category its href
          }}
          activeSubcategory={subcategorySlug}
          articlesBySubcategory={articlesBySubcategory}
          categoryArticles={categoryArticles}
        />
      </CommonPadding>
    </CommonWrapper>
  );
};

export default BusinessTemplate;
