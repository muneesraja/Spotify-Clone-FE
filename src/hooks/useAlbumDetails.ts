import { useQuery } from '@tanstack/react-query';
import { albumApi } from '@/lib/api/albums';
import { Album } from '@/api-types/models/Album';
import { Song } from '@/api-types/models/Song';

export function useAlbumDetails(albumId: string) {
  // Query for album details
  const { 
    data: album,
    isLoading: isLoadingAlbum,
    isError: isAlbumError,
    error: albumError
  } = useQuery({
    queryKey: ['album', albumId],
    queryFn: async () => {
      try {
        const response = await albumApi.getAlbumDetails(albumId);
        return response;
      } catch (error) {
        console.error('Error fetching album details:', error);
        throw error;
      }
    },
    retry: 1,
  });

  // Album songs are included in the album details
  // No need for a separate query

  return {
    album,
    songs: album?.songs || [],
    isLoading: isLoadingAlbum,
    isError: isAlbumError,
    error: albumError,
  };
} 