'use server';

import { endpoints } from '@/lib/api/endpoints';
import type { Song } from '@/api-types/models/Song';
import type { Artist } from '@/api-types/models/Artist';
import type { Album } from '@/api-types/models/Album';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface SearchResults {
  songs: Song[];
  artists: Artist[];
  albums: Album[];
}

async function fetchAndFilter<T>(url: string, filterFn: (item: T) => boolean): Promise<T[]> {
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      console.error(`Failed to fetch ${url}:`, response.status, response.statusText);
      return [];
    }
    // Assuming the API returns an array directly or under a 'data' key
    let data = await response.json();
    if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
      data = data.data;
    }
    if (!Array.isArray(data)) {
      console.error(`Invalid data format received from ${url}: Expected an array.`);
      return [];
    }
    return data.filter(filterFn);
  } catch (error) {
    console.error(`Error fetching or filtering ${url}:`, error);
    return [];
  }
}

export async function searchItems(query: string): Promise<SearchResults> {
  if (!query) {
    return { songs: [], artists: [], albums: [] };
  }

  const lowerCaseQuery = query.toLowerCase();

  // Fetch songs and filter by title or artist name
  const songsPromise = fetchAndFilter<Song>(
    `${API_URL}${endpoints.songs.list}`, // Using list endpoint for simulation
    (song) => song.title.toLowerCase().includes(lowerCaseQuery) ||
              (song.artist && song.artist.name.toLowerCase().includes(lowerCaseQuery))
  );

  // Fetch artists and filter by name
  const artistsPromise = fetchAndFilter<Artist>(
    `${API_URL}${endpoints.artists.list}`,
    (artist) => artist.name.toLowerCase().includes(lowerCaseQuery)
  );

  // Fetch albums and filter by title or artist name
  const albumsPromise = fetchAndFilter<Album>(
    `${API_URL}${endpoints.albums.list}`,
    (album) => album.title.toLowerCase().includes(lowerCaseQuery) ||
               (album.artist && album.artist.name.toLowerCase().includes(lowerCaseQuery))
  );

  try {
    const [songs, artists, albums] = await Promise.all([
      songsPromise,
      artistsPromise,
      albumsPromise,
    ]);

    return { songs, artists, albums };
  } catch (error) {
    console.error('Error performing search:', error);
    return { songs: [], artists: [], albums: [] };
  }
} 