'use client';

import { Volume2, Play, Square, Pause } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

interface TTSPlayerProps {
  text: string;
}

const cleanText = (html: string) => {
  if (!html || typeof html !== 'string') return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

// Chunk text by sentences to avoid limits
const chunkText = (text: string, maxLen = 200): string[] => {
  if (!text || typeof text !== 'string') return [];
  
  // Split by sentence endings
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  
  // If no sentence patterns found, split by length
  if (sentences.length === 0) {
    const words = text.split(' ');
    const chunks: string[] = [];
    let current = '';
    
    for (const word of words) {
      if ((current + ' ' + word).length > maxLen && current) {
        chunks.push(current.trim());
        current = word;
      } else {
        current += (current ? ' ' : '') + word;
      }
    }
    if (current) chunks.push(current.trim());
    return chunks.filter(chunk => chunk.length > 0);
  }
  
  // Combine sentences into chunks
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if ((current + ' ' + trimmedSentence).length > maxLen && current) {
      chunks.push(current.trim());
      current = trimmedSentence;
    } else {
      current += (current ? ' ' : '') + trimmedSentence;
    }
  }
  if (current) chunks.push(current.trim());
  
  return chunks.filter(chunk => chunk.length > 0);
};

export default function TTSPlayer({ text }: TTSPlayerProps) {
  const [rate, setRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [chunks, setChunks] = useState<string[]>([]);
  
  const isPlayingRef = useRef(false);
  const isPausedRef = useRef(false);
  const currentIndexRef = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    if (!text) {
      setChunks([]);
      return;
    }
    const cleaned = cleanText(text);
    if (cleaned) {
      const chunkedText = chunkText(cleaned);
      setChunks(chunkedText);
      console.log(`Created ${chunkedText.length} chunks from ${cleaned.length} characters`);
    } else {
      setChunks([]);
    }
  }, [text]);

  const stopAllSpeech = useCallback(() => {
    const synth = window.speechSynthesis;
    if (synth.speaking || synth.pending) {
      synth.cancel();
    }
  }, []);

  const pauseSpeech = useCallback(() => {
    const synth = window.speechSynthesis;
    if (synth.speaking && !synth.paused) {
      synth.pause();
    }
  }, []);

  const resumeSpeechAPI = useCallback(() => {
    const synth = window.speechSynthesis;
    if (synth.paused) {
      synth.resume();
      return true;
    }
    return false;
  }, []);

  const speakChunk = useCallback((index: number) => {
    // If not mounted, out of range or playback stopped -> teardown
    if (!isMountedRef.current || index >= chunks.length || !isPlayingRef.current) {
      console.log('Stopping playback:', { mounted: isMountedRef.current, index, total: chunks.length, playing: isPlayingRef.current });
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentChunkIndex(0);
      currentIndexRef.current = 0;
      isPlayingRef.current = false;
      isPausedRef.current = false;
      stopAllSpeech();
      return;
    }

    console.log(`Speaking chunk ${index + 1} of ${chunks.length}`);

    // Cancel any queued/pending speech to avoid overlaps
    const synth = window.speechSynthesis;
    if (!synth.paused) {
      stopAllSpeech();
    }

    // No delay - speak immediately
    if (!isPlayingRef.current) return;

    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.rate = rate;
    utterance.lang = 'en-US';
    utterance.volume = 1;
    utterance.pitch = 1;

    utterance.onstart = () => {
      console.log(`Started chunk ${index + 1}`);
    };

    utterance.onend = () => {
      console.log(`Ended chunk ${index + 1}`);
      
      // If playback was paused or component unmounted, don't advance
      if (!isPlayingRef.current || !isMountedRef.current) {
        console.log('Playback stopped or unmounted after end');
        return;
      }

      const nextIndex = index + 1;
      if (nextIndex < chunks.length) {
        currentIndexRef.current = nextIndex;
        setCurrentChunkIndex(nextIndex);
        // No delay - continue immediately to next chunk
        if (isPlayingRef.current && !isPausedRef.current) {
          speakChunk(nextIndex);
        }
      } else {
        console.log('All chunks completed');
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentChunkIndex(0);
        currentIndexRef.current = 0;
        isPlayingRef.current = false;
        isPausedRef.current = false;
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      const nextIndex = index + 1;
      if (nextIndex < chunks.length && isPlayingRef.current) {
        // No delay
        if (isPlayingRef.current) {
          currentIndexRef.current = nextIndex;
          setCurrentChunkIndex(nextIndex);
          speakChunk(nextIndex);
        }
      } else {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentChunkIndex(0);
        currentIndexRef.current = 0;
        isPlayingRef.current = false;
        isPausedRef.current = false;
      }
    };

    // Speak current chunk immediately
    synth.speak(utterance);
  }, [chunks, rate, stopAllSpeech]);

  const handlePlay = useCallback(() => {
    if (chunks.length === 0) {
      console.log('No chunks to play');
      return;
    }
    
    console.log(`Starting playback with ${chunks.length} chunks`);
    
    // Stop any existing queued speech first
    stopAllSpeech();
    
    // Set playing state
    isPlayingRef.current = true;
    isPausedRef.current = false;
    setIsPlaying(true);
    setIsPaused(false);
    
    // Start from beginning
    currentIndexRef.current = 0;
    setCurrentChunkIndex(0);
    
    // No delay - start immediately
    speakChunk(0);
  }, [chunks.length, speakChunk, stopAllSpeech]);

  const handlePause = useCallback(() => {
    console.log('Pausing playback');
    
    if (!isPlayingRef.current) {
      console.log('Not playing, nothing to pause');
      return;
    }

    // Pause via speechSynthesis.pause() so the current utterance can be resumed
    pauseSpeech();

    isPausedRef.current = true;
    isPlayingRef.current = false;
    setIsPaused(true);
    setIsPlaying(false);
  }, [pauseSpeech]);

  const handleResume = useCallback(() => {
    console.log('Resuming playback from chunk', currentIndexRef.current);
    
    // If speechSynthesis has a paused utterance, simply resume it immediately
    const resumed = resumeSpeechAPI();
    if (resumed) {
      isPausedRef.current = false;
      isPlayingRef.current = true;
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Otherwise, ensure playback flags and start speaking the current chunk immediately
    isPausedRef.current = false;
    isPlayingRef.current = true;
    setIsPaused(false);
    setIsPlaying(true);

    // No delay - resume immediately
    speakChunk(currentIndexRef.current);
  }, [speakChunk, resumeSpeechAPI]);

  const handleStop = useCallback(() => {
    console.log('Stopping playback');
    
    // Set flags to stop
    isPlayingRef.current = false;
    isPausedRef.current = false;
    setIsPlaying(false);
    setIsPaused(false);
    
    // Reset position
    currentIndexRef.current = 0;
    setCurrentChunkIndex(0);
    
    // Cancel all speech immediately
    stopAllSpeech();
  }, [stopAllSpeech]);

  useEffect(() => {
    // Cleanup on unmount
    isMountedRef.current = true;
    
    return () => {
      console.log('Component unmounting - cleaning up');
      isMountedRef.current = false;
      isPlayingRef.current = false;
      isPausedRef.current = false;
      stopAllSpeech();
    };
  }, [stopAllSpeech]);

  // Reset if text changes while playing
  useEffect(() => {
    if (isPlaying || isPaused) {
      handleStop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  if (!text || chunks.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
      {/* Play/Pause/Stop Buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Show Play button when not playing and not paused */}
        {!isPlaying && !isPaused && (
          <button
            onClick={handlePlay}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium cursor-pointer"
            aria-label="Play"
          >
            <Play className="w-4 h-4" fill="currentColor" />
            Listen to Article
          </button>
        )}

        {/* Show Pause and Stop buttons when playing */}
        {isPlaying && (
          <>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-gray-700">
                Segment {currentChunkIndex + 1} of {chunks.length}
              </span>
            </div>
            
            <div className="ml-auto flex gap-2">
              {/* <button
                onClick={handlePause}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium cursor-pointer"
                aria-label="Pause"
              >
                <Pause className="w-4 h-4" />
                Pause
              </button> */}
              
              <button
                onClick={handleStop}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium cursor-pointer"
                aria-label="Stop"
              >
                <Square className="w-4 h-4" fill="currentColor" />
                Stop
              </button>
            </div>
          </>
        )}

        {/* Show Resume and Stop buttons when paused */}
        {isPaused && (
          <>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-gray-700">
                Paused at segment {currentChunkIndex + 1} of {chunks.length}
              </span>
            </div>
            
            <div className="ml-auto flex gap-2">
              {/* <button
                onClick={handleResume}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer"
                aria-label="Resume"
              >
                <Play className="w-4 h-4" fill="currentColor" />
                Resume
              </button> */}
              
              <button
                onClick={handleStop}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium cursor-pointer"
                aria-label="Stop"
              >
                <Square className="w-4 h-4" fill="currentColor" />
                Stop
              </button>
            </div>
          </>
        )}
        
        <span className="ml-auto text-xs text-gray-500">
          {chunks.length} segments • {cleanText(text).length} chars
        </span>
      </div>

      {/* Progress bar */}
      {chunks.length > 1 && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentChunkIndex + 1) / chunks.length) * 100}%` }}
          ></div>
        </div>
      )}
      
      {/* Current chunk preview */}
      {chunks[currentChunkIndex] && (
        <div className="text-xs text-gray-400 border-t border-gray-200 pt-2">
          <span className="font-semibold">Current: </span>
          {chunks[currentChunkIndex]?.substring(0, 100)}...
        </div>
      )}
    </div>
  );
}