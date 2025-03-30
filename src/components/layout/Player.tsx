'use client';

import { useState, useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import Image from 'next/image';
import {
  currentSongAtom,
  isPlayingAtom,
  currentTimeAtom,
  durationAtom,
  volumeAtom,
  PlayerSong,
} from '@/lib/jotai/playerAtoms';
import {
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoPlay,
  IoPause,
  IoVolumeHigh,
  IoVolumeMedium,
  IoVolumeLow,
  IoVolumeOff,
} from 'react-icons/io5';

// Helper function to format time (e.g., 123 -> "2:03")
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function Player() {
  const [currentSong, setCurrentSong] = useAtom(currentSongAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [duration, setDuration] = useAtom(durationAtom);
  const [volume, setVolume] = useAtom(volumeAtom);

  const audioRef = useRef<HTMLAudioElement>(null);

  // --- Effects to sync audio element with Jotai state --- 

  // Effect to play/pause audio when isPlayingAtom changes
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(error => console.error("Error playing audio:", error));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Effect to change audio source when currentSongAtom changes
  useEffect(() => {
    if (audioRef.current && currentSong?.audioUrl) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load(); // Important to load the new source
      if (isPlaying) {
        // Auto-play if isPlaying was already true
        audioRef.current.play().catch(error => console.error("Error playing new audio:", error));
      } else {
         // Reset time if song changes and not playing
         setCurrentTime(0);
         setDuration(0);
      }
    }
  }, [currentSong?.id, currentSong?.audioUrl, isPlaying, setCurrentTime, setDuration]); // Depend on song ID and URL

  // Effect to update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // --- Event Handlers for Audio Element --- 

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // --- Event Handlers for UI Controls --- 

  const handlePlayPause = () => {
    if (!currentSong) return; // Don't toggle play if no song is loaded
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = Number(event.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime); // Update state immediately for smoother UI
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Placeholder for skip functionality (requires playlist context)
  const handleSkipForward = () => console.log('Skip Forward clicked');
  const handleSkipBack = () => console.log('Skip Back clicked');

  // Determine Volume Icon
  const VolumeIcon = volume === 0
    ? IoVolumeOff
    : volume < 0.3
    ? IoVolumeLow
    : volume < 0.7
    ? IoVolumeMedium
    : IoVolumeHigh;

  const artistName = typeof currentSong?.artist === 'string' 
    ? currentSong.artist 
    : currentSong?.artist?.name;

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)} // Stop playing when song ends
        // Optionally add onError handler
      />
      <div 
        className={`fixed bottom-0 right-0 bg-[#181818] border-t border-[#282828] px-4 py-3 text-white transition-transform duration-300 
                   left-0 lg:left-72 xl:left-80 
                   ${currentSong ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex items-center justify-between">
          {/* Song Info (Left) */}
          <div className="flex items-center gap-3 w-[30%] min-w-[180px]">
            {currentSong?.imageUrl && (
              <div className="w-14 h-14 relative flex-shrink-0">
                 <Image 
                   src={currentSong.imageUrl}
                   alt={currentSong.title}
                   fill
                   className="rounded object-cover"
                 />
               </div>
            )}
            {!currentSong?.imageUrl && (
               <div className="w-14 h-14 bg-[#282828] rounded flex-shrink-0"></div>
            )}
            <div className="truncate">
              <h4 className="text-sm font-medium truncate">{currentSong?.title ?? 'No song selected'}</h4>
              <p className="text-xs text-text-secondary truncate">{artistName ?? '---'}</p>
            </div>
          </div>
          
          {/* Playback Controls (Center) */}
          <div className="flex flex-col items-center flex-1 max-w-[722px] gap-2 px-4">
            <div className="flex items-center gap-4">
              <button onClick={handleSkipBack} className="text-text-secondary hover:text-white disabled:opacity-50" disabled={!currentSong}>
                <IoPlaySkipBack size={20} />
              </button>
              <button 
                onClick={handlePlayPause}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!currentSong}
              >
                {isPlaying ? (
                  <IoPause size={20} />
                ) : (
                  <IoPlay size={20} className="ml-[2px]"/> // Slight offset for visual centering
                )}
              </button>
              <button onClick={handleSkipForward} className="text-text-secondary hover:text-white disabled:opacity-50" disabled={!currentSong}>
                <IoPlaySkipForward size={20} />
              </button>
            </div>
            {/* Progress Bar */}
            <div className="w-full flex items-center gap-2 text-xs">
              <span className="text-text-secondary w-10 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                disabled={!currentSong || duration === 0}
                className="h-1 flex-1 accent-white hover:accent-primary bg-[#4D4D4D] rounded-full appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:opacity-0 [&:hover::-webkit-slider-thumb]:opacity-100"
                style={{
                  background: duration > 0 ? 
                    `linear-gradient(to right, white ${currentTime / duration * 100}%, #4d4d4d ${currentTime / duration * 100}%)`
                    : '#4d4d4d'
                }}
              />
              <span className="text-text-secondary w-10 text-left">{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Volume Controls (Right) */}
          <div className="flex items-center justify-end gap-2 w-[30%] min-w-[180px]">
            <button className="text-text-secondary hover:text-white" onClick={() => setVolume(volume === 0 ? 0.5 : 0)}> {/* Basic Mute Toggle */} 
              <VolumeIcon size={20} />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 accent-white hover:accent-primary bg-[#4D4D4D] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:opacity-0 [&:hover::-webkit-slider-thumb]:opacity-100"
              style={{
                background: `linear-gradient(to right, white ${volume * 100}%, #4d4d4d ${volume * 100}%)`
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
} 