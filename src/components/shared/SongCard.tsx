'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Song } from '@/api-types/models/Song';
import { LikeButton } from './LikeButton';
import Image from 'next/image';
import { PlayIcon } from '@heroicons/react/24/outline';
import { usePlayerStore } from '@/store/playerStore';

interface SongProps {
  song: Song;
}

export function SongCard({ song }: SongProps) {
  const [, setIsHovered] = useState<boolean>(false);
  const playSong = usePlayerStore((state) => state.playSong);
  
  const artistId = typeof song.artist === 'string' ? null : song.artist?.id;
  const artistName = typeof song.artist === 'string' ? song.artist : song.artist?.name;
  
  return (
    <div 
      className="card group relative transition-all duration-300 hover:cursor-pointer w-40 flex-shrink-0" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4 rounded-md overflow-hidden">
        <Image 
          src={song.imageUrl || (typeof song.artist !== 'string' ? song.artist?.imageUrl : 'https://picsum.photos/160/160')} 
          alt={song.title} 
          className="w-full h-full aspect-square object-cover bg-neutral-700"
          width={160}
          height={160}
        />
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => playSong(song.id)}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <PlayIcon className="w-5 h-5" />
          </button>
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
