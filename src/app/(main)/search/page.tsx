'use client';

import { useSearchParams } from 'next/navigation';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { Song } from '@/api-types/models/Song'; // Import specific types
import { Artist } from '@/api-types/models/Artist';
import { Album } from '@/api-types/models/Album';

// Card Components
import { SongCard } from '@/components/shared/SongCard';
import { ArtistCard } from '@/components/shared/ArtistCard';
import { AlbumCard } from '@/components/shared/AlbumCard';

interface SearchResultsProps {
  query: string;
}

interface SearchResults {
  songs: Song[];
  artists: Artist[];
  albums: Album[];
}

function SearchResults({ query }: SearchResultsProps) {
  // Adjust destructuring based on the hook's actual return type
  const { data: searchResults, isLoading, isFetching, isError, error } = useSearchQuery(query);
  console.log(searchResults);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error searching: {error?.message || 'Unknown error'}</p>;

  // --- CONCISE FIX based on error "Property 'albums' does not exist on type 'Song[]'" ---
  // Treat searchResults as Song[] as per TS error
  const songs = (searchResults.songs ?? []) as Song[]; 
  // Artists and Albums are not available in Song[], initialize as empty for now
  const artists = (searchResults.artists ?? []) as Artist[]; 
  const albums = (searchResults.albums ?? []) as Album[];
  // --- End Concise Fix ---

  const hasSongs = songs.length > 0;
  const hasArtists = artists.length > 0;
  const hasAlbums = albums.length > 0;
  const hasResults = hasSongs || hasArtists || hasAlbums;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Results for {query}</h1>
      {isFetching && <p>Fetching results...</p>}
      
      {!hasResults && !isFetching && (
        <p className="text-text-secondary">No results found for {query}.</p>
      )}
      {hasSongs && (
        <section>
          <h2 className="text-xl font-bold mb-4">Songs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {songs.map(song => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </section>
      )}

      {/* These sections will not render with this concise fix */}
      {hasArtists && (
        <section>
          <h2 className="text-xl font-bold mb-4">Artists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {artists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
      )}

      {hasAlbums && (
        <section>
          <h2 className="text-xl font-bold mb-4">Albums</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {albums.map(album => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function BrowseAll() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Browse all</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {['Pop', 'Hip-Hop', 'Rock', 'Electronic', 'Indie', 'Jazz', 'Classical', 'R&B', 'Country', 'Metal'].map((genre, index) => (
          <div
            key={index}
            className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 cursor-pointer"
            style={{
              backgroundColor: `hsl(${index * 36}, 70%, 50%)`,
              background: `linear-gradient(135deg, hsl(${index * 36}, 70%, 50%), hsl(${index * 36 + 60}, 70%, 30%))`
            }}
          >
            <div className="absolute inset-0 p-4 flex items-end">
              <h3 className="text-white text-2xl font-bold">{genre}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Search Page Component
export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';

  // TODO: Implement search input

  return (
    <div className="space-y-8 pt-4">
      {/* Render search input here? */}
      
      {queryFromUrl ? (
        <SearchResults query={queryFromUrl} />
      ) : (
        <BrowseAll />
      )}
    </div>
  );
} 