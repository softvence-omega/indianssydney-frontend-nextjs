"use client";

import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import Ad from "@/components/reusable/Ad";
import NewsCard3 from "@/components/reusable/NewsCard3";
import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";
import NewsTabs from "@/components/reusable/NewsTabs";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import {
  useGeContentBySubCaregorySlugQuery,
  useGetContentByCategorySlugQuery,
} from "@/store/features/article/article.api";

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

const NewsTemplate = ({
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

  const {
    data: subCategoryData,
    isLoading: subCategorySlugLoading,
    isError: subCategorySlugError,
  } = useGeContentBySubCaregorySlugQuery(
    subcategorySlug as string || "",
    { skip: !subcategorySlug }
  );

  console.log("subCategoryData:", subCategoryData); // ✅ Debug

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

  const articlesBySubcategory =
    category?.subCategories?.map((submenu) => ({
      submenu: {
        ...submenu,
        href: `/${category.slug}/${submenu.subslug}`,
        label: submenu.subname,
      },
    })) || [];

  const subCategoryArticles = subCategoryData?.data
    ? subCategoryData?.data
    : [];
  return (
    <CommonWrapper>
      <CommonPadding>
        <PrimaryHeading title={category.name} icon={false} />

        {!subcategorySlug && categoryData?.data?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <p className="text-2xl font-semibold text-accent-orange">
              No Content Found
            </p>
          </div>
        )}

        {!subcategorySlug && categoryData?.data?.length > 0 && (
          <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4">
            {categoryData?.data?.slice(0, 5).map((item: any, index: number) => (
              <div
                key={item.id}
                className={
                  index === 1
                    ? "lg:col-start-1 lg:row-start-2"
                    : index === 2
                      ? "col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-2 lg:row-start-1"
                      : index === 3
                        ? "lg:col-start-3 lg:row-start-1"
                        : index === 4
                          ? "lg:col-start-1 lg:row-start-2"
                          : ""
                }
              >
                {index === 2 ? (
                  <NewsCard3
                    id={item.id}
                    image={item.image}
                    tag={item.tags?.[0]}
                    title={item.title}
                    description={item.paragraph}
                    author={item.fullName}
                  />
                ) : (
                  <NewsCardSecondary
                    id={item.id}
                    title={item.title}
                    subTitle={item.subTitle}
                    paragraph={item.paragraph}
                    image={item.image}
                    category={item.name}
                    author={item.fullName}
                    publishedAt={new Date(item.createdAt).toLocaleDateString()}
                    layout={index % 2 === 0 ? "right" : "left"}
                  />
                )}
              </div>
            ))}
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
          subCategoryArticles={subCategoryArticles}
        />
      </CommonPadding>
    </CommonWrapper>
  );
};

export default NewsTemplate;
