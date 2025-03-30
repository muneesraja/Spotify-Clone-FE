import { useQuery } from '@tanstack/react-query';
import { songApi } from '@/lib/api/songs';

export const useFeaturedSongs = () => {
  // Define a query key for featured songs
  const queryKey = ['songs', 'featured'];
  
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
        const response = await songApi.getFeaturedSongs();
        return response || [];
      } catch (error) {
        console.error('Error fetching featured songs:', error);
        throw error;
      }
    },
    // Additional options
    retry: 1,
    // Use default staleTime from QueryProvider
  });

  // Return the query results and an empty array if data is undefined
  return {
    featuredSongs: data || [],
    isLoading,
    isError,
    error,
    refetch
  };
};