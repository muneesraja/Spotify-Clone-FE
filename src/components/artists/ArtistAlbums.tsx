'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Artist } from '@/api-types/models/Artist';
import type { Album } from '@/api-types/models/Album';

interface ArtistAlbumsProps {
  artist: Artist;
  albums: Album[];
}

export function ArtistAlbums({ artist, albums }: ArtistAlbumsProps) {
  const [sortBy, setSortBy] = useState<'title' | 'recent'>('recent');

  const sortedAlbums = [...albums].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    }
  });

  if (albums.length === 0) {
    return (
      <div className="bg-[#333] p-6 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">No albums found</h3>
        <p className="text-text-secondary">
          {artist.name} hasn't released any albums yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Albums by {artist.name}</h2>
        <div className="flex items-center gap-3">
          <span className="text-text-secondary">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'title' | 'recent')}
            className="bg-[#333] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="recent">Release Date</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {sortedAlbums.map((album) => (
          <Link 
            key={album.id} 
            href={`/albums/${album.id}`}
            className="group bg-[#282828] p-4 rounded-md hover:bg-[#333] transition-colors flex flex-col"
          >
            <div className="aspect-square mb-4 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={album.imageUrl || 'https://picsum.photos/seed/album/300/300'}
                alt={album.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="mt-auto">
              <h3 className="font-medium mb-1 truncate">{album.title}</h3>
              <p className="text-sm text-text-secondary">
                {new Date(album.releaseDate).getFullYear()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 