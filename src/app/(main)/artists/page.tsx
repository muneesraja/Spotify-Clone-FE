import { Suspense } from 'react';
import { ArtistList } from '@/components/artists/ArtistList';
import { getAllArtists } from '@/app/actions/artists';

export default async function ArtistsPage() {
  const artists = await getAllArtists();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Artists</h1>
        <p className="text-text-secondary">
          Discover amazing artists and their music
        </p>
      </div>

      <Suspense fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-[#333] rounded-full aspect-square mb-2"></div>
              <div className="bg-[#333] h-4 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      }>
        {artists.length === 0 ? (
          <div className="bg-[#333] p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">No artists found</h3>
            <p className="text-text-secondary">
              There are no artists available at the moment.
            </p>
          </div>
        ) : (
          <ArtistList initialArtists={artists} />
        )}
      </Suspense>
    </div>
  );
} 