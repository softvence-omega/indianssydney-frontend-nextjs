"use client";
import React, { useState } from "react";
import { Play } from "lucide-react";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";

// Define a type for video data
interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

// Props for VideoCard
interface VideoCardProps {
  video: Video;
  isActive: boolean;
  onPlay: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isActive, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-40 h-56 sm:w-52 sm:h-64 md:w-60 md:h-72 lg:w-64 lg:h-80 
                 flex-shrink-0 overflow-hidden bg-gray-900 shadow-lg cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlay(video.id)}
    >
      {/* Thumbnail */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${video.thumbnail})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Play Button */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <h3 className="text-white font-medium text-sm sm:text-base md:text-lg leading-tight font-playfair line-clamp-2">
          {video.title}
        </h3>
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/20 transition-all duration-200" />
      )}
    </div>
  );
};

// Main Top Shorts Component
const TopStories: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Featured");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Sample video data
  const videoData: Record<string, Video[]> = {
    Featured: [
      {
        id: "1",
        title: "Grow in intimacy with God.",
        thumbnail:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "2",
        title: "Grow in intimacy with God.",
        thumbnail:
          "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "3",
        title: "Grow in intimacy with God.",
        thumbnail:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "4",
        title: "Grow in intimacy with God.",
        thumbnail:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "5",
        title: "Grow in intimacy with God.",
        thumbnail:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop",
      },
    ],
    Lifestyle: [
      {
        id: "6",
        title: "Live your best lifestyle.",
        thumbnail:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "7",
        title: "Modern living inspiration.",
        thumbnail:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop",
      },
    ],
    Health: [
      {
        id: "8",
        title: "Wellness and health tips.",
        thumbnail:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "9",
        title: "Healthy living made simple.",
        thumbnail:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=400&auto=format&fit=crop",
      },
    ],
    Movies: [
      {
        id: "10",
        title: "Behind the scenes stories.",
        thumbnail:
          "https://images.unsplash.com/photo-1489599087777-6c38e4f3ad82?q=80&w=400&auto=format&fit=crop",
      },
    ],
    Travel: [
      {
        id: "11",
        title: "Adventure awaits you.",
        thumbnail:
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400&auto=format&fit=crop",
      },
    ],
    City: [
      {
        id: "12",
        title: "Urban life explored.",
        thumbnail:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=400&auto=format&fit=crop",
      },
    ],
    Food: [
      {
        id: "13",
        title: "Culinary adventures.",
        thumbnail:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop",
      },
    ],
  };

const availableTabs = Object.keys(videoData);

  return (
    <div className="bg-brick-red px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-8 scrollbar-hide">
          <PrimaryHeading
            title="Top Shorts"
            iconSrc="/headingIcon2.svg"
            className="text-white"
          />

          {/* Tabs */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto md:overflow-visible">
            {availableTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? "text-white border-b-2 border-[#F9A03F] pb-1"
                    : "text-white/70 hover:text-white/90"
                }`}
              >
                {tab}
              </button>
            ))}
            <button className="whitespace-nowrap text-white/70 hover:text-white/90 font-medium transition-colors duration-200">
              See all
            </button>
          </div>
        </div>

        {/* Video Cards */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 sm:pb-4 scrollbar-hide">
          {videoData[activeTab]?.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isActive={activeVideo === video.id}
              onPlay={setActiveVideo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopStories;