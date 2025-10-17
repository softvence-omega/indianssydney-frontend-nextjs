"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useEditContentMutation,
  useGetArticleDetailsQuery,
  useUploadFileIntoAWSMutation,
} from "@/store/features/article/article.api";
import { useGetAllCategoryQuery } from "@/store/features/category/category.api";
import { ArrowLeft, Plus, Upload, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ArticlePreview from "../../publish-content/ArticlePreview";
import {
  AdditionalField,
  AdditionalFieldType,
  UploadFormData,
} from "../../publish-content/types";

const EditArticle = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: articleData, isLoading } = useGetArticleDetailsQuery(id);
  const { data: categoriesData } = useGetAllCategoryQuery({});
  const [updateArticle, { isLoading: isUpdating }] = useEditContentMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uloadFileInAws] = useUploadFileIntoAWSMutation()

  const [step, setStep] = useState<1 | 2>(1);
  const [newTag, setNewTag] = useState("");
  const [additionalFieldType, setAdditionalFieldType] = useState<
    AdditionalFieldType | ""
  >("");
  const [uploadType, setUploadType] = useState<"image" | "audio" | "video">(
    "image"
  );
  const [formFileData, setFormFileData] = useState<{ file?: File }>({});
  const [uploading, setUploading] = useState(false);

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

  // Update formData when articleData is available
  useEffect(() => {
    if (articleData?.data) {
      const tags = Array.isArray(articleData.data.tags)
        ? articleData.data.tags
        : typeof articleData.data.tags === "string"
          ? articleData.data.tags.split(",").map((tag: string) => tag.trim())
          : [];

      setFormData({
        ...initialFormData,
        id: articleData.data.id ?? "",
        contentType: articleData.data.contentType ?? "ARTICLE",
        title: articleData.data.title ?? "",
        subTitle: articleData.data.subTitle ?? "",
        categoryId: articleData.data.categoryId ?? "",
        subCategoryId: articleData.data.subCategoryId ?? "",
        categorysslug: articleData.data.categorysslug ?? "",
        subcategorysslug: articleData.data.subcategorysslug ?? "",
        paragraph: articleData.data.paragraph ?? "",
        image: articleData.data.image ?? null,
        video: articleData.data.video ?? null,
        audio: articleData.data.audio ?? null,
        imageCaption: articleData.data.imageCaption ?? "",
        youtubeVideoUrl: articleData.data.youtubeVideoUrl ?? "",
        videoThumbnail: articleData.data.videoThumbnail ?? null,
        shortQuote: articleData.data.shortQuote ?? "",
        tags,
        additionalContents: articleData.data.additionalContents ?? [],
      });
    }
  }, [articleData]);

  const categories = categoriesData?.data || [];
  const selectedCategory = categories.find(
    (cat: any) => cat.id === formData.categoryId
  );
  const predefinedTags = ["React", "JavaScript", "TypeScript", "Node.js", "AI"];
  const additionalFieldTypes: AdditionalFieldType[] = [
    "paragraph",
    "shortQuote",
    "image",
    "video",
    "audio",
  ];

  // Tag Handlers
  const handleTagAdd = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setNewTag("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Additional Field Handlers
  const handleAddAdditionalField = () => {
    if (additionalFieldType) {
      const newField: AdditionalField = {
        type: additionalFieldType,
        value:
          additionalFieldType === "image" ||
            additionalFieldType === "video" ||
            additionalFieldType === "audio"
            ? null
            : "",
      };
      setFormData((prev) => ({
        ...prev,
        additionalContents: [...prev.additionalContents, newField],
      }));
      setAdditionalFieldType("");
    }
  };

  const handleAdditionalFieldUpdate = (
    index: number,
    value: string | File | null
  ) => {
    const updatedFields = [...formData.additionalContents];
    updatedFields[index] = { ...updatedFields[index], value };
    setFormData((prev) => ({ ...prev, additionalContents: updatedFields }));
  };

  const handleAdditionalFieldFile = async (
    index: number,
    files: FileList | null
  ) => {
    const file = files ? files[0] : null;
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await uloadFileInAws(formData);
      if (!res) throw new Error("Upload failed");
      handleAdditionalFieldUpdate(index, (res as any)?.s3Url);
      toast.success(`${file.type.split("/")[0]} uploaded successfully!`);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveAdditionalField = (index: number) => {
    const updatedFields = formData.additionalContents.filter(
      (_: any, i: number) => i !== index
    );
    setFormData((prev) => ({ ...prev, additionalContents: updatedFields }));
  };

  const handleDynamicFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      setFormFileData({ file: files[0] });
    }
  };

  // Update Handler
  const handleUpdateArticle = async () => {
    const uploadedData = new FormData();
    try {
      const tags = Array.isArray(formData.tags)
        ? formData.tags.join(",")
        : formData.tags;

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

      if (formData.image instanceof File) {
        uploadedData.append("image", formData.image);
      } else if (typeof formData.image === "string") {
        uploadedData.append("image", formData.image);
      }
      if (formData.video instanceof File) {
        uploadedData.append("video", formData.video);
      } else if (typeof formData.video === "string") {
        uploadedData.append("video", formData.video);
      }
      if (formData.audio instanceof File) {
        uploadedData.append("audio", formData.audio);
      } else if (typeof formData.audio === "string") {
        uploadedData.append("audio", formData.audio);
      }
      if (formData.videoThumbnail instanceof File) {
        uploadedData.append("videoThumbnail", formData.videoThumbnail);
      } else if (typeof formData.videoThumbnail === "string") {
        uploadedData.append("videoThumbnail", formData.videoThumbnail);
      }
      if (formData.additionalContents) {
        uploadedData.append(
          "additionalFields",
          typeof formData.additionalContents === "object"
            ? JSON.stringify(formData.additionalContents)
            : formData.additionalContents
        );
      }

      const result = await updateArticle({ id, data: uploadedData });
      if ("error" in result) throw new Error("API call failed");
      toast.success("Article updated successfully!");
      router.push("/my-contents");
    } catch (error) {
      console.error("Error updating article:", error);
      toast.error("Failed to update article.");
    }
  };

  const renderAdditionalFieldInput = (
    field: AdditionalField,
    index: number
  ) => {
    if (["image", "video", "audio"].includes(field.type)) {
      return (
        <div className="border border-dashed border-gray-300 p-4 rounded-none">
          <input
            type="file"
            accept={
              field.type === "image"
                ? "image/*"
                : field.type === "video"
                  ? "video/*"
                  : "audio/*"
            }
            onChange={(e) => handleAdditionalFieldFile(index, e.target.files)}
            className="hidden rounded-none"
            id={`file-input-${index}`}
            disabled={uploading}
          />
          <label
            htmlFor={`file-input-${index}`}
            className="flex flex-col items-center cursor-pointer"
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-2">
              {field.value ? `Uploaded ${field.type}` : `Upload ${field.type}`}
            </p>
            <Button variant="outline" size="sm" disabled={uploading}>
              📎 Upload
            </Button>
          </label>
          {field.value && typeof field.value === "string" && (
            <p className="text-sm text-gray-500 mt-2">Current: {field.value}</p>
          )}
        </div>
      );
    }
    return (
      <Input
        placeholder={`Enter ${field.type}`}
        className="rounded-none shadow-none"
        value={typeof field.value === "string" ? field.value : ""}
        onChange={(e) => handleAdditionalFieldUpdate(index, e.target.value)}
      />
    );
  };

  const acceptMap = {
    image: "image/*",
    audio: "audio/*",
    video: "video/*",
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (!articleData?.data)
    return <div className="text-center py-10">Article not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {isUpdating ? (
        <div>Loading...</div>
      ) : (
        <div>
          {step === 1 && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  className="mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to My Contents
                </Button>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Edit Article
                </h1>
                <p className="text-gray-600">Update your article details</p>
              </div>

              <Card className="mb-4 rounded-none shadow-none">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Choose Category *
                      </Label>
                      <Select
                        value={formData.categoryId}
                        onValueChange={(value) => {
                          const selectedCat = categories.find(
                            (c: any) => c.id === value
                          );
                          setFormData((prev) => ({
                            ...prev,
                            categoryId: value,
                            categorysslug: selectedCat?.slug || "",
                            subCategoryId: "",
                            subcategorysslug: "",
                          }));
                        }}
                      >
                        <SelectTrigger className="w-full rounded-none shadow-none">
                          <SelectValue placeholder="Choose Category" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          {categories?.map((cat: any) => (
                            <SelectItem
                              key={cat.id}
                              value={cat.id}
                              className="rounded-none"
                            >
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Choose Sub-Category *
                      </Label>
                      <Select
                        value={formData.subCategoryId}
                        onValueChange={(value) => {
                          const selectedSubCat =
                            selectedCategory?.subCategories?.find(
                              (s: any) => s.id === value
                            );
                          setFormData((prev) => ({
                            ...prev,
                            subCategoryId: value,
                            subcategorysslug: selectedSubCat?.subslug || "",
                          }));
                        }}
                        disabled={!formData.categoryId}
                      >
                        <SelectTrigger className="w-full rounded-none shadow-none">
                          <SelectValue placeholder="Choose Sub-Category" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          {selectedCategory?.subCategories?.length ? (
                            selectedCategory.subCategories?.map(
                              (subCat: any) => (
                                <SelectItem
                                  key={subCat.id}
                                  value={subCat.id}
                                  className="rounded-none"
                                >
                                  {subCat.subname}
                                </SelectItem>
                              )
                            )
                          ) : (
                            <SelectItem value="not-found" disabled>
                              🚫 Subcategory not found
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-4 rounded-none shadow-none">
                <CardHeader>
                  <CardTitle>Edit Article Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>1. Title *</Label>
                    <Input
                      className="w-full rounded-none shadow-none mt-2"
                      placeholder="Enter title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>2. Sub-Title *</Label>
                    <Input
                      className="w-full rounded-none shadow-none mt-2"
                      placeholder="Enter Sub-title"
                      value={formData.subTitle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          subTitle: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>3. File Type</Label>
                    <Select
                      onValueChange={(val) =>
                        setUploadType(val as "image" | "audio" | "video")
                      }
                    >
                      <SelectTrigger className="w-[200px] rounded-none mt-2 shadow-none">
                        <SelectValue placeholder="Choose type..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                    {uploadType && (
                      <div className="mt-3 border border-dashed border-gray-300 p-4 text-center">
                        <input
                          type="file"
                          accept={acceptMap[uploadType]}
                          ref={fileInputRef}
                          className="hidden"
                          id={`${uploadType}-upload`}
                          onChange={(e) =>
                            handleDynamicFileUpload(e.target.files)
                          }
                          disabled={uploading}
                        />
                        <label
                          htmlFor={`${uploadType}-upload`}
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 mb-2">
                            {formFileData.file
                              ? formFileData.file.name
                              : formData[uploadType]
                                ? `Current ${uploadType}: ${formData[uploadType]}`
                                : `Drag & Drop ${uploadType}`}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={uploading}
                          >
                            📎 Upload
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>4. File Caption</Label>
                    <Input
                      className="w-full rounded-none shadow-none mt-2"
                      placeholder="Create a caption for your file"
                      value={formData.imageCaption}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          imageCaption: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>5. Short Quote</Label>
                    <Input
                      className="w-full rounded-none shadow-none mt-2"
                      placeholder="Create a Short Quote for the article"
                      value={formData.shortQuote}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shortQuote: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>6. Paragraph *</Label>
                    <Textarea
                      className="w-full rounded-none shadow-none mt-2"
                      placeholder="Create a Paragraph for your file"
                      value={formData.paragraph}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          paragraph: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      className="bg-gray-800 text-white text-sm rounded-none shadow-none"
                      disabled
                    >
                      🤖 Generate tags by AI
                    </Button>
                  </div>
                  <div>
                    <Label>7. Tags *</Label>
                    <div className="flex flex-wrap gap-2 my-2">
                      {formData.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-orange-100 text-orange-800"
                        >
                          {tag}
                          <button
                            onClick={() => handleTagRemove(tag)}
                            className="ml-2 text-orange-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {predefinedTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => handleTagAdd(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add custom tag"
                        className="rounded-none shadow-none"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleTagAdd(newTag)
                        }
                      />
                      <Button
                        className="rounded-none shadow-none"
                        onClick={() => handleTagAdd(newTag)}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  {formData.additionalContents.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Additional Fields:
                      </h3>
                      {formData.additionalContents.map(
                        (field: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 border"
                          >
                            <div className="flex-1">
                              <Label className="mb-2">{field.type}</Label>
                              {renderAdditionalFieldInput(field, index)}
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="rounded-none"
                              onClick={() => handleRemoveAdditionalField(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Select
                      value={additionalFieldType}
                      onValueChange={(v) =>
                        setAdditionalFieldType(v as AdditionalFieldType)
                      }
                    >
                      <SelectTrigger className="flex-1 rounded-none shadow-none">
                        <SelectValue placeholder="Select field type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        {additionalFieldTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      className="rounded-none bg-brick-red"
                      onClick={handleAddAdditionalField}
                      disabled={!additionalFieldType}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Field
                    </Button>
                  </div>
                  <div className="pt-6 flex justify-end gap-4">
                    <Button
                      variant="outline"
                      onClick={() => router.back()}
                      className="rounded-none shadow-none"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setStep(2)}
                      className="bg-brick-red text-white px-8 rounded-none shadow-none"
                    >
                      Preview Update →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {step === 2 && (
            <ArticlePreview
              formData={formData}
              onBack={() => setStep(1)}
              onPublish={handleUpdateArticle}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EditArticle;
