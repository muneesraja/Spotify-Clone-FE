import Link from 'next/link';
import type { Artist } from '@/api-types/models/Artist';
import Image from 'next/image';
interface ArtistProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistProps) {
  return (
    <Link 
      href={`/artists/${artist.id}`} 
      className="card group flex flex-col items-center text-center w-40 flex-shrink-0"
    >
      <div className="relative mb-4 rounded-full overflow-hidden w-32 h-32">
        <Image 
          src={artist.imageUrl || 'https://picsum.photos/160/160'} 
          alt={artist.name} 
          className="w-full h-full object-cover"
          width={160}
          height={160}
        />
      </div>
      <h3 className="font-bold text-white mb-1 line-clamp-1">{artist.name}</h3>
      <p className="text-sm text-text-secondary">Artist</p>
    </Link>
  );
} 