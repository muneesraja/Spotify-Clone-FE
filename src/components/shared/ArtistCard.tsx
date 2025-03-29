import Link from 'next/link';
import type { Artist } from '@/api-types/models/Artist';

interface ArtistProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistProps) {
  return (
    <Link href={`/artists/${artist.id}`} className="card group flex flex-col items-center text-center">
      <div className="relative mb-4 rounded-full overflow-hidden w-36 h-36">
        <img 
          src={artist.imageUrl} 
          alt={artist.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-bold text-white mb-1">{artist.name}</h3>
      <p className="text-sm text-text-secondary">Artist</p>
    </Link>
  );
} 