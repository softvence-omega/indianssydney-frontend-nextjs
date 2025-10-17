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
} from "@/store/features/article/article.api";
import { useGetAllCategoryQuery } from "@/store/features/category/category.api";
import uploadFileInAws from "@/utils/fileUploader";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ArticlePreview from "../../publish-content/ArticlePreview";

const EditVideo = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: videoData, isLoading } = useGetArticleDetailsQuery(id);
  const { data: categoriesData } = useGetAllCategoryQuery({});
  const [updateVideo] = useEditContentMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<1 | 2>(1);
  const [uploadMode, setUploadMode] = useState<"file" | "link">("file");
  const [uploading, setUploading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState("");
  const [newTag, setNewTag] = useState("");

  const initialForm = {
    contentType: "VIDEO",
    title: "",
    subTitle: "",
    categoryId: "",
    subCategoryId: "",
    categorysslug: "",
    subcategorysslug: "",
    paragraph: "",
    imageCaption: "",
    youtubeVideoUrl: "",
    videoThumbnail: null,
    shortQuote: "",
    tags: [] as string[],
    video: null,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (videoData?.data) {
      const tags = Array.isArray(videoData.data.tags)
        ? videoData.data.tags
        : typeof videoData.data.tags === "string"
          ? videoData.data.tags.split(",").map((t: string) => t.trim())
          : [];

      setFormData({
        ...initialForm,
        ...videoData.data,
        tags,
      });

      if (videoData.data.youtubeVideoUrl) {
        setUploadMode("link");
        setVideoLink(videoData.data.youtubeVideoUrl);
      }
    }
  }, [videoData]);

  const categories = categoriesData?.data || [];
  const selectedCategory = categories.find(
    (cat: any) => cat.id === formData.categoryId
  );

  const predefinedTags = [
    "Technology",
    "Innovation",
    "Education",
    "AI",
    "Interview",
  ];

  // -------- File upload handler --------
  const handleVideoFileUpload = async (files: FileList | null) => {
    if (!files || !files[0]) return;
    const file = files[0];
    setUploading(true);
    try {
      const uploadedUrl = await uploadFileInAws(file);
      if (!uploadedUrl) throw new Error("Upload failed");
      setFormData((p: any) => ({ ...p, video: uploadedUrl }));
      toast.success("Video uploaded successfully!");
    } catch (err) {
      toast.error("Video upload failed");
    } finally {
      setUploading(false);
    }
  };

  // -------- Tag handlers --------
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

  // -------- Update handler --------
  const handleUpdateVideo = async () => {
    const payload = new FormData();
    try {
      const tags = formData.tags.join(",");
      payload.append("contentType", formData.contentType);
      payload.append("title", formData.title);
      payload.append("subTitle", formData.subTitle);
      payload.append("categoryId", formData.categoryId);
      payload.append("subCategoryId", formData.subCategoryId);
      payload.append("categorysslug", formData.categorysslug);
      payload.append("subcategorysslug", formData.subcategorysslug);
      payload.append("paragraph", formData.paragraph);
      payload.append("imageCaption", formData.imageCaption);
      payload.append("shortQuote", formData.shortQuote);
      payload.append("tags", tags);

      if (uploadMode === "link") {
        payload.append("youtubeVideoUrl", videoLink);
      }

      if ((formData?.video as any) instanceof File) {
        payload.append("video", formData.video as any);
      } else if (typeof formData.video === "string") {
        payload.append("video", formData.video);
      }

      if ((formData.videoThumbnail as any) instanceof File) {
        payload.append("videoThumbnail", formData.videoThumbnail as any);
      }

      const result = await updateVideo({ id, data: payload });
      if ("error" in result) throw new Error("Update failed");
      toast.success("Video updated successfully!");
      router.push("/my-contents");
    } catch (err) {
      console.error("Error updating video:", err);
      toast.error("Failed to update video");
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (!videoData?.data)
    return <div className="text-center py-10">Video not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {step === 1 && (
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <h1 className="text-3xl font-bold mb-2">Edit Video</h1>
            <p className="text-gray-600">
              Update video content and related details.
            </p>
          </div>

          {/* Category */}
          <Card className="mb-4 rounded-none shadow-none">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label>Category *</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => {
                      const selected = categories.find((c: any) => c.id === value);
                      setFormData((p) => ({
                        ...p,
                        categoryId: value,
                        categorysslug: selected?.slug || "",
                        subCategoryId: "",
                        subcategorysslug: "",
                      }));
                    }}
                  >
                    <SelectTrigger className="rounded-none mt-2 shadow-none">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Subcategory *</Label>
                  <Select
                    value={formData.subCategoryId}
                    onValueChange={(value) => {
                      const sub = selectedCategory?.subCategories?.find(
                        (s: any) => s.id === value
                      );
                      setFormData((p) => ({
                        ...p,
                        subCategoryId: value,
                        subcategorysslug: sub?.subslug || "",
                      }));
                    }}
                    disabled={!formData.categoryId}
                  >
                    <SelectTrigger className="rounded-none mt-2 shadow-none">
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory?.subCategories?.map((sub: any) => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.subname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Upload */}
          <Card className="mb-4 rounded-none shadow-none">
            <CardHeader>
              <CardTitle>Video Upload / Link</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={uploadMode}
                onValueChange={(v) => setUploadMode(v as "file" | "link")}
              >
                <SelectTrigger className="w-[200px] rounded-none">
                  <SelectValue placeholder="Upload type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="file">Upload File</SelectItem>
                  <SelectItem value="link">YouTube Link</SelectItem>
                </SelectContent>
              </Select>

              {uploadMode === "file" ? (
                <div className="border border-dashed border-gray-300 p-4 text-center">
                  <input
                    type="file"
                    accept="video/*"
                    ref={fileInputRef}
                    className="hidden"
                    id="video-upload"
                    onChange={(e) => handleVideoFileUpload(e.target.files)}
                    disabled={uploading}
                  />
                  <label
                    htmlFor="video-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      {formData.video
                        ? `Current video: ${String(formData.video).slice(0, 30)}`
                        : "Upload new video"}
                    </p>
                    <Button variant="outline" size="sm" disabled={uploading}>
                      📎 Upload
                    </Button>
                  </label>
                </div>
              ) : (
                <Input
                  placeholder="Enter YouTube video link"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  className="rounded-none shadow-none"
                />
              )}
            </CardContent>
          </Card>

          {/* Other details */}
          <Card className="rounded-none shadow-none">
            <CardContent className="space-y-4 pt-6">
              <div>
                <Label>Title *</Label>
                <Input
                  className="rounded-none shadow-none mt-2"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, title: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Sub-Title *</Label>
                <Input
                  className="rounded-none shadow-none mt-2"
                  value={formData.subTitle}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, subTitle: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Description *</Label>
                <Textarea
                  className="rounded-none shadow-none mt-2"
                  value={formData.paragraph}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, paragraph: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Caption</Label>
                <Input
                  className="rounded-none shadow-none mt-2"
                  value={formData.imageCaption}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      imageCaption: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Tags */}
              <div>
                <Label>Tags *</Label>
                <div className="flex flex-wrap gap-2 my-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-orange-100 text-orange-800"
                    >
                      {tag}
                      <button
                        onClick={() => handleTagRemove(tag)}
                        className="ml-1 text-orange-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleTagAdd(newTag)}
                    className="rounded-none shadow-none"
                  />
                  <Button
                    className="rounded-none shadow-none"
                    onClick={() => handleTagAdd(newTag)}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
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
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  className="bg-brick-red text-white px-8 rounded-none"
                  onClick={() => setStep(2)}
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
          onPublish={handleUpdateVideo}
        />
      )}
    </div>
  );
};

export default EditVideo;
