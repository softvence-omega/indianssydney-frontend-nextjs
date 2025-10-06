// "use client";

// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import uploadFileInAws from "@/utils/fileUploader";
// import { ArrowLeft, Upload, X } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useGetAllCategoryQuery } from "@/store/features/category/category.api";

// const VideoArticlePage = () => {
//   const { data } = useGetAllCategoryQuery({});
//   const [step, setStep] = useState<1 | 2>(1);
//   const [uploadMode, setUploadMode] = useState<"file" | "link">("file");
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [videoLink, setVideoLink] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [newTag, setNewTag] = useState("");
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     title: "",
//     subTitle: "",
//     tags: [] as string[],
//     about: "",
//     categoryId: "",
//     subCategoryId: "",
//     categorysslug: "",
//     subcategorysslug: "",
//     video: null as File | string | null,
//     contentType: "VIDEO",
//   });

//   const categories = data?.data || [];
//   const selectedCategory = categories.find(
//     (cat: any) => cat.id === formData.categoryId
//   );
//   const predefinedTags = [
//     "Digital Literacy",
//     "South Asian Diaspora",
//     "Cultural Integration",
//     "Migration Studies",
//     "Community Development",
//   ];

//   const handleTagAdd = (tag: string) => {
//     if (tag && !formData.tags.includes(tag)) {
//       setFormData((p) => ({ ...p, tags: [...p.tags, tag] }));
//     }
//   };

//   const handleTagRemove = (tag: string) =>
//     setFormData((p) => ({
//       ...p,
//       tags: p.tags.filter((t) => t !== tag),
//     }));

//   const handleFileSelect = (files: FileList | null) => {
//     if (files && files[0]) {
//       setVideoFile(files[0]);
//       setFormData((p) => ({ ...p, video: files[0] }));
//     }
//   };

//   const handleUpload = async () => {
//     if (!videoFile) return alert("Please select a file first.");
//     setUploading(true);
//     try {
//       const res = await uploadFileInAws(videoFile);
//       console.log("File uploaded:", res);
//       setFormData((p) => ({ ...p, video: res?.url }));
//       alert("✅ Video uploaded successfully!");
//     } catch (e) {
//       console.error(e);
//       alert("❌ Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handlePublish = async () => {
//     try {
//       const payload = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value === null || value === undefined) return;
//         if (Array.isArray(value) || typeof value === "object") {
//           payload.append(key, JSON.stringify(value));
//         } else {
//           payload.append(key, value as any);
//         }
//       });

//       const res = await fetch("/api/publish-video-article", {
//         method: "POST",
//         body: payload,
//       });

//       if (!res.ok) throw new Error("Failed to publish video article");
//       alert("🎉 Video Article published successfully!");
//       setStep(1);
//       setFormData({
//         title: "",
//         subTitle: "",
//         tags: [],
//         about: "",
//         categoryId: "",
//         subCategoryId: "",
//         categorysslug: "",
//         subcategorysslug: "",
//         video: null,
//         contentType: "VIDEO",
//       });
//     } catch (err) {
//       console.error(err);
//       alert("❌ Something went wrong while publishing");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {step === 1 && (
//         <div
//           onSubmit={(e) => {
//             e.preventDefault();
//             handlePublish();
//           }}
//           className="max-w-4xl mx-auto"
//         >
//           {/* Header */}
//           <div className="mb-6">
//             <Button
//               variant="ghost"
//               onClick={() => router.back()}
//               className="mb-4"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Categories
//             </Button>

//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Publish Video Article
//             </h1>
//             <p className="text-gray-600">
//               Publish your first video article on our platform
//             </p>
//           </div>

//           {/* Category Selection */}
//           <Card className="mb-4 rounded-none shadow-none">
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 {/* Category */}
//                 <div>
//                   <Label className="text-sm font-medium mb-2 block">
//                     Choose Category *
//                   </Label>
//                   <Select
//                     value={formData.categoryId}
//                     onValueChange={(value) => {
//                       const selectedCat = categories.find(
//                         (c: any) => c.id === value
//                       );
//                       setFormData((p) => ({
//                         ...p,
//                         categoryId: value,
//                         categorysslug: selectedCat?.slug || "",
//                         subCategoryId: "",
//                         subcategorysslug: "",
//                       }));
//                     }}
//                   >
//                     <SelectTrigger className="w-full rounded-none shadow-none">
//                       <SelectValue placeholder="Choose Category" />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-none">
//                       {categories?.map((cat: any) => (
//                         <SelectItem key={cat.id} value={cat.id}>
//                           {cat.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Sub-Category */}
//                 <div>
//                   <Label className="text-sm font-medium mb-2 block">
//                     Choose Sub-Category *
//                   </Label>
//                   <Select
//                     value={formData.subCategoryId}
//                     onValueChange={(value) => {
//                       const selectedSubCat =
//                         selectedCategory?.subCategories?.find(
//                           (s: any) => s.id === value
//                         );
//                       setFormData((p) => ({
//                         ...p,
//                         subCategoryId: value,
//                         subcategorysslug: selectedSubCat?.subslug || "",
//                       }));
//                     }}
//                     disabled={!formData.categoryId}
//                   >
//                     <SelectTrigger className="w-full rounded-none shadow-none">
//                       <SelectValue placeholder="Choose Sub-Category" />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-none">
//                       {selectedCategory?.subCategories?.length ? (
//                         selectedCategory.subCategories?.map((subCat: any) => (
//                           <SelectItem key={subCat.id} value={subCat.id}>
//                             {subCat.subname}
//                           </SelectItem>
//                         ))
//                       ) : (
//                         <SelectItem value="none" disabled>
//                           🚫 No subcategory found
//                         </SelectItem>
//                       )}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Upload Video */}
//           <div className="mb-6 bg-white p-6 border border-gray-200">
//             <Label className="font-medium">1. Upload Video *</Label>

//             <div className="flex gap-4 mt-3">
//               <Button
//                 type="button"
//                 variant={uploadMode === "file" ? "default" : "outline"}
//                 onClick={() => setUploadMode("file")}
//               >
//                 Upload File
//               </Button>
//               <Button
//                 type="button"
//                 variant={uploadMode === "link" ? "default" : "outline"}
//                 onClick={() => setUploadMode("link")}
//               >
//                 File Link
//               </Button>
//             </div>

//             {uploadMode === "file" ? (
//               <div className="mt-4 border border-dashed border-gray-300 rounded-md p-6 text-center">
//                 <input
//                   type="file"
//                   accept="video/*"
//                   ref={fileInputRef}
//                   onChange={(e) => handleFileSelect(e.target.files)}
//                   className="hidden"
//                   id="video-file-input"
//                 />
//                 <label
//                   htmlFor="video-file-input"
//                   className="flex flex-col items-center cursor-pointer"
//                 >
//                   <Upload className="w-8 h-8 text-gray-400 mb-2" />
//                   <p className="text-gray-500 text-sm mb-2">
//                     {videoFile ? videoFile.name : "Drag & Drop or"}
//                   </p>
//                   <Button variant="outline" size="sm">
//                     + Upload
//                   </Button>
//                 </label>
//                 {videoFile && (
//                   <div className="mt-3">
//                     <video
//                       src={URL.createObjectURL(videoFile)}
//                       controls
//                       className="rounded-md w-full max-h-60"
//                     />
//                     <div className="flex justify-center mt-2">
//                       <Button
//                         type="button"
//                         onClick={handleUpload}
//                         disabled={uploading}
//                         className="bg-blue-600 text-white"
//                       >
//                         {uploading ? "Uploading..." : "Upload Video"}
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="mt-4">
//                 <Input
//                   placeholder="Paste your video link"
//                   value={videoLink}
//                   onChange={(e) => {
//                     setVideoLink(e.target.value);
//                     setFormData((p) => ({ ...p, video: e.target.value }));
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Title */}
//           <div className="bg-white p-6 border border-gray-200">
//             <Label>2. Title *</Label>
//             <Input
//               className="mt-2 rounded-none"
//               placeholder="Type your title..."
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData((p) => ({ ...p, title: e.target.value }))
//               }
//             />
//           </div>

//           {/* Sub-Title */}
//           <div className="bg-white p-6 border border-gray-200 mt-4">
//             <Label>3. Sub-Title *</Label>
//             <Input
//               className="mt-2 rounded-none"
//               placeholder="Type your sub-title..."
//               value={formData.subTitle}
//               onChange={(e) =>
//                 setFormData((p) => ({ ...p, subTitle: e.target.value }))
//               }
//             />
//           </div>

//           {/* Tags */}
//           <div className="bg-white p-6 border border-gray-200 mt-4">
//             <Label>4. Tags *</Label>
//             <div className="flex flex-wrap gap-2 my-2">
//               {formData.tags.map((tag: string) => (
//                 <Badge
//                   key={tag}
//                   variant="secondary"
//                   className="bg-orange-100 text-orange-800 mt-"
//                 >
//                   {tag}
//                   <button
//                     onClick={() => handleTagRemove(tag)}
//                     className="ml-2 text-orange-600"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </Badge>
//               ))}
//             </div>
//             <div className="flex flex-wrap gap-2 mb-2">
//               {predefinedTags.map((tag) => (
//                 <Badge
//                   key={tag}
//                   variant="outline"
//                   className="cursor-pointer"
//                   onClick={() => handleTagAdd(tag)}
//                 >
//                   {tag}
//                 </Badge>
//               ))}
//             </div>
//             <div className="flex gap-2">
//               <Input
//                 placeholder="Add custom tag"
//                 className="rounded-none shadow-none"
//                 value={newTag}
//                 onChange={(e) => setNewTag(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleTagAdd(newTag)}
//               />
//               <Button
//                 className="rounded-none "
//                 onClick={() => handleTagAdd(newTag)}
//               >
//                 Add
//               </Button>
//             </div>
//           </div>

//           {/* About */}
//           <div className="bg-white p-6 border border-gray-200 mt-4">
//             <Label>5. About *</Label>
//             <Textarea
//               className="mt-2 rounded-none"
//               placeholder="Write a short description of the video..."
//               value={formData.about}
//               onChange={(e) =>
//                 setFormData((p) => ({ ...p, about: e.target.value }))
//               }
//             />
//           </div>

//           {/* Next Button */}
//           <div className="pt-6">
//             <Button
//               onClick={handlePublish}
//               className="bg-brick-red text-white px-8 rounded-none"
//             >
//               Publish
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoArticlePage;

"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import uploadFileInAws from "@/utils/fileUploader";
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

const VideoArticlePage = () => {
  const { data } = useGetAllCategoryQuery({});
  const [uploadMode, setUploadMode] = useState<"file" | "link">("file");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState("");
  const [uploading, setUploading] = useState(false);
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
    shortQuote: "",
    tags: [] as string[],
    additionalContents: [],
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
      setFormData((p: any) => ({ ...p, video: files[0] }));
    }
  };

  const handleUpload = async () => {
    if (!videoFile) return alert("Please select a file first.");
    setUploading(true);
    try {
      const res = await uploadFileInAws(videoFile);
      if (!res) throw new Error("Upload failed");
      setFormData((p: any) => ({ ...p, video: res }));
      alert("✅ Video uploaded successfully!");
    } catch (e) {
      console.error(e);
      alert("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ---------------- PUBLISH HANDLER ----------------
  const handlePublish = async () => {
    try {
      // Construct final payload according to UploadFormData
      const finalPayload = {
        ...formData,
        paragraph: formData.paragraph,
        youtubeVideoUrl: uploadMode === "link" ? videoLink.trim() : "", // only if link mode
        video: uploadMode === "file" ? formData.video : null, // only if file mode
      };

      const payload = new FormData();
      Object.entries(finalPayload).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (key === "video" && value instanceof File) {
          payload.append(key, value);
        } else if (Array.isArray(value) || typeof value === "object") {
          payload.append(key, JSON.stringify(value));
        } else {
          payload.append(key, value as any);
        }
      });

      const res = await fetch("/api/publish-video-article", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) throw new Error("Failed to publish video article");
      alert("🎉 Video Article published successfully!");

      // reset form
      setFormData({
        contentType: "VIDEO",
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
      });
      setVideoFile(null);
      setVideoLink("");
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong while publishing");
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
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Category" />
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
                  <SelectTrigger>
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
            >
              Upload File
            </Button>
            <Button
              type="button"
              variant={uploadMode === "link" ? "default" : "outline"}
              onClick={() => setUploadMode("link")}
            >
              Paste Link
            </Button>
          </div>

          {uploadMode === "file" ? (
            <div className="mt-4 border border-dashed border-gray-300 rounded-md p-6 text-center">
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
                  <div className="flex justify-center mt-2">
                    <Button
                      type="button"
                      onClick={handleUpload}
                      disabled={uploading}
                      className="bg-blue-600 text-white"
                    >
                      {uploading ? "Uploading..." : "Upload Video"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4">
              <Input
                placeholder="Paste your YouTube or video link"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Title */}
        <div className="bg-white p-6 border border-gray-200">
          <Label>2. Title *</Label>
          <Input
            className="mt-2"
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
            className="mt-2"
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
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTagAdd(newTag)}
            />
            <Button onClick={() => handleTagAdd(newTag)}>Add</Button>
          </div>
        </div>

        {/* About / Paragraph */}
        <div className="bg-white p-6 border border-gray-200 mt-4">
          <Label>5. About *</Label>
          <Textarea
            className="mt-2"
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
