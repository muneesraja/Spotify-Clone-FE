'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SongCardActions } from './SongCardActions';
import type { PlayerSong } from '@/lib/jotai/playerAtoms';

interface SongProps {
  song: PlayerSong;
  onLikeChange?: () => void;
}

export function SongCard({ song, onLikeChange }: SongProps) {
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
        <SongCardActions 
          song={song}
          isHovered={isHovered} 
          onLikeChange={onLikeChange}
        /> 
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
