'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Song } from '@/api-types/models/Song';
import { LikeButton } from './LikeButton';

interface SongProps {
  song: Song;
}

export function SongCard({ song }: SongProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const artistId = typeof song.artist === 'string' ? null : song.artist?.id;
  const artistName = typeof song.artist === 'string' ? song.artist : song.artist?.name;
  
  return (
    <div 
      className="card group relative transition-all duration-300 hover:cursor-pointer w-40 flex-shrink-0" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4 rounded-md overflow-hidden">
        <img 
          src={song.imageUrl || (typeof song.artist !== 'string' ? song.artist?.imageUrl : '')} 
          alt={song.title} 
          className="w-full h-full aspect-square object-cover bg-neutral-700"
        />
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <LikeButton songId={song.id} className="bg-[#181818]/70 backdrop-blur-sm" />
        </div>
      </div>
      <Link href={`/songs/${song.id}`}>
        <h3 className="font-bold text-white mb-1 line-clamp-1">{song.title}</h3>
      </Link>
      {artistName && (
        <div className="text-sm text-text-secondary line-clamp-2">
          {artistId ? (
            <Link href={`/artists/${artistId}`}>
              {artistName}
            </Link>
          ) : (
            <span>{artistName}</span>
          )}
        </div>
      )}
    </div>
  );
}
