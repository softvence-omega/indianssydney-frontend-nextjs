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
  FormData,
} from "../../app/(HomeRoute)/publish-content/types";

interface ArticleDetailsFormProps {
  formData: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const ArticleDetailsForm = ({
  formData,
  onUpdate,
  onSubmit,
  onBack,
}: ArticleDetailsFormProps) => {
  const [newTag, setNewTag] = useState("");
  const [additionalFieldType, setAdditionalFieldType] = useState<
    AdditionalFieldType | ""
  >("");


  const categories = [
    "Technology",
    "Business",
    "Health",
    "Education",
    "Entertainment",
    "Sports",
  ];

  const subCategories = {
    Technology: ["AI/ML", "Web Development", "Mobile Apps", "Cybersecurity"],
    Business: ["Startups", "Marketing", "Finance", "Management"],
    Health: ["Fitness", "Nutrition", "Mental Health", "Medical"],
    Education: ["Online Learning", "Skills", "Academic", "Training"],
    Entertainment: ["Movies", "Music", "Gaming", "Books"],
    Sports: ["Football", "Basketball", "Tennis", "Olympics"],
  };

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
    "quote",
    "image",
    "video",
  ];




  const handleAdditionalFieldFile = async (
    fieldKey: string,
    files: FileList | null
  ) => {
    const file = files ? files[0] : null
    if (!file) return

    const res = await uploadFileInAws(file)
    console.log(res)


    onUpdate({
      additionalFields: {
        ...formData.additionalFields,
        [fieldKey]: {
          ...formData.additionalFields[fieldKey],
          value: res as string,
        },
      },
    });
  };
  const handleTagAdd = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      onUpdate({ tags: [...formData.tags, tag] });
    }
    setNewTag("");
  };

  const handleTagRemove = (tagToRemove: string) => {
    onUpdate({ tags: formData.tags.filter((tag) => tag !== tagToRemove) });
  };

  const handleAddAdditionalField = () => {
    if (additionalFieldType) {
      const fieldKey = `additional_${Date.now()}`;
      onUpdate({
        additionalFields: {
          ...formData.additionalFields,
          [fieldKey]: {
            type: additionalFieldType,
            value:
              additionalFieldType === "image" || additionalFieldType === "video"
                ? null
                : "",
          },
        },
      });
      setAdditionalFieldType("");
    }
  };

  const handleAdditionalFieldUpdate = (
    fieldKey: string,
    value: string | File | string[]
  ) => {
    onUpdate({
      additionalFields: {
        ...formData.additionalFields,
        [fieldKey]: { ...formData.additionalFields[fieldKey], value },
      },
    });
  };

  const handleRemoveAdditionalField = (fieldKey: string) => {
    const { [fieldKey]: removed, ...rest } = formData.additionalFields;
    onUpdate({ additionalFields: rest });
  };

  const renderAdditionalFieldInput = (
    fieldKey: string,
    field: AdditionalField
  ) => {
    if (field.type === "image" || field.type === "video") {
      return (
        <div className="border border-dashed border-gray-300 p-4">
          <input
            type="file"
            accept={field.type === "image" ? "image/*" : "video/*"}
            onChange={(e) =>
              handleAdditionalFieldFile(fieldKey, e.target.files)
            }
            className="hidden"
            id={`file-input-${fieldKey}`}
          />
          <label
            htmlFor={`file-input-${fieldKey}`}
            className="flex flex-col items-center cursor-pointer"
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-2">
              {field.value instanceof File
                ? field.value.name
                : `Upload ${field.type}`}
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
        placeholder={`Enter ${field.type.toLowerCase()}`}
        value={typeof field.value === "string" ? field.value : ""}
        className="w-full rounded-none shadow-none"
        onChange={(e) => handleAdditionalFieldUpdate(fieldKey, e.target.value)}
      />
    );
  };
  // Dynamic header based on content type
  const getHeaderText = () => {
    switch (formData.contentType) {
      case "video":
        return "Publish Video:";
      case "podcast":
        return "Publish Podcast:";
      case "live-event":
        return "Publish Live Event:";
      default:
        return "Publish Article:";
    }
  };

  // for dynamic file input
  const [uploadType, setUploadType] = useState<"image" | "audio" | "video" | "">("");
  const [formFileData, setFormFileData] = useState<{ file?: File }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  //   const handleFileUpload = (
  //   field: "audioFile" | "image" | "video",
  //   files: FileList | null
  // ) => {
  //   onUpdate({ [field]: files ? files[0] : null });
  // };
  const handleDynamicFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      setFormFileData({ file: files[0] });
      onUpdate({ [uploadType]: files ? files[0] : null });
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
              <div>
                <Label
                  htmlFor="category"
                  className="text-sm font-medium mb-2 block"
                >
                  Choose Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    onUpdate({ category: value, subCategory: "" })
                  }
                >
                  <SelectTrigger className="w-full rounded-none shadow-none">
                    <SelectValue placeholder="Choose Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="subCategory"
                  className="text-sm font-medium mb-2 block"
                >
                  Choose Sub-Category *
                </Label>
                <Select
                  value={formData.subCategory}
                  onValueChange={(value) => onUpdate({ subCategory: value })}
                  disabled={!formData.category}
                >
                  <SelectTrigger className="w-full rounded-none shadow-none">
                    <SelectValue placeholder="Choose Sub-Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.category &&
                      subCategories[
                        formData.category as keyof typeof subCategories
                      ]?.map((subCat) => (
                        <SelectItem key={subCat} value={subCat}>
                          {subCat}
                        </SelectItem>
                      ))}
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
            {/* dynamic part */}
            <div>
              {/* Dropdown for choosing type */}
              <Label className="text-sm font-medium mb-2 block">3. Select File Type</Label>
              <Select onValueChange={(val) => setUploadType(val as "image" | "audio" | "video")}>
                <SelectTrigger className="w-[200px] mb-4">
                  <SelectValue placeholder="Choose type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>

              {/* Dynamic file upload */}
              {uploadType && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Upload {uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} (optional)
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
                        {formFileData.file ? formFileData.file.name : `Drag & Drop ${uploadType}`}
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
                6. Type a cation for image
              </Label>
              <Input
                id="imageCaption"
                className="w-full rounded-none shadow-none"
                placeholder="Lorem ipsum is simply dummy text of the printing and typesetting industry"
                value={formData.imageCaption}
                onChange={(e) => onUpdate({ imageCaption: e.target.value })}
              />
            </div>

            {/* Short Quote */}
            <div>
              <Label
                htmlFor="shortQuote"
                className="text-sm font-medium mb-2 block"
              >
                7. Short Quote
              </Label>
              <Input
                id="shortQuote"
                className="w-full rounded-none shadow-none"
                placeholder="Lorem ipsum is simply dummy text of the printing and typesetting industry"
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
                8. Paragraph <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="paragraph"
                placeholder="Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                className="min-h-[120px] w-full rounded-none shadow-none"
                value={formData.paragraph}
                onChange={(e) => onUpdate({ paragraph: e.target.value })}
              />
              <div className="flex justify-end mt-2">
                <Button
                  size="sm"
                  className="bg-gray-800 text-white text-sm rounded-none"
                >
                  🤖 Generate by AI
                </Button>
              </div>
            </div>

            {formData.contentType === "live-event" && (
              <div>
                <Label
                  htmlFor="liveEventDate"
                  className="text-sm font-medium mb-2 block"
                >
                  Live Event Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="liveEventDate"
                  type="dateTime-local"
                  className="w-full rounded-none shadow-none"
                  value={formData.dateTimeSlot}
                  onChange={(e) => onUpdate({ dateTimeSlot: e.target.value })}
                />
              </div>
            )}

            {/* Tags */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                8. Tags{" "}
                <span className="text-gray-400">
                  (Choose a suggestion tags)
                </span>{" "}
                <span className="text-red-500">*</span>
              </Label>

              {/* Selected Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.tags.map((tag) => (
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
                {predefinedTags.map((tag) => (
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
            {Object.keys(formData.additionalFields).length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Fields:</h3>
                {Object.entries(formData.additionalFields).map(
                  ([fieldKey, field]) => (
                    <div
                      key={fieldKey}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <Label className="text-sm font-medium mb-2 block">
                          {field.type}
                        </Label>
                        {renderAdditionalFieldInput(fieldKey, field)}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveAdditionalField(fieldKey)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )
                )}
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
                  {additionalFieldTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
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
