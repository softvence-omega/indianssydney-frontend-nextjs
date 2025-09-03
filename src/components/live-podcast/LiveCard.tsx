import React from "react";

// Define the types for the props
type PodcastProps = {
  episode: string;
  title: string;
  description: string;
  liveStatus: boolean;
  views: number;
  imageSrc: string;
};

const LivePodcastCard: React.FC<PodcastProps> = ({
  episode,
  title,
  description,
  liveStatus,
  views,
  imageSrc,
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={imageSrc} alt="Podcast" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-between items-center p-4">
          {liveStatus && (
            <span className="text-white font-bold text-xl">Live...</span>
          )}
          <span className="text-white font-semibold text-lg">{views}K</span>
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-white p-2 rounded-full opacity-75 hover:opacity-100">
            <span className="text-xl font-semibold">▶</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500">EPS-{episode}</p>
        <h3 className="text-xl font-semibold text-gray-800 mt-2">{title}</h3>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default LivePodcastCard;
