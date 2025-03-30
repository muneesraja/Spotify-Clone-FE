'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { songApi } from '@/lib/api/songs'; // Assuming searchSongs is in songApi
import type { Song } from '@/api-types/models/Song';

// Hook for debouncing input
function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useSearchQuery(query: string, debounceDelay = 300) {
  const debouncedQuery = useDebounce(query, debounceDelay);

  const { data, isLoading, isError, error, isFetching } = useQuery<Song[], Error>({
    // Query key changes based on the debounced query
    queryKey: ['searchSongs', debouncedQuery],
    // Only run the query if the debounced query is not empty
    queryFn: () => {
      if (!debouncedQuery) {
        return Promise.resolve([]); // Return empty array if no query
      }
      // Use the existing songApi.searchSongs function
      return songApi.searchSongs(debouncedQuery);
    },
    enabled: !!debouncedQuery, // Only enable the query when debouncedQuery is truthy
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
  });

  return {
    data: data ?? [], // Provide a default empty array
    isLoading: isLoading,
    isFetching: isFetching, // Indicates background fetching
    isError: isError,
    error: error,
  };
} 