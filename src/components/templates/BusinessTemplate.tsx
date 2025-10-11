"use client";

import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
import Ad from "@/components/reusable/Ad";
import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";
import NewsTabs from "@/components/reusable/NewsTabs";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { newsItems } from "@/utils/demoData";
import {
  useGeContentBySubCaregorySlugQuery,
  useGetContentByCategorySlugQuery,
} from "@/store/features/article/article.api";
import NewsSlider from "../home/NewsCurrent/NewsSlider";
// import NewsSlider from "../home/NewsCurrent/NewsSlider";
// import { MenuItem } from "@/types";

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
  const {
    data: categoryData,
    isLoading: categorySlugLoading,
    isError: categorySlugError,
  } = useGetContentByCategorySlugQuery(
     category?.slug as string || "",
    { skip: !category?.slug }
  );

  console.log(category?.slug ,categoryData);


  // ✅ Fetch Subcategory Data
  const {
    data: subCategoryData,
    isLoading: subCategorySlugLoading,
    isError: subCategorySlugError,
  } = useGeContentBySubCaregorySlugQuery(
     subcategorySlug as string || "",
    { skip: !subcategorySlug }
  );
  // ✅ Handle loading/error
  if (categorySlugLoading || subCategorySlugLoading)
    return (
      <CommonWrapper>
        <CommonPadding>
          <p className="text-center text-gray-500 py-10">Loading content...</p>
        </CommonPadding>
      </CommonWrapper>
    );

  if (categorySlugError || subCategorySlugError)
    return (
      <CommonWrapper>
        <CommonPadding>
          <p className="text-center text-red-500 py-10">
            Failed to load content.
          </p>
        </CommonPadding>
      </CommonWrapper>
    );

  // ✅ Articles by subcategory (for tab links)
  const articlesBySubcategory =
    category?.subCategories?.map((submenu) => ({
      submenu: {
        ...submenu,
        href: `/${category.slug}/${submenu.subslug}`,
        label: submenu.subname,
      },
    })) || [];
  return (
    <CommonWrapper>
      <CommonPadding>
        <PrimaryHeading title={category?.name} icon={false} />
        {/* Empty State */}
        {!subcategorySlug && categoryData?.data?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <p className="text-2xl font-semibold text-accent-orange">
              No Content Found
            </p>
          </div>
        )}

        {/* Category grid */}
        {categoryData?.data?.length > 0 && (
          <div>
            <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4 xl:divide-x xl:divide-slight-border">
              {/* Main slider section */}
              <div className="xl:col-span-2 xl:pr-4">
                <NewsSlider items={categoryData?.data?.slice(0, 4)} />
              </div>

              {/* Secondary cards */}
              <div className="grid grid-cols-2 xl:grid-cols-1 gap-4">
                {categoryData?.data?.slice(0, 2).map((item: any) => (
                  <NewsCardSecondary
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    subTitle={item.subTitle}
                    paragraph={item.paragraph}
                    image={item.image}
                    category={item.name}
                    author={item.fullName}
                    publishedAt={new Date(item.createdAt).toLocaleDateString()}
                  />
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
            href: `/${category.slug}`,
          }}
          activeSubcategory={subcategorySlug}
          articlesBySubcategory={articlesBySubcategory}
          categoryArticles={categoryData?.data || []}
          subCategoryArticles={subCategoryData?.data || []} // ✅ pass subcategory content
        />
      </CommonPadding>
    </CommonWrapper>
  );
};

export default BusinessTemplate;
