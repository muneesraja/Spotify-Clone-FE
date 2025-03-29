'use client';

import { playAlbum } from '@/app/actions/albums';

interface AlbumCardActionsProps {
  albumId: string;
  isHovered: boolean;
}

export function AlbumCardActions({ albumId, isHovered }: AlbumCardActionsProps) {
  const handlePlay = async () => {
    const result = await playAlbum(albumId);
    if (result.success) {
      // Play album logic would go here
      console.log(`Playing album: ${albumId}`);
    }
  };

  return (
    <button 
      onClick={handlePlay}
      className={`absolute right-2 bottom-2 bg-primary p-3 rounded-full text-black hover:bg-primary-hover shadow-lg transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-90'}`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 3L12 8L5 13V3Z" fill="currentColor"/>
      </svg>
    </button>
  );
} 