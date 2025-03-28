'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// Card Components
import SongCard from '@/components/shared/SongCard';
import ArtistCard from '@/components/shared/ArtistCard';
import AlbumCard from '@/components/shared/AlbumCard';
import MainLayout from '@/components/layout/MainLayout';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // Dummy search results that would normally come from an API
  const [searchResults, setSearchResults] = useState({
    songs: [] as any[],
    artists: [] as any[],
    albums: [] as any[],
  });
  
  // Simulating search effect - in a real application, this would be an API call
  useEffect(() => {
    if (query) {
      // Mock data for search results
      setSearchResults({
        songs: [
          { id: '1', title: 'Finding Her', artist: 'Kushagra, Bharath', image: 'https://picsum.photos/id/64/300/300' },
          { id: '2', title: 'Raanjhan', artist: 'Sachet-Parampara', image: 'https://picsum.photos/id/65/300/300' },
        ],
        artists: [
          { id: '1', name: 'Pritam', image: 'https://picsum.photos/id/91/300/300' },
          { id: '2', name: 'A.R. Rahman', image: 'https://picsum.photos/id/92/300/300' },
        ],
        albums: [
          { id: '1', title: 'Sanam Teri Kasam', artist: 'Himesh Reshammiya', image: 'https://picsum.photos/id/111/300/300' },
          { id: '2', title: 'Yeh Jawaani Hai Deewani', artist: 'Pritam', image: 'https://picsum.photos/id/112/300/300' },
        ],
      });
    } else {
      setSearchResults({ songs: [], artists: [], albums: [] });
    }
  }, [query]);

  return (
    <MainLayout>
      <div className="space-y-8 pt-4">
        {query ? (
          // Search results
          <div className="space-y-8">
            <h1 className="text-2xl font-bold">Results for "{query}"</h1>
            
            {searchResults.songs.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4">Songs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {searchResults.songs.map(song => (
                    <SongCard key={song.id} song={song} />
                  ))}
                </div>
              </section>
            )}
            
            {searchResults.artists.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4">Artists</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {searchResults.artists.map(artist => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))}
                </div>
              </section>
            )}
            
            {searchResults.albums.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4">Albums</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {searchResults.albums.map(album => (
                    <AlbumCard key={album.id} album={album} />
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          // No search query yet - show browse categories
          <div>
            <h1 className="text-2xl font-bold mb-6">Browse all</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
        )}
      </div>
    </MainLayout>
  );
} 