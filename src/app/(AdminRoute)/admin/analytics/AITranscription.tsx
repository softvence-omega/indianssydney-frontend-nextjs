"use client"

import { useState } from "react";

// AI Transcription Component
const AITranscription: React.FC = () => {
  const [progress] = useState(67);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Transcription</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <span className="text-orange-600 font-bold text-lg">{progress}%</span>
          </div>
          <div>
            <div className="text-sm text-gray-600">Complete Processing</div>
            <div className="text-lg font-semibold text-gray-800">12 audio files</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AITranscription;