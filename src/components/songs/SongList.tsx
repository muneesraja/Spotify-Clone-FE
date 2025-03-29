'use client';

import { useState, useEffect } from 'react';
import { SongCard } from '@/components/shared/SongCard';
import { SongSort } from '@/components/songs/SongSort';
import type { Song } from '@/api-types/models/Song';
import type { Artist } from '@/api-types/models/Artist';

interface SongWithArtist extends Omit<Song, 'artist'> {
  artist: Artist;
  releaseDate: string;
}

interface SongListProps {
  initialSongs: SongWithArtist[];
}

export function SongList({ initialSongs }: SongListProps) {
  const [songs, setSongs] = useState(initialSongs);

  useEffect(() => {
    setSongs(initialSongs);
  }, [initialSongs]);

  return (
    <>
      <div className="flex justify-end mb-6">
        <SongSort songs={songs} onSortedSongs={setSongs} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {songs.map(song => (
          <SongCard key={song.id} song={song as unknown as Song & { artist: Artist }} />
        ))}
      </div>
    </>
  );
} 