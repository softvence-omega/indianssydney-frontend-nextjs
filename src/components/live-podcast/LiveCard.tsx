import React from "react";
import { Play } from "lucide-react";

// Define the types for the props
type PodcastProps = {
  episode: string;
  title: string;
  description: string;
  liveStatus: boolean;
  views: number;
  imageSrc: string;
  endedTime?: string; // e.g., "20 minutes ago"
};

const LivePodcastCard: React.FC<PodcastProps> = ({
  episode,
  title,
  description,
  liveStatus,
  views,
  imageSrc,
  endedTime = "20 minutes ago",
}) => {
  return (
    <div className="relative w-full h-auto rounded-none overflow-hidden shadow-lg cursor-pointer group">
      {/* Background Image */}
      <img
        src={imageSrc}
        alt="Podcast"
        className="w-full h-full object-cover"
      />
      {/* Top Right Status */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        {liveStatus ? (
          <>
            <div className="bg-red-500 text-white px-3 py-1 text-sm font-semibold flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
            <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded flex items-center space-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">{views}K</span>
            </div>
          </>
        ) : (
          <div className="bg-accent-orange bg-opacity-50 text-white px-3 py-1 text-sm">
            {endedTime}
          </div>
        )}
      </div>

      {/* Center Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/60 bg-opacity-90 hover:bg-opacity-100 flex justify-center items-center w-10 h-10 rounded-full shadow-lg transform group-hover:scale-110 transition-all duration-300">
          <Play className="w-6 h-6 text-black" fill="currentColor" />
        </div>
      </div>
      <div className=" absolute bottom-0 right-0 left-0 flex flex-col sm:flex-row gap-1 justify-between sm:items-center p-2 sm:p-4 bg-white/20 backdrop-blur-[4px] border-white/30 border-t">
        {/* Bottom Left Episode Info */}
        <div>
          <span className=" text-white px-2 py-1 text-xs sm:text-sm font-medium  border border-white ">
            EPS - {episode}
          </span>
          <h3 className="text-white font-medium text-base sm:text-xl mt-2 max-w-xs font-playfair">
            {title}
          </h3>
        </div>

        {/* Bottom Right Description */}
        <div className="max-w-sm">
          <p className="text-white text-xs sm:text-sm rounded  line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
export default LivePodcastCard;
