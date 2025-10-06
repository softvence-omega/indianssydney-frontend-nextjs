"use client";

import CategorySelection from "@/components/article-input/CategorySelection";
import { useCreateNewArticleMutation } from "@/store/features/article/article.api";
import { useState } from "react";
import { ContentType, UploadFormData } from "./types";
import ArticlePreview from "./ArticlePreview";

export default function PublishContent() {
  const [createNewArticle] = useCreateNewArticleMutation();
  const initialFormData: UploadFormData = {
    contentType: "ARTICLE",
    title: "",
    subTitle: "",
    categoryId: "",
    subCategoryId: "",
    categorysslug: "",
    subcategorysslug: "",
    paragraph: "",
    image: null,
    video: null,
    audio: null,
    imageCaption: "",
    youtubeVideoUrl: "",
    videoThumbnail: null,
    shortQuote: "",
    tags: [],
    additionalContents: [],
  };

  // State
  const [formData, setFormData] = useState<UploadFormData>(initialFormData);
  const [step, setStep] = useState<
    "category" | "form" | "preview" | "submitted"
  >("category");

  // Handle category select
  const handleCategorySelect = (contentType: ContentType) => {
    setFormData((prev) => ({ ...prev, contentType }));
    setStep("form");
    console.log("Selected content type:", contentType);
  };

  // Handle form updates
  const handleUpdate = (updates: Partial<UploadFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    console.log("Form updated:", updates);
  };

  // Handle submit (go to preview)
  const handleFormSubmit = () => {
    setStep("preview");
  };

  // Handle publish
  const handlePublish = async () => {
    const uploadedData = new FormData(); // Remove `as any`
    try {
      // Convert tags array to comma-separated string if needed
      const tags = Array.isArray(formData.tags)
        ? formData.tags.join(",")
        : formData.tags;

      // Append fields to FormData
      uploadedData.append("contentType", formData.contentType || "");
      uploadedData.append("title", formData.title || "");
      uploadedData.append("subTitle", formData.subTitle || "");
      uploadedData.append("categoryId", formData.categoryId || "");
      uploadedData.append("subCategoryId", formData.subCategoryId || "");
      uploadedData.append("imageCaption", formData.imageCaption || "");
      uploadedData.append("youtubeVideoUrl", formData.youtubeVideoUrl || "");
      uploadedData.append("shortQuote", formData.shortQuote || "");
      uploadedData.append("paragraph", formData.paragraph || "");
      uploadedData.append("tags", tags || "");

      // Handle file uploads (ensure these are File objects)
      if (formData.image instanceof File) {
        uploadedData.append("image", formData.image);
      }
      if (formData.video instanceof File) {
        uploadedData.append("video", formData.video);
      }
      if (formData.audio instanceof File) {
        uploadedData.append("audio", formData.audio);
      }
      if (formData.videoThumbnail instanceof File) {
        uploadedData.append("videoThumbnail", formData.videoThumbnail);
      }

      // Handle additionalContents (if it’s an array or object, stringify if needed)
      if (formData.additionalContents) {
        uploadedData.append(
          "additionalFields",
          typeof formData.additionalContents === "object"
            ? JSON.stringify(formData.additionalContents)
            : formData.additionalContents
        );
      }
      console.log(uploadedData);
      // Call the API
      const result = await createNewArticle(uploadedData);
      console.log("API Response:", result);
      console.log("Form Data:", formData);

      // Reset form and update step
      setStep("submitted");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error publishing content:", error);
    }
  };

  // Handle back
  const handleBack = () => {
    if (step === "form") {
      setStep("category");
    } else if (step === "preview") {
      setStep("form");
    }
  };

  return (
    <div>
      <CategorySelection />
    </div>
  );
}
