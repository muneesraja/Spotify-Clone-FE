'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SongList from '@/components/shared/SongList';
import { songApi } from '@/lib/api/songs';
import type { Song } from '@/api-types/models/Song';
import { useLikedSongsStore } from '@/store/likedSongsStore'; // Import store to potentially update liked state

export default function LikedSongsPage() {
  const router = useRouter();
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Optionally use the store's liked IDs if already fetched, 
  // but fetching directly ensures fresh data for this specific page.
  // const fetchLikedSongsFromStore = useLikedSongsStore((state) => state.fetchLikedSongs);

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const songs = await songApi.getLikedSongs();
        setLikedSongs(songs);
        // Optional: Sync the store if it wasn't initialized elsewhere
        // const likedIds = new Set(songs.map(s => s.id));
        // useLikedSongsStore.setState({ likedSongIds: likedIds, isLoading: false });
      } catch (err: any) {
        console.error('Failed to fetch liked songs:', err);
        if (err.response?.status === 401) {
          // Redirect to login if unauthorized
          router.push('/login?redirect=/liked-songs'); 
        } else {
          setError(err.response?.data?.message || 'Failed to load liked songs.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [router]); // Dependency on router for redirection

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Liked Songs</h1>

      {isLoading && (
        <div className="text-center py-10">
          <p>Loading your liked songs...</p> 
          {/* TODO: Add a spinner component */}
        </div>
      )}

      {error && (
        <div className="text-center py-10 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <SongList 
          songs={likedSongs} 
          showHeader={false} // Don't need sorting/header in this context
          emptyMessage="You haven't liked any songs yet." 
        />
      )}
    </div>
  );
} 