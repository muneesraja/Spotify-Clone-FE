'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlbumCardActions } from './AlbumCardActions';
import type { Album } from '@/api-types/models/Album';
import type { Artist } from '@/api-types/models/Artist';
import Image from 'next/image';

interface AlbumProps {
  album: Album & {
     artist?: Artist;
  };
}

export function AlbumCard({ album }: AlbumProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="card group relative transition-all duration-300 hover:cursor-pointer w-40 flex-shrink-0" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/albums/${album.id}`} className="block">
        <div className="relative mb-4 rounded-md overflow-hidden">
          <Image 
            src={album.imageUrl || 'https://picsum.photos/160/160'} 
            alt={album.title} 
            className="w-full h-full aspect-square object-cover"
            width={160}
            height={160}
          />
          <AlbumCardActions albumId={album.id} isHovered={isHovered} />
        </div>
        <h3 className="font-bold text-white mb-1 line-clamp-1">{album.title}</h3>
      </Link>
      {album.artistId && (
          <Link 
            href={`/artists/${album.artistId}`} 
            className="text-sm text-text-secondary line-clamp-2 text-left hover:underline"
          >
            {album.artist?.name || 'Unknown Artist'}
          </Link>
      )}
    </div>
  );
}