'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Player() {
  const router = useRouter();
  const { isAuthenticated, requireAuth } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(30);
  
  useEffect(() => {
    // Reset player state when auth state changes
    if (!isAuthenticated) {
      setIsPlaying(false);
    }
  }, [isAuthenticated]);
  
  const handlePlayPause = () => {
    if (!isAuthenticated) {
      requireAuth();
      return;
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleLike = () => {
    if (!isAuthenticated) {
      requireAuth();
      return;
    }
    // Handle like logic here
  };

  return (
    <div className="player-bar flex items-center justify-between px-4 bg-[#181818] border-t border-[#282828] h-full">
      {/* Song Info */}
      <div className="flex items-center gap-3 w-1/4">
        <div className="w-14 h-14 bg-[#282828] rounded flex-shrink-0 overflow-hidden">
          <img 
            src="https://picsum.photos/id/65/56/56" 
            alt="Song cover" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="truncate">
          <p className="text-sm font-medium truncate">Song Title</p>
          <p className="text-xs text-text-secondary truncate">Artist Name</p>
        </div>
        <button 
          className="text-text-secondary hover:text-white"
          onClick={handleLike}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3.56911C7.26392 2.84576 6.38897 2.45001 5.5 2.45001C3.7239 2.45001 2.3 3.87391 2.3 5.65001C2.3 7.98091 4.4 9.99871 7.55 12.8522L8 13.2681L8.45 12.8522C11.6 9.99871 13.7 7.98091 13.7 5.65001C13.7 3.87391 12.2761 2.45001 10.5 2.45001C9.61103 2.45001 8.73608 2.84576 8 3.56911Z" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2 w-2/4">
        <div className="flex items-center gap-4">
          <button className="text-text-secondary hover:text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.33 12L13.33 4M13.33 4L8.66 8M13.33 4L8.66 4M8.66 12L8.66 4M8.66 4L3.99 8M8.66 4L3.99 4M3.99 12L3.99 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="text-text-secondary hover:text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L4 12M4 4L12 8L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            onClick={handlePlayPause}
            className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="3" width="2" height="10" rx="1" fill="currentColor"/>
                <rect x="10" y="3" width="2" height="10" rx="1" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4.5L12 8L5 11.5V4.5Z" fill="currentColor"/>
              </svg>
            )}
          </button>
          <button className="text-text-secondary hover:text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L12 12M12 12L4 8L12 12M12 12L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="text-text-secondary hover:text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.66 12L2.66 4M2.66 4L7.33 8M2.66 4L7.33 4M7.33 12L7.33 4M7.33 4L12 8M7.33 4L12 4M12 12L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="flex items-center gap-2 w-full max-w-lg">
          <span className="text-xs text-text-secondary">1:30</span>
          <div className="relative flex-grow h-1 bg-[#4D4D4D] rounded-full">
            <div 
              className="absolute h-full bg-white rounded-full hover:bg-primary cursor-pointer"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-text-secondary">4:30</span>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="flex items-center gap-3 justify-end w-1/4">
        <button className="text-text-secondary hover:text-white">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8C14 9.58 13.24 11 12 12M9 2.80001C9.5 3.20001 10 3.60001 10.4 4.00001C11.67 5.27001 12.5 6.58001 12.5 8.00001C12.5 9.42001 11.67 10.73 10.4 12C10 12.4 9.5 12.8 9 13.2M3 10H4.5L8 13V3.00001L4.5 6.00001H2C1.45 6.00001 1 6.45001 1 7.00001V9.00001C1 9.55001 1.45 10 2 10H3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="relative w-24 h-1 bg-[#4D4D4D] rounded-full">
          <div 
            className="absolute h-full bg-white rounded-full hover:bg-primary cursor-pointer"
            style={{ width: `${volume}%` }}
          ></div>
        </div>
        <button className="text-text-secondary hover:text-white">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 2H8.5V14H4C2.89543 14 2 13.1046 2 12V4C2 2.89543 2.89543 2 4 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.5 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H8.5V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
} 