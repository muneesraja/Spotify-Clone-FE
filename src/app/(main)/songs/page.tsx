import { Suspense } from 'react';
import { SongList } from '@/components/songs/SongList';
import { getAllSongs } from '@/app/actions/songs';
import type { Song } from '@/api-types/models/Song';
import type { Artist } from '@/api-types/models/Artist';

interface SongWithArtist extends Omit<Song, 'artist'> {
  artist: Artist;
  releaseDate: string;
}

export default async function SongsPage() {
  const songs = await getAllSongs() as SongWithArtist[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Songs</h1>
        <p className="text-text-secondary">
          Explore our collection of songs
        </p>
      </div>

      <Suspense fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-[#333] rounded-md aspect-square mb-2"></div>
              <div className="bg-[#333] h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-[#333] h-3 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      }>
        {songs.length === 0 ? (
          <div className="bg-[#333] p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">No songs found</h3>
            <p className="text-text-secondary">
              There are no songs available at the moment.
            </p>
          </div>
        ) : (
          <SongList initialSongs={songs} />
        )}
      </Suspense>
    </div>
  );
} 