import { useQuery } from '@tanstack/react-query';
import { artistApi, ArtistWithSongs } from '@/lib/api/artists';

export function useArtistDetails(artistId: string) {
  // Query for artist details (includes songs)
  const { 
    data: artist,
    isLoading,
    isError,
    error
  } = useQuery<ArtistWithSongs>({
    queryKey: ['artist', artistId],
    queryFn: async () => {
      try {
        const response = await artistApi.getArtistSongs(artistId);
        return response;
      } catch (error) {
        console.error('Error fetching artist details:', error);
        throw error;
      }
    },
    retry: 1,
  });

  return {
    artist,
    songs: artist?.songs || [],
    isLoading,
    isError,
    error,
  };
} 