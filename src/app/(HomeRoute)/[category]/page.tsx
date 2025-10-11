// "use client";

// import { useParams, usePathname } from "next/navigation";
// import CommonWrapper from "@/common/CommonWrapper";
// import PrimaryHeading from "@/components/reusable/PrimaryHeading";
// import NewsTemplate from "@/components/templates/NewsTemplate";
// import BusinessTemplate from "@/components/templates/BusinessTemplate";
// import EducationTemplate from "@/components/templates/EducationTemplate";
// import PodcastTemplate from "@/components/templates/PodcastTemplate";
// import FoodTemplate from "@/components/templates/FoodTemplate";
// import { useGetAllCategoryQuery } from "@/store/features/category/category.api";

// type TemplateKeys =
//   | "NewsTemplate"
//   | "BusinessTemplate"
//   | "EducationTemplate"
//   | "PodcastTemplate"
//   | "FoodTemplate";

// type TemplateProps = {
//   category: any;
//   subcategorySlug: string;
// };

// const templateMap: Record<TemplateKeys, React.FC<TemplateProps>> = {
//   NewsTemplate,
//   BusinessTemplate,
//   EducationTemplate,
//   PodcastTemplate,
//   FoodTemplate,
// };

// const extractCategoryFromPath = (pathname: string) => {
//   const segments = pathname.split("/").filter(Boolean);
//   return segments[0] || "";
// };

// const extractSubcategoryFromPath = (pathname: string) => {
//   const segments = pathname.split("/").filter(Boolean);
//   return segments[1] || "";
// };

// const CategoryPage = () => {
//   const params = useParams<{ category?: string; subcategory?: string }>();
//   const pathname = usePathname();

//   // fetch all categories from API
//   const { data, isLoading, isError } = useGetAllCategoryQuery({});

//   const categorySlug =
//     params?.category || extractCategoryFromPath(pathname || "");
//   const subcategorySlug =
//     params?.subcategory || extractSubcategoryFromPath(pathname || "");

//   if (isLoading) {
//     return (
//       <CommonWrapper>
//         <PrimaryHeading title="Loading Categories..." icon={false} />
//       </CommonWrapper>
//     );
//   }

//   if (isError || !data?.data) {
//     return (
//       <CommonWrapper>
//         <PrimaryHeading title="Error Loading Categories" icon={false} />
//         <p className="text-gray-500">Something went wrong.</p>
//       </CommonWrapper>
//     );
//   }

//   // Find category dynamically from API
//   const categories = data?.data;
//   const category = categories.find((c: any) => c.slug === categorySlug);

//   if (!category) {
//     return (
//       <CommonWrapper>
//         <PrimaryHeading title="Category Not Found" icon={false} />
//         <p className="text-gray-500">
//           The requested category `{categorySlug}` does not exist.
//         </p>
//       </CommonWrapper>
//     );
//   }

//   // Check if subcategory exists
//   const subcategory =
//     category.subCategories?.find(
//       (sub: any) => sub.subslug === subcategorySlug
//     ) || null;

//   // Choose template (fallback to NewsTemplate if missing)
//   const templateKey = (category.tamplate ?? "NewsTemplate") as TemplateKeys;
//   const Template =
//     templateMap[templateKey as TemplateKeys] || templateMap["NewsTemplate"];

//   return <Template category={category} subcategorySlug={subcategorySlug} />;
// };

// export default CategoryPage;

"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useParams, usePathname } from "next/navigation";
import CommonWrapper from "@/common/CommonWrapper";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import NewsTemplate from "@/components/templates/NewsTemplate";
import BusinessTemplate from "@/components/templates/BusinessTemplate";
import EducationTemplate from "@/components/templates/EducationTemplate";
import PodcastTemplate from "@/components/templates/PodcastTemplate";
import FoodTemplate from "@/components/templates/FoodTemplate";
import { useGetAllCategoryQuery } from "@/store/features/category/category.api";

// ------------------------------
// 1️⃣ Template Map for Normal Categories
// ------------------------------
type TemplateKeys =
  | "NewsTemplate"
  | "BusinessTemplate"
  | "EducationTemplate"
  | "PodcastTemplate"
  | "FoodTemplate";

type TemplateProps = {
  category: any;
  subcategorySlug: string;
};

const templateMap: Record<TemplateKeys, React.FC<TemplateProps>> = {
  NewsTemplate,
  BusinessTemplate,
  EducationTemplate,
  PodcastTemplate,
  FoodTemplate,
};

// ------------------------------
// 2️⃣ Excluded Routes with Custom Components
// ------------------------------
const excludedComponents: Record<string, any> = {
  // Example: "/category" → Custom component for that category
  // events: dynamic(() => import("@/components/home/PodcastVideo")),
  "live-events": dynamic(() => import("@/components/home/LiveEventsPage")),

  // // Example: "/category/subcategory" → Custom component for that subcategory
  // "business/special": dynamic(
  //   () => import("@/components/custom/BusinessSpecialPage")
  // ),

  // "education/premium": dynamic(
  //   () => import("@/components/custom/EducationPremiumPage")
  // ),
};

// ------------------------------
// 3️⃣ Helper Functions
// ------------------------------
const extractCategoryFromPath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  return segments[0] || "";
};

const extractSubcategoryFromPath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  return segments[1] || "";
};

// ------------------------------
// 4️⃣ Main Category Page Component
// ------------------------------
const CategoryPage = () => {
  const params = useParams<{ category?: string; subcategory?: string }>();
  const pathname = usePathname();

  const { data, isLoading, isError } = useGetAllCategoryQuery({});

  const categorySlug =
    params?.category || extractCategoryFromPath(pathname || "");
  const subcategorySlug =
    params?.subcategory || extractSubcategoryFromPath(pathname || "");

  // ------------------------------
  // 5️⃣ Loading & Error Handling
  // ------------------------------
  if (isLoading) {
    return (
      <CommonWrapper>
        <PrimaryHeading title="Loading Categories..." icon={false} />
      </CommonWrapper>
    );
  }

  if (isError || !data?.data) {
    return (
      <CommonWrapper>
        <PrimaryHeading title="Error Loading Categories" icon={false} />
        <p className="text-gray-500">Something went wrong.</p>
      </CommonWrapper>
    );
  }

  // ------------------------------
  // 6️⃣ Handle Excluded Routes
  // ------------------------------
  const routeKey = subcategorySlug
    ? `${categorySlug}/${subcategorySlug}`
    : categorySlug;

  const CustomComponent = excludedComponents[routeKey];

  if (CustomComponent) {
    return (
      <CustomComponent
        categorySlug={categorySlug}
        subcategorySlug={subcategorySlug}
      />
    );
  }

  // ------------------------------
  // 7️⃣ Default Category Template Rendering
  // ------------------------------
  const categories = data?.data;
  const category = categories.find((c: any) => c.slug === categorySlug);

  if (!category) {
    return (
      <CommonWrapper>
        <PrimaryHeading title="Category Not Found" icon={false} />
        <p className="text-gray-500">
          The requested category `{categorySlug}` does not exist.
        </p>
      </CommonWrapper>
    );
  }

  const templateKey = (category.tamplate ?? "NewsTemplate") as TemplateKeys;
  const Template =
    templateMap[templateKey as TemplateKeys] || templateMap["NewsTemplate"];

  return <Template category={category} subcategorySlug={subcategorySlug} />;
};

export default CategoryPage;
