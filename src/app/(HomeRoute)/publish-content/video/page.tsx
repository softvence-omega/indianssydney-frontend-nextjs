"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategoryQuery } from "@/store/features/category/category.api";
import { useCreateNewArticleMutation } from "@/store/features/article/article.api";

const VideoArticlePage = () => {
  const { data } = useGetAllCategoryQuery({});
  const [createNewArticle] = useCreateNewArticleMutation();
  const [uploadMode, setUploadMode] = useState<"file" | "link">("file");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newTag, setNewTag] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    contentType: "VIDEO",
    title: "",
    subTitle: "",
    categoryId: "",
    subCategoryId: "",
    categorysslug: "",
    subcategorysslug: "",
    paragraph: "", // about text goes here
    image: null,
    video: null,
    audio: null,
    imageCaption: "",
    youtubeVideoUrl: "",
    videoThumbnail: null,
    shortQuote: "Hi",
    tags: [] as string[],
  });

  const categories = data?.data || [];
  const selectedCategory = categories.find(
    (cat: any) => cat.id === formData.categoryId
  );

  const predefinedTags = [
    "Digital Literacy",
    "South Asian Diaspora",
    "Cultural Integration",
    "Migration Studies",
    "Community Development",
  ];

  // ---------------- TAG HANDLERS ----------------
  const handleTagAdd = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData((p) => ({ ...p, tags: [...p.tags, tag] }));
      setNewTag("");
    }
  };

  const handleTagRemove = (tag: string) =>
    setFormData((p) => ({
      ...p,
      tags: p.tags.filter((t) => t !== tag),
    }));

  // ---------------- FILE HANDLERS ----------------
  const handleFileSelect = (files: FileList | null) => {
    if (files && files[0]) {
      setVideoFile(files[0]);
      // setFormData((p: any) => ({ ...p, video: files[0] }));
    }
  };

  // ---------------- PUBLISH HANDLER ----------------
  const handlePublish = async () => {
    try {
      // Construct final payload according to UploadFormData
      const finalPayload: {
        paragraph: string;
        youtubeVideoUrl: string;
        video: File | null;
        contentType: string;
        title: string;
        subTitle: string;
        categoryId: string;
        subCategoryId: string;
        categorysslug: string;
        subcategorysslug: string;
        image: File | null;
        audio: File | null;
        imageCaption: string;
        videoThumbnail: File | null;
        shortQuote: string;
        tags: string[];
      } = {
        ...formData,
        paragraph: formData.paragraph,
        youtubeVideoUrl: uploadMode === "link" ? videoLink.trim() : "",
        video: videoFile || null,
      };

      const payload = new FormData();

      // Append primitives
      payload.append("contentType", finalPayload.contentType || "");
      payload.append("title", finalPayload.title || "");
      payload.append("subTitle", finalPayload.subTitle || "");
      payload.append("categoryId", finalPayload.categoryId || "");
      payload.append("subCategoryId", finalPayload.subCategoryId || "");
      payload.append("categorysslug", finalPayload.categorysslug || "");
      payload.append("subcategorysslug", finalPayload.subcategorysslug || "");
      payload.append("paragraph", finalPayload.paragraph || "");
      payload.append("imageCaption", finalPayload.imageCaption || "");
      payload.append("youtubeVideoUrl", finalPayload.youtubeVideoUrl || "");
      payload.append("shortQuote", finalPayload.shortQuote || "");

      // Append tags as comma-separated string
      const tags = Array.isArray(finalPayload.tags)
        ? finalPayload.tags.join(",")
        : finalPayload.tags || "";
      payload.append("tags", tags);

      // Append files (skip if null)
      if (finalPayload.image) {
        payload.append("image", finalPayload.image);
      }
      if (finalPayload.video) {
        payload.append("video", finalPayload.video);
      }
      if (finalPayload.audio) {
        payload.append("audio", finalPayload.audio);
      }
      if (finalPayload.videoThumbnail) {
        payload.append("videoThumbnail", finalPayload.videoThumbnail);
      }

      // Log FormData entries for debugging
      console.log("FormData entries:", Array.from(payload.entries()));

      const res = await createNewArticle(payload).unwrap();
      console.log(res);

      alert("Video Podcast published successfully!");

      // Reset form
      setFormData({
        contentType: "PODCAST",
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
        shortQuote: "",
        videoThumbnail: null,
        tags: [],
      });
      setVideoFile(null);
      setVideoLink("");
    } catch (err: any) {
      console.error("Publish error:", err);
      alert(
        "Something went wrong while publishing: " +
          (err?.message || JSON.stringify(err))
      );
    }
  };

  // ---------------- RENDER ----------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold mb-2">Publish Video Article</h1>
          <p className="text-gray-600">
            Upload or link a video, write details, and publish instantly.
          </p>
        </div>

        {/* Category Selection */}
        <Card className="mb-4 rounded-none shadow-none">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Category */}
              <div>
                <Label>Choose Category *</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => {
                    const selectedCat = categories.find(
                      (c: any) => c.id === value
                    );
                    setFormData((p) => ({
                      ...p,
                      categoryId: value,
                      categorysslug: selectedCat?.slug || "",
                      subCategoryId: "",
                      subcategorysslug: "",
                    }));
                  }}
                >
                  <SelectTrigger className="w-full rounded-none shadow-none mt-2">
                    <SelectValue
                      className="w-full rounded-none shadow-none"
                      placeholder="Choose Category"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat: any) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* SubCategory */}
              <div>
                <Label>Choose Sub-Category *</Label>
                <Select
                  value={formData.subCategoryId}
                  onValueChange={(value) => {
                    const selectedSubCat =
                      selectedCategory?.subCategories?.find(
                        (s: any) => s.id === value
                      );
                    setFormData((p) => ({
                      ...p,
                      subCategoryId: value,
                      subcategorysslug: selectedSubCat?.subslug || "",
                    }));
                  }}
                  disabled={!formData.categoryId}
                >
                  <SelectTrigger className="w-full rounded-none shadow-none mt-2">
                    <SelectValue placeholder="Choose Sub-Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory?.subCategories?.length ? (
                      selectedCategory.subCategories.map((subCat: any) => (
                        <SelectItem key={subCat.id} value={subCat.id}>
                          {subCat.subname}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        🚫 No subcategory found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload / Link Video */}
        <div className="mb-6 bg-white p-6 border border-gray-200">
          <Label className="font-medium">1. Upload Video *</Label>

          <div className="flex gap-4 mt-3">
            <Button
              type="button"
              variant={uploadMode === "file" ? "default" : "outline"}
              onClick={() => setUploadMode("file")}
              className="rounded-none"
            >
              Upload File
            </Button>
            <Button
              type="button"
              variant={uploadMode === "link" ? "default" : "outline"}
              onClick={() => setUploadMode("link")}
              className="rounded-none"
            >
              Paste Link
            </Button>
          </div>

          {uploadMode === "file" ? (
            <div className="mt-4 border border-dashed border-gray-300 p-6 text-center">
              <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="video-file-input"
              />
              <label
                htmlFor="video-file-input"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm mb-2">
                  {videoFile
                    ? videoFile.name
                    : "Drag & Drop or click to select"}
                </p>
                <Button variant="outline" size="sm">
                  + Upload
                </Button>
              </label>
              {videoFile && (
                <div className="mt-3">
                  <video
                    src={URL.createObjectURL(videoFile)}
                    controls
                    className="rounded-md w-full max-h-60"
                  />
                  {/* <div className="flex justify-center mt-2">
                    <Button
                      type="button"
                      onClick={handleUpload}
                      disabled={uploading}
                      className="bg-blue-600 text-white"
                    >
                      {uploading ? "Uploading..." : "Upload Video"}
                    </Button>
                  </div> */}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4">
              <Input
                placeholder="Paste your YouTube or video link"
                value={videoLink}
                className="rounded-none"
                onChange={(e) => setVideoLink(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Title */}
        <div className="bg-white p-6 border border-gray-200">
          <Label>2. Title *</Label>
          <Input
            className="mt-2 rounded-none"
            placeholder="Type your title..."
            value={formData.title}
            onChange={(e) =>
              setFormData((p) => ({ ...p, title: e.target.value }))
            }
          />
        </div>

        {/* Subtitle */}
        <div className="bg-white p-6 border border-gray-200 mt-4">
          <Label>3. Sub-Title *</Label>
          <Input
            className="mt-2 rounded-none"
            placeholder="Type your sub-title..."
            value={formData.subTitle}
            onChange={(e) =>
              setFormData((p) => ({ ...p, subTitle: e.target.value }))
            }
          />
        </div>

        {/* Tags */}
        <div className="bg-white p-6 border border-gray-200 mt-4">
          <Label>4. Tags *</Label>
          <div className="flex flex-wrap gap-2 my-2">
            {formData.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-orange-100 text-orange-800"
              >
                {tag}
                <button onClick={() => handleTagRemove(tag)} className="ml-2">
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
              className="mt-2 rounded-none"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTagAdd(newTag)}
            />
            <Button
              onClick={() => handleTagAdd(newTag)}
              className="mt-2 rounded-none"
            >
              Add
            </Button>
          </div>
        </div>

        {/* About / Paragraph */}
        <div className="bg-white p-6 border border-gray-200 mt-4">
          <Label>5. About *</Label>
          <Textarea
            className="mt-2 rounded-none"
            placeholder="Write a short description of the video..."
            value={formData.paragraph}
            onChange={(e) =>
              setFormData((p) => ({ ...p, paragraph: e.target.value }))
            }
          />
        </div>

        {/* Publish Button */}
        <div className="pt-6">
          <Button
            onClick={handlePublish}
            className="bg-brick-red text-white px-8 rounded-none"
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoArticlePage;
