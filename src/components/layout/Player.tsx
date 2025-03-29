'use client';

import { useState } from 'react';

export function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(30);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-[#181818] border-t border-[#282828] px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#282828] rounded"></div>
          <div>
            <h4 className="text-sm font-medium">Song Title</h4>
            <p className="text-xs text-text-secondary">Artist Name</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center flex-1 max-w-[722px] gap-2 px-4">
          <div className="flex items-center gap-6">
            <button className="text-text-secondary hover:text-white">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 4L2.66667 8L13.3333 12V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={handlePlayPause}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="3" width="2" height="10" rx="1" fill="black"/>
                  <rect x="10" y="3" width="2" height="10" rx="1" fill="black"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3L12 8L5 13V3Z" fill="black"/>
                </svg>
              )}
            </button>
            <button className="text-text-secondary hover:text-white">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.66667 4L13.3333 8L2.66667 12V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="w-full flex items-center gap-2 text-xs">
            <span className="text-text-secondary">0:00</span>
            <div className="h-1 flex-1 bg-[#4D4D4D] rounded-full">
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-text-secondary">3:45</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-text-secondary hover:text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 3.5H4.5C3.94772 3.5 3.5 3.94772 3.5 4.5V11.5C3.5 12.0523 3.94772 12.5 4.5 12.5H7.5C8.05228 12.5 8.5 12.0523 8.5 11.5V4.5C8.5 3.94772 8.05228 3.5 7.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.5 3.5H8.5C7.94772 3.5 7.5 3.94772 7.5 4.5V11.5C7.5 12.0523 7.94772 12.5 8.5 12.5H11.5C12.0523 12.5 12.5 12.0523 12.5 11.5V4.5C12.5 3.94772 12.0523 3.5 11.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="w-24">
            <div className="h-1 bg-[#4D4D4D] rounded-full">
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${volume}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 