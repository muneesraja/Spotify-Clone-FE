import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';
import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';

interface Song {
  id: string;
  title: string;
  artist: string;
  image: string;
}

export const useSongs = () => {
  const router = useRouter();
  const { isAuthenticated, requireAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Play a song - requires authentication
  const playSong = async (songId: string) => {
    if (!isAuthenticated) {
      requireAuth();
      return { success: false, authRequired: true };
    }

    setLoading(true);
    setError(null);

    try {
      await api.post(endpoints.songs.play(songId));
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to play song.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Like a song - requires authentication
  const likeSong = async (songId: string) => {
    if (!isAuthenticated) {
      requireAuth();
      return { success: false, authRequired: true };
    }

    setLoading(true);
    setError(null);

    try {
      await api.post(endpoints.songs.like(songId));
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to like song.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    playSong,
    likeSong,
    loading,
    error,
  };
}; 