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
import uploadFileInAws from "@/utils/fileUploader";
import { ArrowLeft, Plus, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import type {
  AdditionalField,
  AdditionalFieldType,
  UploadFormData,
} from "../../app/(HomeRoute)/publish-content/types";
import { useGetAllCategoryQuery } from "@/store/features/category/category.api";

interface ArticleDetailsFormProps {
  formData: UploadFormData;
  onUpdate: (updates: Partial<UploadFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const ArticleDetailsForm = ({
  formData,
  onUpdate,
  onSubmit,
  onBack,
}: ArticleDetailsFormProps) => {
  const { data, isLoading, isError } = useGetAllCategoryQuery({});
  const [newTag, setNewTag] = useState("");
  const [additionalFieldType, setAdditionalFieldType] = useState<
    AdditionalFieldType | ""
  >("");
  const [uploadType, setUploadType] = useState<
    "image" | "audio" | "video" | ""
  >("");
  const [formFileData, setFormFileData] = useState<{ file?: File }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = data?.data || [];
  const selectedCategory = categories.find(
    (cat: any) => cat.id === formData.categoryId
  );

  const predefinedTags = [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "AI",
  ];

  const additionalFieldTypes: AdditionalFieldType[] = [
    "paragraph",
    "shortQuote",
    "image",
    "video",
    "audio",
  ];

  const handleTagAdd = (tag: string) => {
    if (tag && !formData?.tags?.includes(tag)) {
      onUpdate({ tags: [...formData.tags, tag] });
    }
    setNewTag("");
  };

  const handleTagRemove = (tagToRemove: string) => {
    onUpdate({ tags: formData.tags.filter((tag) => tag !== tagToRemove) });
  };

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
        // order: formData.additionalContents.length,
      };
      onUpdate({
        additionalContents: [...formData.additionalContents, newField],
      });
      setAdditionalFieldType("");
    }
  };

  const handleAdditionalFieldUpdate = (
    index: number,
    value: string | File | null
  ) => {
    const updatedFields = [...formData.additionalContents];
    updatedFields[index] = { ...updatedFields[index], value };
    onUpdate({ additionalContents: updatedFields });
  };

  const handleAdditionalFieldFile = async (
    index: number,
    files: FileList | null
  ) => {
    const file = files ? files[0] : null;
    if (!file) return;

    try {
      const res = await uploadFileInAws(file);
      console.log("File uploaded:", res);
      handleAdditionalFieldUpdate(index, res as string);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleRemoveAdditionalField = (index: number) => {
    const updatedFields = formData.additionalContents.filter(
      (_, i) => i !== index
    );
    onUpdate({ additionalContents: updatedFields });
  };

  const renderAdditionalFieldInput = (
    field: AdditionalField,
    index: number
  ) => {
    if (
      field.type === "image" ||
      field.type === "video" ||
      field.type === "audio"
    ) {
      return (
        <div className="border border-dashed border-gray-300 p-4">
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
            className="hidden"
            id={`file-input-${index}`}
          />
          <label
            htmlFor={`file-input-${index}`}
            className="flex flex-col items-center cursor-pointer"
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-2">
              {field.value ? `Uploaded ${field.type}` : `Upload ${field.type}`}
            </p>
            <Button variant="outline" size="sm">
              📎 Upload
            </Button>
          </label>
        </div>
      );
    }

    return (
      <Input
        placeholder={`Enter ${field.type?.toLowerCase()}`}
        value={typeof field.value === "string" ? field.value : ""}
        className="w-full rounded-none shadow-none"
        onChange={(e) => handleAdditionalFieldUpdate(index, e.target.value)}
      />
    );
  };

  const getHeaderText = () => {
    switch (formData.contentType) {
      case "VIDEO":
        return "Publish Video:";
      case "PODCAST":
        return "Publish Podcast:";
      default:
        return "Publish Article:";
    }
  };

  const handleDynamicFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      setFormFileData({ file: files[0] });
      onUpdate({ [uploadType]: files[0] });
    }
  };

  const acceptMap = {
    image: "image/*",
    audio: "audio/*",
    video: "video/*",
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getHeaderText()}
          </h1>
          <p className="text-gray-600">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <Card className="mb-4 rounded-none shadow-none">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Category Selection */}
              <div>
                <Label
                  htmlFor="category"
                  className="text-sm font-medium mb-2 block"
                >
                  Choose Category *
                </Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => {
                    const selectedCat = categories.find(
                      (c: any) => c.id === value
                    );
                    onUpdate({
                      categoryId: value,
                      categorysslug: selectedCat?.slug || "",
                      subCategoryId: "",
                      subcategorysslug: "",
                    });
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

              {/* Sub Category Selection */}
              <div>
                <Label
                  htmlFor="subCategory"
                  className="text-sm font-medium mb-2 block"
                >
                  Choose Sub-Category *
                </Label>
                <Select
                  value={formData.subCategoryId}
                  onValueChange={(value) => {
                    const selectedSubCat =
                      selectedCategory?.subCategories?.find(
                        (s: any) => s.id === value
                      );
                    onUpdate({
                      subCategoryId: value,
                      subcategorysslug: selectedSubCat?.subslug || "",
                    });
                  }}
                  disabled={!formData.categoryId}
                >
                  <SelectTrigger className="w-full rounded-none shadow-none">
                    <SelectValue placeholder="Choose Sub-Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {selectedCategory?.subCategories?.length ? (
                      selectedCategory.subCategories?.map((subCat: any) => (
                        <SelectItem
                          key={subCat.id}
                          value={subCat.id}
                          className="rounded-none"
                        >
                          {subCat.subname}
                        </SelectItem>
                      ))
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
            <CardTitle>Submit Your Article Details:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-sm font-medium mb-2 block">
                1. Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                className="w-full rounded-none shadow-none"
                placeholder="What is your title for this content"
                value={formData.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry
              </p>
            </div>

            {/* Sub-Title */}
            <div>
              <Label
                htmlFor="subTitle"
                className="text-sm font-medium mb-2 block"
              >
                2. Sub-Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subTitle"
                className="w-full rounded-none shadow-none"
                placeholder="What is sub title for your content"
                value={formData.subTitle}
                onChange={(e) => onUpdate({ subTitle: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry
              </p>
            </div>

            {/* Dynamic File Upload */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                3. Select a file type
              </Label>
              <Select
                onValueChange={(val) =>
                  setUploadType(val as "image" | "audio" | "video")
                }
              >
                <SelectTrigger className="max-w-[200px] mb-4 rounded-none shadow-none">
                  <SelectValue placeholder="Choose type..." />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="image" className="rounded-none">
                    Image
                  </SelectItem>
                  <SelectItem value="audio" className="rounded-none">
                    Audio
                  </SelectItem>
                  <SelectItem value="video" className="rounded-none">
                    Video
                  </SelectItem>
                </SelectContent>
              </Select>

              {uploadType && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Upload{" "}
                    {uploadType.charAt(0).toUpperCase() + uploadType.slice(1)}{" "}
                    (optional)
                  </Label>
                  <div className="border border-dashed border-gray-300 p-4 text-center">
                    <input
                      type="file"
                      accept={acceptMap[uploadType]}
                      ref={fileInputRef}
                      className="hidden"
                      id={`${uploadType}-upload`}
                      onChange={(e) => handleDynamicFileUpload(e.target.files)}
                    />
                    <label
                      htmlFor={`${uploadType}-upload`}
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-2">
                        {formFileData.file
                          ? formFileData.file.name
                          : `Drag & Drop ${uploadType}`}
                      </p>
                      <Button variant="outline" size="sm">
                        📎 Upload
                      </Button>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Image Caption */}
            <div>
              <Label
                htmlFor="imageCaption"
                className="text-sm font-medium mb-2 block"
              >
                4. File Caption
              </Label>
              <Input
                id="imageCaption"
                className="w-full rounded-none shadow-none"
                placeholder="Write a caption for your selected file"
                value={formData.imageCaption || ""}
                onChange={(e) => onUpdate({ imageCaption: e.target.value })}
              />
            </div>

            {/* Short Quote */}
            <div>
              <Label
                htmlFor="shortQuote"
                className="text-sm font-medium mb-2 block"
              >
                5. Short Quote
              </Label>
              <Input
                id="shortQuote"
                className="w-full rounded-none shadow-none"
                placeholder="Write a quote for your article"
                value={formData.shortQuote}
                onChange={(e) => onUpdate({ shortQuote: e.target.value })}
              />
            </div>

            {/* Paragraph */}
            <div>
              <Label
                htmlFor="paragraph"
                className="text-sm font-medium mb-2 block"
              >
                6. Paragraph <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="paragraph"
                placeholder="Write your paragraph here"
                className="min-h-[120px] w-full rounded-none shadow-none"
                value={formData.paragraph}
                onChange={(e) => onUpdate({ paragraph: e.target.value })}
              />
              <div className="flex justify-end mt-2">
                <Button
                  size="sm"
                  className="bg-gray-800 text-white text-sm rounded-none"
                >
                  🤖 Generate tags by AI
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                8. Tags{" "}
                <span className="text-gray-400">
                  {" "}
                  (Choose from AI suggestion tags)
                </span>{" "}
                <span className="text-red-500">*</span>
              </Label>
              {/* Selected Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {formData?.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-orange-100 text-orange-800"
                  >
                    {tag}
                    <button
                      onClick={() => handleTagRemove(tag)}
                      className="ml-2 text-orange-600 hover:text-orange-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              {/* Predefined Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {predefinedTags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-orange-50"
                    onClick={() => handleTagAdd(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Custom Tag Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom tag"
                  value={newTag}
                  className="w-full rounded-none shadow-none"
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleTagAdd(newTag)}
                />
                <Button
                  className="h-auto rounded-none shadow-none bg-accent-orange"
                  onClick={() => handleTagAdd(newTag)}
                  size="sm"
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Additional Fields */}
            {formData.additionalContents.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Fields:</h3>
                {formData.additionalContents?.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <Label className="text-sm font-medium mb-2 block">
                        {field.type.charAt(0).toUpperCase() +
                          field.type.slice(1)}
                      </Label>
                      {renderAdditionalFieldInput(field, index)}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveAdditionalField(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Additional Field */}
            <div className="flex gap-2">
              <Select
                value={additionalFieldType}
                onValueChange={(v) =>
                  setAdditionalFieldType(v as AdditionalFieldType)
                }
              >
                <SelectTrigger className="flex-1 rounded-none shadow-none">
                  <SelectValue placeholder="Select field type to add" />
                </SelectTrigger>
                <SelectContent>
                  {additionalFieldTypes?.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleAddAdditionalField}
                className="bg-brick-red text-white px-8 rounded-none shadow-none"
                disabled={!additionalFieldType}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Field
              </Button>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                onClick={onSubmit}
                className="bg-brick-red hover:bg-red-800 text-white px-8 rounded-none shadow-none"
                size="lg"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticleDetailsForm;
