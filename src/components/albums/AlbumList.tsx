'use client';

import { useState, useEffect } from 'react';
import { AlbumCard } from '@/components/shared/AlbumCard';
import { AlbumSort } from '@/components/albums/AlbumSort';
import type { Album } from '@/api-types/models/Album';

interface AlbumListProps {
  initialAlbums: Album[];
}

export function AlbumList({ initialAlbums }: AlbumListProps) {
  const [albums, setAlbums] = useState(initialAlbums);

  useEffect(() => {
    setAlbums(initialAlbums);
  }, [initialAlbums]);

  return (
    <>
      <div className="flex justify-end mb-6">
        <AlbumSort albums={albums} onSortedAlbums={setAlbums} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {albums.map(album => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </>
  );
} 