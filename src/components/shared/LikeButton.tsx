'use client';

import { useState, useCallback } from 'react';
import { useLikedSongsStore } from '@/store/likedSongsStore';

interface LikeButtonProps {
  songId: string;
  className?: string; // Allow passing additional classes
}

// SVG for the filled heart icon
const FilledHeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M8 3.56911C7.26392 2.84576 6.38897 2.45001 5.5 2.45001C3.7239 2.45001 2.3 3.87391 2.3 5.65001C2.3 7.98091 4.4 9.99871 7.55 12.8522L8 13.2681L8.45 12.8522C11.6 9.99871 13.7 7.98091 13.7 5.65001C13.7 3.87391 12.2761 2.45001 10.5 2.45001C9.61103 2.45001 8.73608 2.84576 8 3.56911Z" 
    />
  </svg>
);

// SVG for the outline heart icon
const OutlineHeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M8 3.56911C7.26392 2.84576 6.38897 2.45001 5.5 2.45001C3.7239 2.45001 2.3 3.87391 2.3 5.65001C2.3 7.98091 4.4 9.99871 7.55 12.8522L8 13.2681L8.45 12.8522C11.6 9.99871 13.7 7.98091 13.7 5.65001C13.7 3.87391 12.2761 2.45001 10.5 2.45001C9.61103 2.45001 8.73608 2.84576 8 3.56911Z" 
      stroke={'currentColor'}
      strokeWidth="1.3"
    />
  </svg>
);

export function LikeButton({ songId, className = '' }: LikeButtonProps) {
  const isLiked = useLikedSongsStore((state) => state.isLiked(songId));
  const toggleLike = useLikedSongsStore((state) => state.toggleLike);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleLike = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent triggering parent onClick handlers (like play song)
    event.preventDefault(); // Prevent default button behavior if necessary

    setIsToggling(true);
    try {
      await toggleLike(songId);
    } catch (error) {
      // Error is already handled in the store, maybe add component-specific feedback?
      console.error('LikeButton: Failed to toggle like status', error);
    } finally {
      setIsToggling(false);
    }
  }, [songId, toggleLike]);

  return (
    <button
      onClick={handleToggleLike}
      disabled={isToggling}
      className={`p-2 rounded-full hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isLiked ? 'text-primary' : 'text-text-secondary hover:text-white'} ${className}`}
      aria-label={isLiked ? 'Unlike song' : 'Like song'}
    >
      {isLiked ? <FilledHeartIcon /> : <OutlineHeartIcon />}
    </button>
  );
} 