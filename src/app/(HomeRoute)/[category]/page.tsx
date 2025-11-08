"use client";

import CommonWrapper from "@/common/CommonWrapper";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import BusinessTemplate from "@/components/templates/BusinessTemplate";
import EducationTemplate from "@/components/templates/EducationTemplate";
import NewsTemplate from "@/components/templates/NewsTemplate";
import PodcastTemplate from "@/components/templates/PodcastTemplate";
import dynamic from "next/dynamic";
import { useParams, usePathname } from "next/navigation";
import React from "react";
// import FoodTemplate from "@/components/templates/FoodTemplate";
import ErrorLoader from "@/common/ErrorLoader";
import { useGetAllCategoryQuery } from "@/store/features/category/category.api";
import AustralianCanvasLoader from "@/components/reusable/AustralianCanvasLoader";

type TemplateKeys =
  | "NewsTemplate"
  | "BusinessTemplate"
  | "EducationTemplate"
  | "PodcastTemplate";
// | "FoodTemplate";

type TemplateProps = {
  category: any;
  subcategorySlug: string;
};

const templateMap: Record<TemplateKeys, React.FC<TemplateProps>> = {
  NewsTemplate,
  BusinessTemplate,
  EducationTemplate,
  PodcastTemplate,
  // FoodTemplate,
};

const excludedComponents: Record<string, any> = {
  "live-events": dynamic(() => import("@/components/home/LiveEventsPage")),
  "video-podcast": dynamic(() => import("@/components/home/PodcastVideo"))
};


const extractCategoryFromPath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  return segments[0] || "";
};

const extractSubcategoryFromPath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  return segments[1] || "";
};

const CategoryPage = () => {
  const params = useParams<{ category?: string; subcategory?: string }>();
  const pathname = usePathname();

  const { data, isLoading, isError } = useGetAllCategoryQuery({});

  const categorySlug =
    params?.category || extractCategoryFromPath(pathname || "");
  const subcategorySlug =
    params?.subcategory || extractSubcategoryFromPath(pathname || "");

  if (isLoading) {
    return (
      <AustralianCanvasLoader />
      // <HomePageLoader />
    );
  }

  if (isError || !data?.data) {
    return <ErrorLoader />
  }

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
