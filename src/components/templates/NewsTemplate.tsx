// // "use client";

// // import CommonWrapper from "@/common/CommonWrapper";
// // import CommonPadding from "@/common/CommonPadding";
// // import Ad from "@/components/reusable/Ad";
// // import NewsCard3 from "@/components/reusable/NewsCard3";
// // import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";
// // import NewsTabs from "@/components/reusable/NewsTabs";
// // import PrimaryHeading from "@/components/reusable/PrimaryHeading";
// // import { newsItems } from "@/utils/demoData";
// // import {
// //   useGeContentBySubCaregorySlugQuery,
// //   useGetContentByCategorySlugQuery,
// // } from "@/store/features/article/article.api";

// // const normalizeString = (str: string) =>
// //   str?.toLowerCase().replace(/[&\s]+/g, "-");

// // interface SubCategory {
// //   id: string;
// //   subname: string;
// //   subslug: string;
// // }

// // interface Category {
// //   id: string;
// //   name: string;
// //   slug: string;
// //   tamplate: string;
// //   subCategories?: SubCategory[];
// // }

// // const NewsTemplate = ({
// //   category,
// //   subcategorySlug,
// // }: {
// //   category: Category;
// //   subcategorySlug: string;
// // }) => {
// //   // console.log(category, subcategorySlug);
// //   const {
// //     data: categoryData,
// //     isLoading: categorySlugLoading,
// //     isError: categorySlugError,
// //   } = useGetContentByCategorySlugQuery(
// //     { categorySlug: category?.slug as string },
// //     { skip: !category?.slug }
// //   );
// //   console.log("categoey", categoryData?.data?.[0]);

// //   const {
// //     data: subCategoryData,
// //     isLoading: subCategorySlugLoading,
// //     isError: subCategorySlugError,
// //   } = useGeContentBySubCaregorySlugQuery(
// //     { ContentsubCategorySlug: subcategorySlug as string },
// //     { skip: !subcategorySlug }
// //   );
// //   console.log("subcategory", subCategoryData);
// //   // ✅ Filter main category
// //   const categoryArticles = newsItems.filter(
// //     (item) => normalizeString(item.category) === normalizeString(category.name)
// //   );

// //   // ✅ Group by subcategory + construct href
// //   const articlesBySubcategory =
// //     (category?.subCategories || []).map((submenu) => {
// //       const subArticles = newsItems.filter(
// //         (item) =>
// //           normalizeString(item.category) === normalizeString(category.name) &&
// //           normalizeString(item.subcategory || "") ===
// //             normalizeString(submenu.subname)
// //       );

// //       return {
// //         submenu: {
// //           ...submenu,
// //           href: `/${category.slug}/${submenu.subslug}`, // 👈 ensure href is set
// //           label: submenu.subname,
// //         },
// //         subArticles,
// //       };
// //     }) || [];

// //   return (
// //     <CommonWrapper>
// //       <CommonPadding>
// //         <PrimaryHeading title={category.name} icon={false} />

// //         {/* Empty state */}
// //         {categoryData?.data?.length === 0 && (
// //           <div className="flex flex-col items-center justify-center h-[60vh]">
// //             <p className="text-2xl font-semibold text-accent-orange">
// //               No Content found
// //             </p>
// //           </div>
// //         )}
// //         {/* Category grid */}
// //         {categoryData?.data?.length > 0 && (
// //           <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4">
// //             {categoryData?.data?.[0] && (
// //               <NewsCardSecondary
// //                 id={categoryData?.data?.[0]?.id}
// //                 title={categoryData?.data?.[0]?.title}
// //                 subTitle={categoryData?.data?.[0]?.subTitle}
// //                 paragraph={categoryData?.data?.[0]?.paragraph}
// //                 image={categoryData?.data?.[0]?.image} // fallback if no image
// //                 category={categoryData?.data?.[0]?.name}
// //                 author={categoryData?.data?.[0]?.fullName}
// //                 publishedAt={new Date(
// //                   categoryData?.data?.[0]?.createdAt
// //                 ).toLocaleDateString()}
// //                 layout="right"
// //               />
// //             )}
// //             {categoryData?.data?.[1] && (
// //               <div className="lg:col-start-1 lg:row-start-2">
// //                 <NewsCardSecondary
// //                   id={categoryData?.data?.[1]?.id}
// //                   title={categoryData?.data?.[1]?.title}
// //                   subTitle={categoryData?.data?.[1]?.subTitle}
// //                   paragraph={categoryData?.data?.[1]?.paragraph}
// //                   image={categoryData?.data?.[1]?.image} // fallback if no image
// //                   category={categoryData?.data?.[1]?.name}
// //                   author={categoryData?.data?.[1]?.fullName}
// //                   publishedAt={new Date(
// //                     categoryData?.data?.[1]?.createdAt
// //                   ).toLocaleDateString()}
// //                   layout="right"
// //                 />
// //               </div>
// //             )}
// //             {categoryData?.data?.[2] && (
// //               <div className="col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-2 lg:row-start-1">
// //                 <NewsCard3
// //                   key={categoryData?.data?.[2]?.id}
// //                   id={categoryData?.data?.[2]?.id}
// //                   image={categoryData?.data?.[2]?.image}
// //                   tag={categoryData?.data?.[2]?.tags?.[0]}
// //                   title={categoryData?.data?.[2]?.title}
// //                   description={categoryData?.data?.[2]?.paragraph}
// //                   author={categoryData?.data?.[2]?.fullName}
// //                 />
// //               </div>
// //             )}
// //             {categoryData?.data?.[3] && (
// //               <div className="lg:col-start-3 lg:row-start-1">
// //                 <NewsCardSecondary
// //                   id={categoryData?.data?.[3]?.id}
// //                   title={categoryData?.data?.[3]?.title}
// //                   subTitle={categoryData?.data?.[3]?.subTitle}
// //                   paragraph={categoryData?.data?.[3]?.paragraph}
// //                   image={categoryData?.data?.[3]?.image} // fallback if no image
// //                   category={categoryData?.data?.[3]?.name}
// //                   author={categoryData?.data?.[3]?.fullName}
// //                   publishedAt={new Date(
// //                     categoryData?.data?.[3]?.createdAt
// //                   ).toLocaleDateString()}
// //                   layout="left"
// //                 />
// //               </div>
// //             )}
// //             {categoryData?.data?.[4] && (
// //               <div className="lg:col-start-1 lg:row-start-2">
// //                 <NewsCardSecondary
// //                   id={categoryData?.data?.[4]?.id}
// //                   title={categoryData?.data?.[4]?.title}
// //                   subTitle={categoryData?.data?.[4]?.subTitle}
// //                   paragraph={categoryData?.data?.[4]?.paragraph}
// //                   image={categoryData?.data?.[4]?.image} // fallback if no image
// //                   category={categoryData?.data?.[4]?.name}
// //                   author={categoryData?.data?.[4]?.fullName}
// //                   publishedAt={new Date(
// //                     categoryData?.data?.[4]?.createdAt
// //                   ).toLocaleDateString()}
// //                   layout="left"
// //                 />
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </CommonPadding>

// //       <Ad />

// //       <CommonPadding>
// //         <NewsTabs
// //           category={{
// //             ...category,
// //             href: `/${category.slug}`, // 👈 also give category its href
// //           }}
// //           activeSubcategory={subcategorySlug}
// //           articlesBySubcategory={articlesBySubcategory}
// //           categoryArticles={categoryArticles}
// //         />
// //       </CommonPadding>
// //     </CommonWrapper>
// //   );
// // };

// // export default NewsTemplate;

// "use client";

// import CommonWrapper from "@/common/CommonWrapper";
// import CommonPadding from "@/common/CommonPadding";
// import Ad from "@/components/reusable/Ad";
// import NewsCard3 from "@/components/reusable/NewsCard3";
// import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";
// import NewsTabs from "@/components/reusable/NewsTabs";
// import PrimaryHeading from "@/components/reusable/PrimaryHeading";
// import {
//   useGetContentByCategorySlugQuery,
//   useGeContentBySubCaregorySlugQuery, // ✅ Corrected name
// } from "@/store/features/article/article.api";

// interface SubCategory {
//   id: string;
//   subname: string;
//   subslug: string;
// }

// interface Category {
//   id: string;
//   name: string;
//   slug: string;
//   tamplate: string;
//   subCategories?: SubCategory[];
// }

// const NewsTemplate = ({
//   category,
//   subcategorySlug,
// }: {
//   category: Category;
//   subcategorySlug: string;
// }) => {
//   // ✅ Fetch Category Data
//   const {
//     data: categoryData,
//     isLoading: categorySlugLoading,
//     isError: categorySlugError,
//   } = useGetContentByCategorySlugQuery(
//     { categorySlug: category?.slug as string },
//     { skip: !category?.slug }
//   );

//   // ✅ Fetch Subcategory Data
//   const {
//     data: subCategoryData,
//     isLoading: subCategorySlugLoading,
//     isError: subCategorySlugError,
//   } = useGeContentBySubCaregorySlugQuery(
//     { ContentsubCategorySlug: subcategorySlug as string },
//     { skip: !subcategorySlug }
//   );

//   // ✅ Handle loading/error
//   if (categorySlugLoading || subCategorySlugLoading)
//     return (
//       <CommonWrapper>
//         <CommonPadding>
//           <p className="text-center text-gray-500 py-10">Loading content...</p>
//         </CommonPadding>
//       </CommonWrapper>
//     );

//   if (categorySlugError || subCategorySlugError)
//     return (
//       <CommonWrapper>
//         <CommonPadding>
//           <p className="text-center text-red-500 py-10">
//             Failed to load content.
//           </p>
//         </CommonPadding>
//       </CommonWrapper>
//     );

//   // ✅ Articles by subcategory (for tab links)
//   const articlesBySubcategory =
//     category?.subCategories?.map((submenu) => ({
//       submenu: {
//         ...submenu,
//         href: `/${category.slug}/${submenu.subslug}`,
//         label: submenu.subname,
//       },
//     })) || [];

//   return (
//     <CommonWrapper>
//       <CommonPadding>
//         <PrimaryHeading title={category.name} icon={false} />

//         {/* Empty State */}
//         {!subcategorySlug && categoryData?.data?.length === 0 && (
//           <div className="flex flex-col items-center justify-center h-[60vh]">
//             <p className="text-2xl font-semibold text-accent-orange">
//               No Content Found
//             </p>
//           </div>
//         )}

//         {/* Category Grid (only show if no subcategory active) */}
//         {!subcategorySlug && categoryData?.data?.length > 0 && (
//           <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4">
//             {categoryData?.data?.slice(0, 5).map((item: any, index: number) => (
//               <div
//                 key={item.id}
//                 className={
//                   index === 1
//                     ? "lg:col-start-1 lg:row-start-2"
//                     : index === 2
//                     ? "col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-2 lg:row-start-1"
//                     : index === 3
//                     ? "lg:col-start-3 lg:row-start-1"
//                     : index === 4
//                     ? "lg:col-start-1 lg:row-start-2"
//                     : ""
//                 }
//               >
//                 {index === 2 ? (
//                   <NewsCard3
//                     id={item.id}
//                     image={item.image}
//                     tag={item.tags?.[0]}
//                     title={item.title}
//                     description={item.paragraph}
//                     author={item.fullName}
//                   />
//                 ) : (
//                   <NewsCardSecondary
//                     id={item.id}
//                     title={item.title}
//                     subTitle={item.subTitle}
//                     paragraph={item.paragraph}
//                     image={item.image}
//                     category={item.name}
//                     author={item.fullName}
//                     publishedAt={new Date(
//                       item.createdAt
//                     ).toLocaleDateString()}
//                     layout={index % 2 === 0 ? "right" : "left"}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </CommonPadding>

//       <Ad />

//       <CommonPadding>
//         <NewsTabs
//           category={{
//             ...category,
//             href: `/${category.slug}`,
//           }}
//           activeSubcategory={subcategorySlug}
//           articlesBySubcategory={articlesBySubcategory}
//           categoryArticles={categoryData?.data || []}
//           subCategoryArticles={subCategoryData?.data || []}
//         />
//       </CommonPadding>
//     </CommonWrapper>
//   );
// };

// export default NewsTemplate;

"use client";

import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
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
    { categorySlug: category?.slug as string },
    { skip: !category?.slug }
  );

  const {
    data: subCategoryData,
    isLoading: subCategorySlugLoading,
    isError: subCategorySlugError,
  } = useGeContentBySubCaregorySlugQuery(
    { ContentsubCategorySlug: subcategorySlug as string },
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
