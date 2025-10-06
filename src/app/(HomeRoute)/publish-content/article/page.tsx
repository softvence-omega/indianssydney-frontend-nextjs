"use client";

import { useState } from "react";
import ArticleForm from "./ArticleForm";
import ArticlePreview from "../ArticlePreview";
import { useCreateNewArticleMutation } from "@/store/features/article/article.api";
import { UploadFormData } from "../types";
import { toast } from "sonner";

const Page = () => {
  const [createNewArticle] = useCreateNewArticleMutation();
  const [step, setStep] = useState<1 | 2>(1);
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

  // publish function
  // const handlePublish = async () => {
  //   try {
  //     const payload = new FormData();
  //     Object.entries(formData).forEach(([key, value]) => {
  //       if (Array.isArray(value) || typeof value === "object") {
  //         payload.append(key, JSON.stringify(value));
  //       } else {
  //         payload.append(key, value as any);
  //       }
  //     });

  //     // Example API request
  //     const res = await fetch("/api/publish-article", {
  //       method: "POST",
  //       body: payload,
  //     });

  //     if (!res.ok) throw new Error("Failed to publish article");
  //     alert("🎉 Article published successfully!");
  //     setStep(1);
  //     setFormData({
  //       title: "",
  //       subTitle: "",
  //       categoryId: "",
  //       subCategoryId: "",
  //       categorysslug: "",
  //       subcategorysslug: "",
  //       imageCaption: "",
  //       paragraph: "",
  //       shortQuote: "",
  //       tags: [],
  //       contentType: "ARTICLE",
  //       additionalContents: [],
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     alert("❌ Something went wrong while publishing");
  //   }
  // };

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
      toast.success("Content published successfully!");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error publishing content:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {step === 1 && (
        <ArticleForm
          formData={formData}
          onUpdate={handleUpdate}
          onSubmit={() => setStep(2)}
          onBack={() => console.log("Go back to category page")}
        />
      )}

      {step === 2 && (
        // <Card className="max-w-4xl mx-auto bg-white p-6 shadow-sm rounded-none">
        //   <CardContent>
        //     <h1 className="text-4xl font-bold mb-2">{formData.title}</h1>
        //     <h2 className="text-xl text-gray-600 mb-4">{formData.subTitle}</h2>

        //     {formData.shortQuote && (
        //       <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-500 mb-4">
        //         {formData.shortQuote}
        //       </blockquote>
        //     )}

        //     {formData.imageCaption && (
        //       <p className="text-sm text-gray-500 mb-4">
        //         Caption: {formData.imageCaption}
        //       </p>
        //     )}

        //     <div className="text-gray-800 leading-relaxed whitespace-pre-line mb-6">
        //       {formData.paragraph}
        //     </div>

        //     {formData.additionalContents.map((field, i) => (
        //       <div key={i} className="mb-6">
        //         {field.type === "paragraph" && (
        //           <p className="text-gray-700">{field.value}</p>
        //         )}
        //         {field.type === "shortQuote" && (
        //           <blockquote className="italic border-l-4 border-gray-300 pl-4 text-gray-600">
        //             {field.value}
        //           </blockquote>
        //         )}
        //         {field.type === "image" && field.value && (
        //           <img
        //             src={field.value as string}
        //             alt=""
        //             className="rounded-lg w-full my-4"
        //           />
        //         )}
        //         {field.type === "video" && field.value && (
        //           <video controls className="w-full rounded-lg my-4">
        //             <source src={field.value as string} />
        //           </video>
        //         )}
        //         {field.type === "audio" && field.value && (
        //           <audio controls className="my-4">
        //             <source src={field.value as string} />
        //           </audio>
        //         )}
        //       </div>
        //     ))}

        //     <div className="flex justify-between mt-8">
        //       <Button
        //         variant="outline"
        //         className="rounded-none shadow-none"
        //         onClick={() => setStep(1)}
        //       >
        //         ← Back to Edit
        //       </Button>
        //       <Button
        //         className="bg-brick-red text-white rounded-none shadow-none"
        //         onClick={handlePublish}
        //       >
        //         🚀 Publish Article
        //       </Button>
        //     </div>
        //   </CardContent>
        // </Card>
        <ArticlePreview
          formData={formData}
          onBack={() => setStep(1)}
          onPublish={handlePublish}
        />
      )}
    </div>
  );
};

export default Page;
