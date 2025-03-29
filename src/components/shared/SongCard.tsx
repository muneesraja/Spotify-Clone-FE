'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SongCardActions } from './SongCardActions';
import type { Song } from '@/api-types/models/Song';
import type { Artist } from '@/api-types/models/Artist';

interface SongProps {
  song: Song & {
    artist: Artist;
  };
  onLikeChange?: () => void;
}

export function SongCard({ song, onLikeChange }: SongProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="card group relative transition-all duration-300 hover:cursor-pointer w-40 flex-shrink-0" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4 rounded-md overflow-hidden">
        <img 
          src={song.imageUrl || song.artist.imageUrl} 
          alt={song.title} 
          className="w-full h-full aspect-square object-cover"
        />
        <SongCardActions 
          songId={song.id} 
          isHovered={isHovered} 
          onLikeChange={onLikeChange} 
          isLiked={!!song.isLiked}
        /> 
      </div>
      <Link href={`/songs/${song.id}`}>
        <h3 className="font-bold text-white mb-1 line-clamp-1">{song.title}</h3>
      </Link>
      {song.artist && (
        <div className="text-sm text-text-secondary line-clamp-2">
          <Link href={`/artists/${song.artist.id}`}>
            {song.artist.name}
          </Link>
        </div>
      )}
    </div>
  );
}
