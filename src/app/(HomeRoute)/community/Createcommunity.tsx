"use client";

import React, { useState, useEffect } from "react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { useCreateCommunityPostMutation } from "@/store/features/community/community";
import { ImageIcon, VideoIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

const PostCommunity = () => {
  const [communityPost] = useCreateCommunityPostMutation();
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) setImagePreview(URL.createObjectURL(imageFile));
    else setImagePreview(null);

    if (videoFile) setVideoPreview(URL.createObjectURL(videoFile));
    else setVideoPreview(null);

    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [imageFile, videoFile]);

  const handleSubmit = async () => {
    if (!description && !imageFile && !videoFile) {
      toast.error("Please write something or upload media before posting.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    if (imageFile) formData.append("file", imageFile);
    if (videoFile) formData.append("video", videoFile);

    try {
      await communityPost(formData).unwrap();
      setDescription("");
      setImageFile(null);
      setVideoFile(null);
      toast.success("Post created successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to create post.");
    }
  };

  return (
    <div className="p-6 mb-6 items-center max-w-5xl mx-auto bg-white border border-gray-100 rounded-sm">
      <textarea
        placeholder="What's on your mind?"
        className="w-full bg-gray-100 px-4 py-2 text-sm focus:outline-none resize-none mb-3 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {imagePreview && (
        <div className="relative mb-3">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-64 h-40 object-cover rounded"
          />
          <button
            type="button"
            className="absolute top-1 right-1 p-1 bg-gray-200 rounded-full"
            onClick={() => setImageFile(null)}
          >
            <XIcon size={16} />
          </button>
        </div>
      )}

      {videoPreview && (
        <div className="relative mb-3">
          <video src={videoPreview} controls className="w-64 h-40 rounded" />
          <button
            type="button"
            className="absolute top-1 right-1 p-1 bg-gray-200 rounded-full"
            onClick={() => setVideoFile(null)}
          >
            <XIcon size={16} />
          </button>
        </div>
      )}

      {/* NEW STRUCTURE: Wrapper for media buttons and Post button */}
      <div className="flex justify-between items-center mt-4">
       
        <div className="flex items-center gap-4">
          <label
            htmlFor="image-upload"
            className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-blue-500 transition-colors"
          >
            <ImageIcon size={20} className="text-blue-500" />
            <span>Image</span> 
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            disabled={!!videoFile}
          />

          <label
            htmlFor="video-upload"
            className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-blue-500 transition-colors"
          >
            <VideoIcon size={20} className="text-red-500" />
            <span>Video</span> 
          </label>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            disabled={!!imageFile} 
          />
        </div>

        {/* Post Button (Right Side) */}
        <PrimaryButton title="Post" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default PostCommunity;
