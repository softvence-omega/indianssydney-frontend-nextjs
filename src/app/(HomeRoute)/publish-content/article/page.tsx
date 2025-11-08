"use client";

import { useCreateNewArticleMutation } from "@/store/features/article/article.api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ArticlePreview from "../ArticlePreview";
import { UploadFormData } from "../types";
import ArticleForm from "./ArticleForm";
import AustralianCanvasLoader from "@/components/reusable/AustralianCanvasLoader";

const Page = () => {
  const [createNewArticle, { isLoading }] = useCreateNewArticleMutation();
  const [step, setStep] = useState<1 | 2>(1);
  const router = useRouter();
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
  const [formData, setFormData] = useState<UploadFormData>(initialFormData);
  // update handler
  const handleUpdate = (updatedFields: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updatedFields }));
  };

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
      uploadedData.append("categorysslug", formData.categorysslug || "");
      uploadedData.append("subcategorysslug", formData.subcategorysslug || "");
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

      // Call the API
      const result = await createNewArticle(uploadedData);

      // Reset form and update step
      toast.success("Content published successfully!");
      router.push("/my-contents");

      setFormData(initialFormData);
    } catch (error) {
      console.error("Error publishing content:", error);
      router.push("/my-contents");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {isLoading ? (
        <div >
          {/* <HomePageLoader /> */}
           <AustralianCanvasLoader />
        </div>
      ) : (
        <>
          {step === 1 && (
            <ArticleForm
              formData={formData}
              onUpdate={handleUpdate}
              onSubmit={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <ArticlePreview
              formData={formData}
              onBack={() => setStep(1)}
              onPublish={handlePublish}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Page;
