'use client';

import { useState } from 'react';
import type { Album } from '@/api-types/models/Album';

interface AlbumSortProps {
  albums: Album[];
  onSortedAlbums: (albums: Album[]) => void;
}

export function AlbumSort({ albums, onSortedAlbums }: AlbumSortProps) {
  const [sortBy, setSortBy] = useState<'title' | 'artist' | 'recent'>('title');

  const handleSort = (value: 'title' | 'artist' | 'recent') => {
    setSortBy(value);
    const sorted = [...albums].sort((a, b) => {
      if (value === 'title') {
        return a.title.localeCompare(b.title);
      } else if (value === 'artist') {
        return a.artist.name.localeCompare(b.artist.name);
      } else {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      }
    });
    onSortedAlbums(sorted);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-text-secondary">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => handleSort(e.target.value as 'title' | 'artist' | 'recent')}
        className="bg-[#333] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="title">Title</option>
        <option value="artist">Artist</option>
        <option value="recent">Release Date</option>
      </select>
    </div>
  );
} 