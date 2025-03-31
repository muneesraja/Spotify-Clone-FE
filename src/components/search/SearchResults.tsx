'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchItems } from '@/lib/api/search';
import { SongCard } from '@/components/shared/SongCard';
import { AlbumCard } from '@/components/shared/AlbumCard';
import { ArtistCard } from '@/components/shared/ArtistCard';
import type { SearchResponse, Song as SearchSong, Album as SearchAlbum, Artist as SearchArtist } from '@/types/search';

// Import the types expected by the cards
import type { Artist as ApiArtist } from '@/api-types/models/Artist';
import type { Album as ApiAlbum } from '@/api-types/models/Album';
import type { Song as ApiSong } from '@/api-types/models/Song';

// Import the BrowseAll component
import { BrowseAll } from './BrowseAll'; // Assuming BrowseAll is in the same directory

// Import the Spinner component
import { Spinner } from '@/components/shared/Spinner';

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const { data, isLoading, isError, error } = useQuery<SearchResponse, Error>({
    queryKey: ['search', query],
    queryFn: () => searchItems(query || ''),
    enabled: !!query,
  });

  // --- Data Mapping --- 
  const mappedArtists: ApiArtist[] = data?.artists.map((artist: SearchArtist) => ({
    ...artist,
    albums: [], // Add missing required property
    // songs: [], // Removed: Artist type might also need songs? Add if required by ApiArtist
  })) || [];

  const mappedAlbums: (ApiAlbum & { artist?: ApiArtist })[] = data?.albums.map((album: SearchAlbum) => ({
    ...album,
    artist: { // Map nested artist
        ...album.artist,
        albums: [], // Add missing property for nested artist
        // songs: [], // Removed: Add missing property for nested artist
    },
    songs: [], // Add missing required property
  })) || [];

  // Corrected song mapping
  const mappedSongs: ApiSong[] = data?.songs.map((song: SearchSong): ApiSong => {
    // Explicitly map SearchSong to ApiSong, handling nested structures
    const mappedArtist: ApiArtist = {
      ...song.artist,
      // Add any missing required fields for ApiArtist, default/empty if needed
      albums: [], 
      // songs: [], // ApiArtist might not require songs directly here
    };

    const mappedAlbum: ApiAlbum = {
      ...song.album,
      artist: mappedArtist, // Use the mapped artist
      // Add any missing required fields for ApiAlbum
      songs: [], 
    };

    return {
      ...song,
      artist: mappedArtist,
      album: mappedAlbum,
      // Map other fields if they differ, e.g., ensure types match
      // duration: Number(song.duration), // Example if type was string
    };
  }) || [];
  // --- End Data Mapping ---

  if (!query) {
    // Render BrowseAll component when there is no search query
    return <BrowseAll />;
  }

  if (isLoading) {
    // Render Spinner when loading
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    console.error("Search Error:", error);
    return <div className="text-center text-red-500 p-4">Error loading search results. Please try again later.</div>;
  }

  const hasResults = mappedSongs.length > 0 || mappedAlbums.length > 0 || mappedArtists.length > 0;

  if (!hasResults) {
    return <div className="text-center text-text-secondary p-4">No results found for "{query}".</div>;
  }

  return (
    <div className="space-y-6">
      {mappedSongs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">Songs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {mappedSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </section>
      )}

      {mappedAlbums.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">Albums</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {mappedAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}

      {mappedArtists.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">Artists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {mappedArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
} 