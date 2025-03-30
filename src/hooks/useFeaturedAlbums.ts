import { useQuery } from '@tanstack/react-query';
import { albumApi } from '@/lib/api/albums';

export const useFeaturedAlbums = () => {
  // Define a query key for featured albums
  const queryKey = ['albums', 'featured'];
  
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
        const response = await albumApi.getFeaturedAlbums();
        return response || [];
      } catch (error) {
        console.error('Error fetching featured albums:', error);
        throw error;
      }
    },
    // Additional options
    retry: 1,
    // Use default staleTime from QueryProvider
  });

  // Return the query results and an empty array if data is undefined
  return {
    featuredAlbums: data || [],
    isLoading,
    isError,
    error,
    refetch
  };
}; 