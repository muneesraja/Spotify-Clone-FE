'use client';

import { useState } from 'react';
import type { Artist } from '@/api-types/models/Artist';

interface ArtistSortProps {
  artists: Artist[];
  onSortedArtists: (artists: Artist[]) => void;
}

export function ArtistSort({ artists, onSortedArtists }: ArtistSortProps) {
  const [sortBy, setSortBy] = useState<'name' | 'recent'>('name');

  const handleSort = (value: 'name' | 'recent') => {
    setSortBy(value);
    const sorted = [...artists].sort((a, b) => {
      if (value === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
    onSortedArtists(sorted);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-text-secondary">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => handleSort(e.target.value as 'name' | 'recent')}
        className="bg-[#333] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="name">Name</option>
        <option value="recent">Recently Added</option>
      </select>
    </div>
  );
} 