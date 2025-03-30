import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ArtistAlbums } from '@/components/artists/ArtistAlbums';
import { getArtistDetails } from '@/app/actions/artists';

interface ArtistDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtistDetailsPage({ params }: ArtistDetailsPageProps) {
  const { id } = await params;
  const { artist, albums } = await getArtistDetails(id);

  if (!artist) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Suspense fallback={
        <div className="space-y-6">
          <div className="flex gap-8 items-end">
            <div className="animate-pulse">
              <div className="w-48 h-48 bg-[#333] rounded-full"></div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-[#333] rounded w-1/4"></div>
              <div className="h-4 bg-[#333] rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-12 bg-[#333] rounded"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-[#333] rounded-md aspect-square mb-2"></div>
                  <div className="bg-[#333] h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }>
        <div className="flex gap-8 items-end">
          <div className="w-48 h-48 rounded-full overflow-hidden">
            <img 
              src={artist.imageUrl || 'https://picsum.photos/seed/artist/300/300'} 
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-4">{artist.name}</h1>
            {artist.description && (
              <p className="text-text-secondary text-lg max-w-2xl">
                {artist.description}
              </p>
            )}
          </div>
        </div>

        <ArtistAlbums artist={artist} albums={albums} />
      </Suspense>
    </div>
  );
} 