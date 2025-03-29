import { Suspense } from 'react';
import { AlbumList } from '@/components/albums/AlbumList';
import { getAllAlbums } from '@/app/actions/albums';

export default async function AlbumsPage() {
  const albums = await getAllAlbums();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Albums</h1>
        <p className="text-text-secondary">
          Explore our collection of albums and singles
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
        {albums.length === 0 ? (
          <div className="bg-[#333] p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">No albums found</h3>
            <p className="text-text-secondary">
              There are no albums available at the moment.
            </p>
          </div>
        ) : (
          <AlbumList initialAlbums={albums} />
        )}
      </Suspense>
    </div>
  );
} 