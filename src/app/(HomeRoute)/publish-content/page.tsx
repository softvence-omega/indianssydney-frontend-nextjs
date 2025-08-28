"use client";

import ArticleDetailsForm from "@/components/article-input/ArticleDetailsForm";
import CategorySelection from "@/components/article-input/CategorySelection";
import { useState } from "react";

export type ContentType = "article" | "video" | "podcast" | "live-event";

export type AdditionalFieldType = "paragraph" | "quote" | "image" | "video";

export interface AdditionalField {
  type: AdditionalFieldType;
  value: string | File | string[] | null;
}

export interface FormData {
  id?: string;
  contentType: ContentType | null;
  category: string;
  subCategory: string;
  title: string;
  subTitle: string;

  audioFile: File | null;
  image: File | null;
  video: File | null;
  imageCaption: string;
  shortQuote: string;
  paragraph: string;

  tags: string[];
  additionalFields: Record<string, AdditionalField>;

  dateTimeSlot?: string;
  about: string;

  publishedAt?: string;
  views?: number;
  likes?: number;
  comments?: number;
}


export interface DetailsData {
  id?: string;
  contentType: ContentType | null;
  category: string;
  subCategory: string;
  title: string;
  subTitle: string;

  audioFile: string | null;
  image: string | null;
  video: string | null;
  imageCaption: string;
  shortQuote: string;
  paragraph: string;

  tags: string[];
  additionalFields: Record<string, AdditionalField>;

  dateTimeSlot?: string;
  about: string;

  publishedAt?: string;
  views?: number;
  likes?: number;
  comments?: number;
}

const PublishContent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    contentType: null,
    category: "",
    subCategory: "",
    title: "",
    subTitle: "",
    audioFile: null,
    image: null,
    video: null,
    imageCaption: "",
    shortQuote: "",
    paragraph: "",
    tags: [],
    additionalFields: {},
    about: "", // Initialize about field
  });

  const handleCategorySelect = (contentType: ContentType) => {
    setFormData((prev) => ({ ...prev, contentType }));
    setCurrentStep(2);
    console.log("Selected content type:", contentType);
  };

  const handleFormUpdate = (updates: Partial<FormData>) => {
    setFormData((prev) => {
      const newData = { ...prev, ...updates };
      console.log("Form data updated:", newData);
      return newData;
    });
  };

  const handleSubmit = () => {
    console.log("Final form submission:", formData);
    // Handle form submission logic here
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  if (currentStep === 1) {
    return <CategorySelection onSelect={handleCategorySelect} />;
  }

  return (
    <ArticleDetailsForm
      formData={formData}
      onUpdate={handleFormUpdate}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  );
};

export default PublishContent;
