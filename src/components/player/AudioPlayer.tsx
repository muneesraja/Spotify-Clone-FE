'use client';

import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '@/store/playerStore';
import { PlayIcon, PauseIcon, XMarkIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentSong,
    isPlaying,
    isVisible,
    isLoading,
    error,
    volume,
    pauseSong,
    resumeSong,
    stopSong,
    setVolume,
  } = usePlayerStore();
  const temp_url = 'https://spoty.mindlyq.com';
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  // Handle audio playback
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error('Failed to play audio:', err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Handle time update
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progress);
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  if (!isVisible || !currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Song Info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-800 rounded-md flex-shrink-0" />
          <div>
            <h3 className="text-white font-medium">{currentSong.title}</h3>
            <p className="text-gray-400 text-sm">{currentSong.artist.name}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-6">
          {/* Play/Pause Button */}
          <button
            onClick={isPlaying ? pauseSong : resumeSong}
            className="text-white hover:text-gray-300 transition-colors"
            disabled={isLoading}
          >
            {isPlaying ? (
              <PauseIcon className="w-8 h-8" />
            ) : (
              <PlayIcon className="w-8 h-8" />
            )}
          </button>

          {/* Progress Bar */}
          <div
            className="w-64 h-1 bg-gray-700 rounded-full cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <div
              className="absolute left-0 top-0 h-full bg-white rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="w-5 h-5" />
              ) : (
                <SpeakerWaveIcon className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24"
            />
          </div>

          {/* Close Button */}
          <button
            onClick={stopSong}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={`${temp_url}${currentSong.url}`}
        onTimeUpdate={handleTimeUpdate}
        onEnded={stopSong}
        onError={(e) => {
          console.error('Audio playback error:', e);
          stopSong();
        }}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute inset-0 bg-red-900 bg-opacity-50 flex items-center justify-center">
          <p className="text-white">{error}</p>
        </div>
      )}
    </div>
  );
} 