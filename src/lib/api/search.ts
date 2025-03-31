import { api } from './axios';
import { endpoints } from './endpoints';
import { SearchResponse } from '@/types/search';

/**
 * Fetches search results for songs, albums, and artists based on a query.
 * @param query The search term.
 * @returns A promise resolving to the search results.
 */
export const searchItems = async (query: string): Promise<SearchResponse> => {
  try {
    const response = await api.get<SearchResponse>(endpoints.songs.search, {
      params: { q: query }, // Assuming the backend expects the query param as 'q'
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    // Rethrow or handle error as appropriate for the application
    throw error; 
  }
}; 