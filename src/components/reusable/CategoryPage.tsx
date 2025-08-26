import { useParams, useLocation } from "react-router-dom";
import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
import Ad from "@/components/reusable/Ad";
import NewsCard3 from "@/components/reusable/NewsCard3";
import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";
import NewsTabs from "@/components/reusable/NewsTabs";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { allMenus, newsItems } from "@/utils/demoData";

// Utility to get category by href - Fixed to handle URL paths correctly
const getCategoryByHref = (path) => {
  // Remove leading slash if present for consistent comparison
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const category = allMenus.find((menu) => menu.href === normalizedPath);
  if (!category) {
    console.error(`Category not found for path: ${normalizedPath}`);
    // console.log(
    //   "Available menu hrefs:",
    //   allMenus.map((m) => m.href)
    // );
  }
  return category;
};
// console.log(
//       "Available menu hrefs:",
//       allMenus.map((m) => m.href)
//     );

// Helper function to extract category slug from full path
const extractCategoryFromPath = (pathname) => {
  const segments = pathname.split("/").filter(Boolean);
  return segments[0] || "";
};

// Helper function to extract subcategory slug from full path
const extractSubcategoryFromPath = (pathname) => {
  const segments = pathname.split("/").filter(Boolean);
  return segments[1] || "";
};

const CategoryPage = () => {
  const params = useParams();
  const location = useLocation();

  const categorySlug =
    params.category || extractCategoryFromPath(location.pathname);
  const subcategorySlug =
    params.subcategory || extractSubcategoryFromPath(location.pathname);

  // Convert slug back to menu href format (add leading slash and handle special cases)
  const categoryHref = categorySlug ? `/${categorySlug}` : "";

  const category = getCategoryByHref(categoryHref);

  // Convert category label to a normalized form for comparison
  const normalizeString = (str) => str.toLowerCase().replace(/[&\s]+/g, "-");

  // Filter articles based on category and optionally subcategory
  const filteredArticles = newsItems.filter((item) => {
    if (!category) return false;

    // Normalize both the item category and the category label for comparison
    const normalizedItemCategory = normalizeString(item.category);
    const normalizedCategoryLabel = normalizeString(category.label);

    const matchesCategory = normalizedItemCategory === normalizedCategoryLabel;

    // Handle subcategory matching
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

  // Use first 5 articles or fewer if not enough
  const articlesToShow = filteredArticles.slice(0, 5);
  console.log(articlesToShow);

  // Fallback if category not found
  if (!category) {
    return (
      <CommonWrapper>
        <CommonPadding>
          <PrimaryHeading title="Category Not Found" icon={false} />
          <p className="text-gray-500">
            The requested category "{categorySlug}" does not exist.
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
    <div>
      <CommonWrapper>
        <CommonPadding>
          <PrimaryHeading title={category.label} icon={false} />

          {/* Show message if no articles found */}
          {articlesToShow.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              <p>No articles found for this category.</p>
              <p className="text-sm mt-2">
                Looking for: Category "{category.label}"
                {subcategorySlug && ` → Subcategory "${subcategorySlug}"`}
              </p>
            </div>
          )}

          {/* Responsive Grid Layout */}
          {articlesToShow.length > 0 && (
            <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4">
              {/* 1 (top left) */}
              {articlesToShow[0] && (
                <div>
                  <NewsCardSecondary {...articlesToShow[0]} layout="right" />
                </div>
              )}

              {/* 2 (bottom left) */}
              {articlesToShow[1] && (
                <div className="lg:col-start-1 lg:row-start-2">
                  <NewsCardSecondary {...articlesToShow[1]} layout="right" />
                </div>
              )}

              {/* 3 (tall center) */}
              {articlesToShow[2] && (
                <div className="col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-2 lg:row-start-1">
                  <NewsCard3 {...articlesToShow[2]} />
                </div>
              )}

              {/* 4 (top right) */}
              {articlesToShow[3] && (
                <div className="lg:col-start-3 lg:row-start-1">
                  <NewsCardSecondary {...articlesToShow[3]} layout="left" />
                </div>
              )}

              {/* 5 (bottom right) */}
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
    </div>
  );
};

export default CategoryPage;
