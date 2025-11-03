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
import { ArrowLeft, Plus, Upload, X } from "lucide-react";
import { Editor } from "primereact/editor";
import { useEffect, useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useGenerateContentMutation,
  useTagGeneratorMutation,
} from "@/store/features/ai-content/ai-content.api";
import { useUploadFileIntoAWSMutation } from "@/store/features/article/article.api";
import { useGetAllCategoryQuery } from "@/store/features/category/category.api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdditionalField, AdditionalFieldType } from "../types";

const ArticleForm = ({ formData, onUpdate, onSubmit }: any) => {
  const [value, setValue] = useState(formData?.paragraph || "");
  const editorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const { data } = useGetAllCategoryQuery({});
  const [newTag, setNewTag] = useState("");
  const [additionalFieldType, setAdditionalFieldType] = useState<
    AdditionalFieldType | ""
  >("");
  const [uploadFIleIntoAws] = useUploadFileIntoAWSMutation();
  const [generateTags] = useTagGeneratorMutation();
  const [generateContent] = useGenerateContentMutation();
  const [uploadType, setUploadType] = useState<"image" | "audio" | "video">(
    "image"
  );
  const [formFileData, setFormFileData] = useState<{ file?: File }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = data?.data || [];
  const selectedCategory = categories.find(
    (cat: any) => cat.id === formData.categoryId
  );
  const router = useRouter();
  const predefinedTags = ["News", "Business"];
  const additionalFieldTypes: AdditionalFieldType[] = [
    "paragraph",
    "shortQuote",
    "image",
    "video",
    "audio",
  ];

  // tag handlers
  const handleTagAdd = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      onUpdate({ tags: [...formData.tags, tag] });
    }
    setNewTag("");
  };
  const handleTagRemove = (tagToRemove: string) => {
    onUpdate({
      tags: formData.tags.filter((tag: string) => tag !== tagToRemove),
    });
  };

  // add additional field
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
    const id = toast.loading("Uploading...");
    const file = files ? files[0] : null;
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await uploadFIleIntoAws(formData).unwrap();
      if (res) {
        handleAdditionalFieldUpdate(index, (res as any)?.s3Url);
        toast.success(`${file.type.split("/")[0]} uploaded successfully!`, {
          id,
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file.", { id });
    }
  };

  const handleRemoveAdditionalField = (index: number) => {
    const updatedFields = formData.additionalContents.filter(
      (_: any, i: number) => i !== index
    );
    onUpdate({ additionalContents: updatedFields });
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
      // <Editor  value={typeof field.value === "string" ? field.value : ""} onTextChange={(e) => handleAdditionalFieldUpdate(index, e.htmlValue as string)} style={{ minHeight: '320px' }} />
      <Input
        placeholder={`Enter ${field.type}`}
        className="rounded-none"
        value={typeof field.value === "string" ? field.value : ""}
        onChange={(e) => handleAdditionalFieldUpdate(index, e.target.value)}
      />
    );
  };

  const acceptMap = {
    image: "any",
    audio: "audio/*",
    video: "video/*",
  };

  const handleDynamicFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      setFormFileData({ file: files[0] });
      onUpdate({ [uploadType]: files[0] });
    }
  };

  const handleGenerateTags = async () => {
    if (!formData.categorysslug || !formData.subcategorysslug) {
      toast.error("Please select a category and subcategory.");
      return;
    }
    try {
      setOpen(true);
      const data = {
        category: formData.categorysslug,
        subcategory: formData.subcategorysslug,
        title: formData?.title,
        sub_title: formData?.subtitle,
        content: formData?.paragraph,
      };
      const result = await generateTags(data).unwrap();
      if (result?.tags) {
        const newTags = result.tags.filter(
          (tag: string) => !formData.tags.includes(tag)
        );
        onUpdate({ tags: [...newTags] });
        toast.success("Tags generated successfully!");
        setOpen(false);
      } else {
        toast.dismiss();
        toast.error("No tags returned from the API.");
      }
    } catch (error) {
      console.error("Error generating tags:", error);
      toast.dismiss();
      toast.error("Failed to generate tags. Please try again.");
    }
    setOpen(false);
  };

  const handleGenerateContent = async () => {
    if (!formData.paragraph) {
      toast.error("Please write something in paragraph");
      return;
    }
    try {
      setOpen(true);
      const data = {
        paragraph: formData.paragraph,
      };
      const result = await generateContent(data).unwrap();
      if (result?.generatedContent) {
        onUpdate({ paragraph: result.generatedContent });
        toast.success("Paragraph generated successfully!");
        setOpen(false);
      } else {
        toast.dismiss();
        toast.error("No content returned from the API.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast.dismiss();
      toast.error("Failed to generate content. Please try again.");
    }
    setOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (editorRef.current) {
        const quill = editorRef.current.getQuill?.();
        if (quill) {
          // ✅ Stop checking once the editor is ready
          clearInterval(interval);

          // Add custom image upload handler
          const toolbar = quill.getModule("toolbar");
          toolbar.addHandler("image", () => handleImageUpload(quill));
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleImageUpload = async (quill: any) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        // Upload to VPS
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!data.url) throw new Error("Upload failed");

        const imageUrl = data.url;
        console.log("Image URL :", imageUrl);

        // Insert image in the editor
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Publish Article
          </h1>
          <p className="text-gray-600">
            Publish your first article on our platform
          </p>
        </div>
        {/* Category Sub Category Selection */}
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
            <div>
              <Label>1. Title *</Label>
              <Input
                className="w-full rounded-none shadow-none mt-2"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
              />
            </div>

            <div>
              <Label>2. Sub-Title *</Label>
              <Input
                className="w-full rounded-none shadow-none mt-2"
                placeholder="Enter Sub-title"
                value={formData.subTitle}
                onChange={(e) => onUpdate({ subTitle: e.target.value })}
              />
            </div>
            <div>
              <Label>3. File Type</Label>
              <Select
                onValueChange={(val) =>
                  setUploadType(val as "image" | "audio" | "video")
                }
              >
                <SelectTrigger className="w-[200px] rounded-none mt-2">
                  <SelectValue placeholder="Choose type..." />
                </SelectTrigger>
                <SelectContent>
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
              )}
            </div>

            <div>
              <Label>4. File Caption</Label>
              <Input
                className="w-full rounded-none shadow-none mt-2"
                placeholder="Create a caption for your file"
                value={formData.imageCaption}
                onChange={(e) => onUpdate({ imageCaption: e.target.value })}
              />
            </div>

            <div>
              <Label>5. Short Quote</Label>
              <Input
                className="w-full rounded-none shadow-none mt-2"
                placeholder="Create a Short Quote for the article"
                value={formData.shortQuote}
                onChange={(e) => onUpdate({ shortQuote: e.target.value })}
              />
            </div>

            <div>
              {/* <Label className="mb-3">6. Paragraph *</Label> */}
              {/* <Editor
                value={formData?.paragraph}
                onTextChange={(e) =>
                  onUpdate({ paragraph: e.htmlValue as string })
                }
                style={{ minHeight: "320px", fontSize: "15px" }}
              /> */}
              <Label className="mb-3 block">6. Paragraph *</Label>
              <Editor
                ref={editorRef}
                value={value}
                onTextChange={(e) => {
                  setValue(e.htmlValue);
                  onUpdate({ paragraph: e.htmlValue });
                }}
                style={{ minHeight: "320px", fontSize: "15px" }}
              />
            </div>
            <div className="flex justify-end mt-2 gap-4">
              <Button
                onClick={handleGenerateContent}
                size="sm"
                className="bg-brick-red text-white text-sm rounded-none"
              >
                🤖 Generate content by AI
              </Button>
              <Button
                onClick={handleGenerateTags}
                size="sm"
                className="bg-gray-800 text-white text-sm rounded-none"
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
                    className="bg-orange-100 text-orange-800 mt-"
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
                  onKeyPress={(e) => e.key === "Enter" && handleTagAdd(newTag)}
                />
                <Button
                  className="rounded-none "
                  onClick={() => handleTagAdd(newTag)}
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Additional Fields */}
            {formData.additionalContents.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Fields:</h3>
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

            {/* Add New Additional Field */}
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

            <div className="pt-6 flex justify-end">
              <Button
                onClick={onSubmit}
                className="bg-brick-red text-white px-8"
              >
                Preview Article →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Please wait a moment...</AlertDialogTitle>
            <AlertDialogDescription>
              Be patient while we generate the ai response. It may take a few
              seconds or minutes.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArticleForm;
