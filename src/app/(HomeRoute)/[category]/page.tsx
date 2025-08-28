"use client";

import { useParams, usePathname } from "next/navigation";
import CommonWrapper from "@/common/CommonWrapper";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { allMenus } from "@/utils/demoData";

import NewsTemplate from "@/components/templates/NewsTemplate";
import BusinessTemplate from "@/components/templates/BusinessTemplate";
import EducationTemplate from "@/components/templates/EducationTemplate";
import PodcastTemplate from "@/components/templates/PodcastTemplate";
import FoodTemplate from "@/components/templates/FoodTemplate";
import { MenuItem } from "@/types";

type TemplateKeys =
  | "NewsTemplate"
  | "BusinessTemplate"
  | "EducationTemplate"
  | "PodcastTemplate"
  | "FoodTemplate";
type TemplateProps = {
  category: MenuItem;
  subcategorySlug: string;
};

const templateMap: Record<TemplateKeys, React.FC<TemplateProps>> = {
  NewsTemplate,
  BusinessTemplate,
  EducationTemplate,
  PodcastTemplate,
  FoodTemplate,
};

const getCategoryByHref = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return allMenus.find((menu) => menu.href === normalizedPath);
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

  const categorySlug =
    params?.category || extractCategoryFromPath(pathname || "");
  const subcategorySlug =
    params?.subcategory || extractSubcategoryFromPath(pathname || "");

  const categoryHref = categorySlug ? `/${categorySlug}` : "";
  const category = getCategoryByHref(categoryHref);

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


  // choose template (default to NewsTemplate if none specified)
  const templateKey = (category.template ?? "NewsTemplate") as string;

  let Template: React.FC<TemplateProps>;
  if (templateKey in templateMap) {
    Template = templateMap[templateKey as TemplateKeys];
  } else {
    console.warn(
      `Template '${category.template}' not found. Falling back to NewsTemplate.`
    );
    Template = templateMap["NewsTemplate"];
  }

  return Template ? (
    <Template category={category} subcategorySlug={subcategorySlug} />
  ) : (
    <CommonWrapper>
      <PrimaryHeading title="Template Not Found" icon={false} />
      <p className="text-gray-500">
        No valid template found for this category.
      </p>
    </CommonWrapper>
  );
};

export default CategoryPage;
