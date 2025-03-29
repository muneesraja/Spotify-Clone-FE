import { useQuery } from '@tanstack/react-query';
import { artistApi } from '@/lib/api/artists';
import { Artist } from '@/api-types/models/Artist';

export const useFeaturedArtists = () => {
  // Define a query key for featured artists
  const queryKey = ['artists', 'featured'];
  
  // Use the useQuery hook from Tanstack Query
  const { 
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const response = await artistApi.getFeaturedArtists();
        return response || [];
      } catch (error) {
        console.error('Error fetching featured artists:', error);
        throw error;
      }
    },
    // Additional options
    retry: 1,
    // Use default staleTime from QueryProvider
  });

  // Return the query results and an empty array if data is undefined
  return {
    featuredArtists: data || [],
    isLoading,
    isError,
    error,
    refetch
  };
}; 