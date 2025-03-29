'use client';

import { useState } from 'react';
import type { Song } from '@/api-types/models/Song';
import type { Artist } from '@/api-types/models/Artist';

interface SongWithArtist extends Omit<Song, 'artist'> {
  artist: Artist;
  releaseDate: string;
}

interface SongSortProps {
  songs: SongWithArtist[];
  onSortedSongs: (songs: SongWithArtist[]) => void;
}

export function SongSort({ songs, onSortedSongs }: SongSortProps) {
  const [sortBy, setSortBy] = useState<'title' | 'artist' | 'recent'>('title');

  const handleSort = (value: 'title' | 'artist' | 'recent') => {
    setSortBy(value);
    const sorted = [...songs].sort((a, b) => {
      if (value === 'title') {
        return a.title.localeCompare(b.title);
      } else if (value === 'artist') {
        return a.artist.name.localeCompare(b.artist.name);
      } else {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      }
    });
    onSortedSongs(sorted);
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