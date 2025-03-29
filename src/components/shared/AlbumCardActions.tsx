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
      console.log(`Playing album: ${albumId}`);
    }
  };

  return (
    <div className={`absolute inset-0 flex items-center justify-center gap-4 bg-black/40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
      <button 
        onClick={handlePlay}
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Play album"
      >
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 14V0L10 7L0 14Z" fill="black"/>
        </svg>
      </button>
    </div>
  );
} 