'use client';

import SongList from '@/components/shared/SongList';
import type { Album } from '@/api-types/models/Album';
import type { Song } from '@/api-types/models/Song';

interface AlbumSongsProps {
  album: Album;
  songs: Song[];
}

export function AlbumSongs({ album, songs }: AlbumSongsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Songs</h2>
      <SongList 
        songs={songs}
        showHeader={false}
        emptyMessage={`No songs found in ${album.title}`}
      />
    </div>
  );
} 