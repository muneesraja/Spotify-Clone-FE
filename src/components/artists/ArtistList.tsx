'use client';

import { useState, useEffect } from 'react';
import { ArtistCard } from '@/components/shared/ArtistCard';
import { ArtistSort } from '@/components/artists/ArtistSort';
import type { Artist } from '@/api-types/models/Artist';

interface ArtistListProps {
  initialArtists: Artist[];
}

export function ArtistList({ initialArtists }: ArtistListProps) {
  const [artists, setArtists] = useState(initialArtists);

  useEffect(() => {
    setArtists(initialArtists);
  }, [initialArtists]);

  return (
    <>
      <div className="flex justify-end mb-6">
        <ArtistSort artists={artists} onSortedArtists={setArtists} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {artists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </>
  );
} 