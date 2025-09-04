"use client";

import React, { useEffect, useRef } from "react";
import videojs, { Player } from "video.js";
import "video.js/dist/video-js.css"; // Import Video.js styles

interface VideoPlayerProps {
  src: string;
  poster?: string; // Optional poster image for the video player
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    // Initialize Video.js player when component mounts
    if (videoNode.current) {
      playerRef.current = videojs(videoNode.current, {
        controls: true,
        responsive: true,
        fluid: true,
        preload: "auto",
        poster: poster || "", // Set poster if provided
        sources: [
          {
            src,
            type: "video/mp4", // You can adjust this for different video types
          },
        ],
      });

      return () => {
        // Clean up the player when the component unmounts
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [src, poster]);

  return (
    <div className="w-full max-w-lg bg-white border border-gray-300 rounded-xl shadow-lg p-6">
      <video
        ref={videoNode}
        className="video-js vjs-theme-fancy vjs-big-play-centered w-full rounded-md"
        controls
      />
      <p className="mt-4 text-sm text-gray-700 text-center font-medium">
        🎥 Now playing video
      </p>
    </div>
  );
};

export default VideoPlayer;
