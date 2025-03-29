import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AlbumSongs } from '@/components/albums/AlbumSongs';
import { getAlbumDetails } from '@/app/actions/albums';

interface AlbumDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function AlbumDetailsPage({ params }: AlbumDetailsPageProps) {
  const { id } = await params;
  const { album, songs } = await getAlbumDetails(id);

  if (!album) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Suspense fallback={
        <div className="space-y-6">
          <div className="flex gap-8 items-end">
            <div className="animate-pulse">
              <div className="w-48 h-48 bg-[#333] rounded-md"></div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-[#333] rounded w-1/4"></div>
              <div className="h-4 bg-[#333] rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-12 bg-[#333] rounded"></div>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-16 bg-[#333] rounded"></div>
            ))}
          </div>
        </div>
      }>
        <div className="flex gap-8 items-end">
          <div className="w-48 h-48 rounded-md overflow-hidden">
            <img 
              src={album.imageUrl || 'https://picsum.photos/seed/album/300/300'} 
              alt={album.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-4">{album.title}</h1>
            <Link 
              href={`/artists/${album.artist.id}`}
              className="text-lg text-text-secondary hover:underline"
            >
              {album.artist.name}
            </Link>
            <p className="text-text-secondary mt-2">
              Released {new Date(album.releaseDate).getFullYear()}
            </p>
          </div>
        </div>

        <AlbumSongs album={album} songs={songs} />
      </Suspense>
    </div>
  );
} 