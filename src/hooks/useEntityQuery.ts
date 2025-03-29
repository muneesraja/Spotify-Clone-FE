import { useQuery } from '@tanstack/react-query';
import { songApi } from '@/lib/api/songs';
import { artistApi } from '@/lib/api/artists';
import { albumApi } from '@/lib/api/albums';
import { Song } from '@/api-types/models/Song';
import { Artist } from '@/api-types/models/Artist';
import { Album } from '@/api-types/models/Album';

// Define the entity types we support
type EntityType = 'songs' | 'artists' | 'albums';
type QueryType = 'featured' | 'all';

// Define the return types for each entity
type EntityTypeToModel = {
  songs: Song[];
  artists: Artist[];
  albums: Album[];
};

// Map entity types to their respective API functions
const apiMap = {
  songs: {
    featured: songApi.getFeaturedSongs,
    all: songApi.getAllSongs,
  },
  artists: {
    featured: artistApi.getFeaturedArtists,
    all: artistApi.getAllArtists,
  },
  albums: {
    featured: albumApi.getFeaturedAlbums,
    all: albumApi.getAllAlbums,
  },
} as const;

export function useEntityQuery<T extends EntityType>(
  entityType: T,
  queryType: QueryType
) {
  // Define a query key that includes both entity type and query type
  const queryKey = [entityType, queryType];
  
  // Get the appropriate API function
  const queryFn = apiMap[entityType][queryType];
  
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
        const response = await queryFn();
        return response || [];
      } catch (error) {
        console.error(`Error fetching ${queryType} ${entityType}:`, error);
        throw error;
      }
    },
    // Additional options
    retry: 1,
    // Use default staleTime from QueryProvider
  });

  // Return the query results with proper typing
  return {
    data: (data || []) as EntityTypeToModel[T],
    isLoading,
    isError,
    error,
    refetch
  };
} 