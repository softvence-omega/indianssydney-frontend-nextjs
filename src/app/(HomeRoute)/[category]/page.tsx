"use client";

import { useParams, usePathname } from "next/navigation";
import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
import Ad from "@/components/reusable/Ad";
import NewsCard3 from "@/components/reusable/NewsCard3";
import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";
import NewsTabs from "@/components/reusable/NewsTabs";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { allMenus, newsItems } from "@/utils/demoData";

// Utility: get category by href
const getCategoryByHref = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const category = allMenus.find((menu) => menu.href === normalizedPath);

  if (!category) {
    console.error(`Category not found for path: ${normalizedPath}`);
  }

  return category;
};

// Extract category + subcategory from pathname
const extractCategoryFromPath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  return segments[0] || "";
};

const extractSubcategoryFromPath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  return segments[1] || "";
};

const normalizeString = (str: string) =>
  str.toLowerCase().replace(/[&\s]+/g, "-");

const CategoryPage = () => {
  const params = useParams<{ category?: string; subcategory?: string }>();
  const pathname = usePathname();

  const categorySlug =
    params?.category || extractCategoryFromPath(pathname || "");
  const subcategorySlug =
    params?.subcategory || extractSubcategoryFromPath(pathname || "");

  const categoryHref = categorySlug ? `/${categorySlug}` : "";
  const category = getCategoryByHref(categoryHref);

  // Filter articles
  const filteredArticles = newsItems.filter((item) => {
    if (!category) return false;

    const normalizedItemCategory = normalizeString(item.category);
    const normalizedCategoryLabel = normalizeString(category.label);

    const matchesCategory = normalizedItemCategory === normalizedCategoryLabel;

    const matchesSubcategory = subcategorySlug
      ? normalizeString(item.subcategory || "") ===
        normalizeString(
          category.submenus?.find((submenu) => {
            const submenuSlug = submenu.href.split("/").pop();
            return submenuSlug === subcategorySlug;
          })?.label || ""
        )
      : true;

    return matchesCategory && matchesSubcategory;
  });

  const articlesToShow = filteredArticles.slice(0, 5);

  // Fallback: category not found
  if (!category) {
    return (
      <CommonWrapper>
        <CommonPadding>
          <PrimaryHeading title="Category Not Found" icon={false} />
          <p className="text-gray-500">
            The requested category `{categorySlug}` does not exist.
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-400">Available categories:</p>
            <ul className="text-sm text-gray-400 mt-2">
              {allMenus.map((menu) => (
                <li key={menu.href}>
                  {menu.href} → {menu.label}
                </li>
              ))}
            </ul>
          </div>
        </CommonPadding>
      </CommonWrapper>
    );
  }

  return (
    <CommonWrapper>
      <CommonPadding>
        <PrimaryHeading title={category.label} icon={false} />

        {/* Empty state */}
        {articlesToShow.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <p>No articles found for this category.</p>
            <p className="text-sm mt-2">
              Looking for: Category `{category.label}`
              {subcategorySlug && ` → Subcategory "${subcategorySlug}"`}
            </p>
          </div>
        )}

        {/* Responsive grid */}
        {articlesToShow.length > 0 && (
          <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4">
            {articlesToShow[0] && (
              <NewsCardSecondary {...articlesToShow[0]} layout="right" />
            )}

            {articlesToShow[1] && (
              <div className="lg:col-start-1 lg:row-start-2">
                <NewsCardSecondary {...articlesToShow[1]} layout="right" />
              </div>
            )}

            {articlesToShow[2] && (
              <div className="col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-2 lg:row-start-1">
                <NewsCard3 {...articlesToShow[2]} />
              </div>
            )}

            {articlesToShow[3] && (
              <div className="lg:col-start-3 lg:row-start-1">
                <NewsCardSecondary {...articlesToShow[3]} layout="left" />
              </div>
            )}

            {articlesToShow[4] && (
              <div className="lg:col-start-3 lg:row-start-2">
                <NewsCardSecondary {...articlesToShow[4]} layout="left" />
              </div>
            )}
          </div>
        )}
      </CommonPadding>

      <Ad />

      <CommonPadding>
        <NewsTabs category={category} activeSubcategory={subcategorySlug} />
      </CommonPadding>
    </CommonWrapper>
  );
};

export default CategoryPage;
