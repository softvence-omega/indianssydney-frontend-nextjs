"use client";
import React, { useEffect, useRef, useState } from "react";
import { Clock, Eye, Calendar, Play } from "lucide-react";
import { useRouter } from "next/navigation";

interface FeatureVideoCardProps {
  id?: string;
  video?: string;
  youtubeVideoUrl?: string;
  category?: string;
  title?: string;
  image?: string;
  description?: string;
  createdAt?: string;
  contentviews?: number;
  readTime?: string;
  onClick?: () => void;
}

const FeatureVideoCard: React.FC<FeatureVideoCardProps> = ({
  id,
  video,
  youtubeVideoUrl,
  category = "General",
  title = "Untitled Video",
  description = "No description available.",
  createdAt,
  contentviews = 0,
  readTime = "5 min watch",
}) => {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  // ✅ Extract YouTube thumbnail
  const getYouTubeThumbnail = (url: string): string | null => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : null;
  };

  // ✅ Format "time ago"
  const formatTimeAgo = (dateString?: string): string => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const diff = (Date.now() - date.getTime()) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  // ✅ Generate thumbnail from AWS video
  useEffect(() => {
    if (video && !youtubeVideoUrl && !thumbnail) {
      const videoElement = document.createElement("video");
      videoElement.src = video;
      videoElement.crossOrigin = "anonymous";
      videoElement.muted = true;
      videoElement.playsInline = true;
      videoElement.preload = "metadata";

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const captureFrame = (time: number) => {
        videoElement.currentTime = time;
      };

      const handleSeeked = () => {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        if (ctx) {
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const dataURL = canvas.toDataURL("image/jpeg");
          setThumbnail(dataURL);
        }

        videoElement.removeEventListener("seeked", handleSeeked);
      };

      videoElement.addEventListener("loadeddata", () => {
        // 🎯 Capture around 10–20 frames after start (~1–3 seconds)
        const randomTime = 1 + Math.random() * 2; // 1s to 3s
        captureFrame(randomTime);
      });

      videoElement.addEventListener("seeked", handleSeeked);
    }
  }, [video, youtubeVideoUrl, thumbnail]);

  // ✅ Determine thumbnail
  const youtubeThumb = youtubeVideoUrl
    ? getYouTubeThumbnail(youtubeVideoUrl)
    : null;
  const imageSrc =
    youtubeThumb ||
    thumbnail ||
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=300&fit=crop";

  const handleClick = () => {
    router.push(`/details/video/${id}`);
  };

  return (
    <div
      className="bg-transparent overflow-hidden cursor-pointer duration-200 group"
      onClick={handleClick}
    >
      {/* 🎥 Video Thumbnail */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* ▶️ Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
          <div className="bg-white/80 p-3 rounded-full shadow-lg group-hover:scale-110 transition">
            <Play className="w-6 h-6 text-black" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* 📝 Content Section */}
      <div className="py-3">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-accent-orange text-white px-3 py-1 text-sm font-medium">
            {category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {formatTimeAgo(createdAt)}
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2 leading-tight font-playfair line-clamp-1">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span className="font-medium">{readTime}</span>
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            <span className="font-medium">{contentviews} views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureVideoCard;
