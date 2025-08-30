// "use client";

// import ArticleDetailsForm from "@/components/article-input/ArticleDetailsForm";
// import CategorySelection from "@/components/article-input/CategorySelection";
// import { useState } from "react";

// export type ContentType = "article" | "video" | "podcast" | "live-event";

// export type AdditionalFieldType = "paragraph" | "quote" | "image" | "video";

// export interface AdditionalField {
//   type: AdditionalFieldType;
//   value: string | File | string[] | null;
// }

// export interface FormData {
//   id?: string;
//   contentType: ContentType | null;
//   category: string;
//   subCategory: string;
//   title: string;
//   subTitle: string;

//   audioFile: File | null;
//   image: File | null;
//   video: File | null;
//   imageCaption: string;
//   shortQuote: string;
//   paragraph: string;

//   tags: string[];
//   additionalFields: Record<string, AdditionalField>;

//   dateTimeSlot?: string;
//   about: string;

//   publishedAt?: string;
//   views?: number;
//   likes?: number;
//   comments?: number;
// }


// export interface DetailsData {
//   id?: string;
//   contentType: ContentType | null;
//   category: string;
//   subCategory: string;
//   title: string;
//   subTitle: string;

//   audioFile: string | null;
//   image: string | null;
//   video: string | null;
//   imageCaption: string;
//   shortQuote: string;
//   paragraph: string;

//   tags: string[];
//   additionalFields: Record<string, AdditionalField>;

//   dateTimeSlot?: string;
//   about: string;

//   publishedAt?: string;
//   views?: number;
//   likes?: number;
//   comments?: number;
// }

// const PublishContent = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState<FormData>({
//     contentType: null,
//     category: "",
//     subCategory: "",
//     title: "",
//     subTitle: "",
//     audioFile: null,
//     image: null,
//     video: null,
//     imageCaption: "",
//     shortQuote: "",
//     paragraph: "",
//     tags: [],
//     additionalFields: {},
//     about: "", // Initialize about field
//   });

//   const handleCategorySelect = (contentType: ContentType) => {
//     setFormData((prev) => ({ ...prev, contentType }));
//     setCurrentStep(2);
//     console.log("Selected content type:", contentType);
//   };

//   const handleFormUpdate = (updates: Partial<FormData>) => {
//     setFormData((prev) => {
//       const newData = { ...prev, ...updates };
//       console.log("Form data updated:", newData);
//       return newData;
//     });
//   };

//   const handleSubmit = () => {
//     console.log("Final form submission:", formData);
//     // Handle form submission logic here
//   };

//   const handleBack = () => {
//     setCurrentStep(1);
//   };

//   if (currentStep === 1) {
//     return <CategorySelection onSelect={handleCategorySelect} />;
//   }

//   return (
//     <ArticleDetailsForm
//       formData={formData}
//       onUpdate={handleFormUpdate}
//       onSubmit={handleSubmit}
//       onBack={handleBack}
//     />
//   );
// };

// export default PublishContent;



// app/(HomeRoute)/publish-content/page.tsx
"use client";

import { useState } from "react";

import { FormData } from "./types";
import ArticleDetailsForm from "@/lib/test";
import ArticlePreview from "./ArticlePreview";

export default function PublishContent() {
  // Initial form data
  const initialFormData: FormData = {
    contentType: "article",
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
    dateTimeSlot: "",
    tags: [],
    additionalFields: {},
  };

  // State to manage form data and mode
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [mode, setMode] = useState<"form" | "preview" | "submitted">("form");

  // Handle updates from the form
  const handleUpdate = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  // Handle form submission to show preview
  const handleFormSubmit = () => {
    setMode("preview");
  };

  // Handle final publish action
  const handlePublish = async () => {
    try {
      // Simulate API call to submit the content
      console.log("Submitting content:", formData);
      // Example: await fetch('/api/publish', { method: 'POST', body: JSON.stringify(formData) });

      setMode("submitted");
      // Optionally reset formData or redirect
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error submitting content:", error);
      // Handle error (e.g., show toast notification)
    }
  };

  // Handle back navigation (from preview to form or form to previous page)
  const handleBack = () => {
    if (mode === "preview") {
      setMode("form");
    } else if (mode === "form") {
      // Navigate back to a previous page (e.g., categories)
      console.log("Navigate back to categories");
      // Example: router.push('/categories');
    }
  };

  return (
    <div>
      {mode === "form" && (
        <ArticleDetailsForm
          formData={formData}
          onUpdate={handleUpdate}
          onSubmit={handleFormSubmit}
          onBack={handleBack}
        />
      )}
      {mode === "preview" && (
        <ArticlePreview
          formData={formData}
          onBack={handleBack}
          onPublish={handlePublish}
        />
      )}
      {mode === "submitted" && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Content Published!</h1>
            <p className="text-gray-600 mb-4">
              Your content has been successfully published.
            </p>
            <button
              onClick={() => setMode("form")}
              className="bg-brick-red text-white px-4 py-2 rounded"
            >
              Publish Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}