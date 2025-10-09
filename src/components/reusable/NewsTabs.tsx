// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Article, MenuItem } from "@/types";
// import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";

// interface NewsTabsProps {
//   category: any;
//   activeSubcategory?: string;
//   articlesBySubcategory: {
//     submenu: { href: string; label: string };
//     subArticles: Article[];
//   }[];
//   categoryArticles: Article[];
// }

// const NewsTabs: React.FC<NewsTabsProps> = ({
//   category,
//   activeSubcategory,
//   articlesBySubcategory,
//   categoryArticles,
// }) => {
//   const pathname = usePathname();

//   return (
//     <div>
//       {/* Tabs */}
//       <div className="flex justify-center flex-wrap gap-4 mb-6 border-b border-[#EDEFF0]">
//         {/* All Tab */}
//         <Link
//           href={category.href}
//           className={`py-2 px-1 text-sm text-nowrap transition-colors duration-200 ${
//             !activeSubcategory
//               ? "text-accent-orange font-semibold border-b-2 border-accent-orange"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           All
//         </Link>

//         {/* Subcategory Tabs */}
//         {articlesBySubcategory.map(({ submenu }) => {
//           const subSlug = submenu.href.split("/").pop();
//           const isActive =
//             pathname === submenu.href || subSlug === activeSubcategory;

//           return (
//             <Link
//               key={submenu.href}
//               href={submenu.href}
//               className={`py-2 px-1 text-sm text-nowrap transition-colors duration-200 ${
//                 isActive
//                   ? "text-accent-orange font-semibold border-b-2 border-accent-orange"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               {submenu.label}
//             </Link>
//           );
//         })}
//       </div>

//       {/* Articles */}
//       <div className="space-y-10">
//         {/* Show All */}
//         {!activeSubcategory && (
//           <div>
//             {categoryArticles.length === 0 ? (
//               <p className="text-center text-gray-500 py-6">
//                 No articles found in {category.label}.
//               </p>
//             ) : (
//               <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
//                 {categoryArticles.map((article) => (
//                   <NewsCardSecondary
//                     key={article.id}
//                     {...article}
//                     layout="left"
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Show Subcategory */}
//         {articlesBySubcategory.map(({ submenu, subArticles }) => {
//           const subSlug = submenu.href.split("/").pop();
//           const isActive = subSlug === activeSubcategory;

//           if (!isActive) return null;

//           return (
//             <div key={submenu.href}>
//               {subArticles.length === 0 ? (
//                 <p className="text-center text-gray-500 py-6">
//                   No articles found for {submenu.label}.
//                 </p>
//               ) : (
//                 <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
//                   {subArticles.map((article) => (
//                     <NewsCardSecondary
//                       key={article.id}
//                       {...article}
//                       layout="right"
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default NewsTabs;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NewsCardSecondary from "@/components/reusable/NewsCardSecondary";

interface NewsTabsProps {
  category: any;
  activeSubcategory?: string;
  articlesBySubcategory: {
    submenu: { href: string; label: string };
  }[];
  categoryArticles: any[];
  subCategoryArticles: any[]; // ✅ New
}

const NewsTabs: React.FC<NewsTabsProps> = ({
  category,
  activeSubcategory,
  articlesBySubcategory,
  categoryArticles,
  subCategoryArticles,
}) => {
  const pathname = usePathname();

  console.log(subCategoryArticles)

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-6 border-b border-[#EDEFF0]">
        {/* All Tab */}
        <Link
          href={category.href}
          className={`py-2 px-1 text-sm text-nowrap transition-colors duration-200 ${
            !activeSubcategory
              ? "text-accent-orange font-semibold border-b-2 border-accent-orange"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          All
        </Link>

        {/* Subcategory Tabs */}
        {articlesBySubcategory?.map(({ submenu }) => {
          const subSlug = submenu.href.split("/").pop();
          const isActive =
            pathname === submenu.href || subSlug === activeSubcategory;

          return (
            <Link
              key={submenu?.href}
              href={submenu?.href}
              className={`py-2 px-1 text-sm text-nowrap transition-colors duration-200 ${
                isActive
                  ? "text-accent-orange font-semibold border-b-2 border-accent-orange"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {submenu.label}
            </Link>
          );
        })}
      </div>

      {/* Articles */}
      <div className="space-y-10">
        {/* ✅ Show All (Category) */}
        {!activeSubcategory && (
          <div>
            {categoryArticles?.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                No articles found in {category?.name}.
              </p>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryArticles?.map((article) => (
                  <NewsCardSecondary
                    key={article?.id}
                    id={article.id}
                    title={article.title}
                    subTitle={article.subTitle}
                    paragraph={article.paragraph}
                    image={article.image}
                    category={article.name}
                    author={article.fullName}
                    publishedAt={new Date(
                      article.createdAt
                    ).toLocaleDateString()}
                    layout="left"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ✅ Show Subcategory Articles */}
        {activeSubcategory && (
          <div>
            {subCategoryArticles?.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                No articles found in this subcategory.
              </p>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {subCategoryArticles?.map((article) => (
                  <NewsCardSecondary
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    subTitle={article.subTitle}
                    paragraph={article.paragraph}
                    image={article.image}
                    category={article.name}
                    author={article.fullName}
                    publishedAt={new Date(
                      article.createdAt
                    ).toLocaleDateString()}
                    layout="right"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsTabs;
