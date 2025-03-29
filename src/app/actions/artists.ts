'use server';

import { endpoints } from '@/lib/api/endpoints';
import type { Artist } from '@/api-types/models/Artist';
import type { Album } from '@/api-types/models/Album';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getAllArtists() {
  try {
    const response = await fetch(`${API_URL}${endpoints.artists.list}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch artists');
    }

    return response.json() as Promise<Artist[]>;
  } catch (error) {
    console.error('Error fetching artists:', error);
    return [];
  }
}

export async function getFeaturedArtists() {
  try {
    const response = await fetch(`${API_URL}${endpoints.artists.featured}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch featured artists');
    }

    return response.json() as Promise<Artist[]>;
  } catch (error) {
    console.error('Error fetching featured artists:', error);
    return [];
  }
}

export async function getArtistDetails(id: string): Promise<{ artist: Artist | null; albums: Album[] }> {
  if (!id) {
    console.error('Artist ID is required');
    return { artist: null, albums: [] };
  }

  try {
    const response = await fetch(`${API_URL}${endpoints.artists.details(id)}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch artist details:', response.status, response.statusText);
      throw new Error('Failed to fetch artist details');
    }

    const data = await response.json();
    

    if (!data) {
      console.error('No data received from artist details endpoint');
      return { artist: null, albums: [] };
    }

    // Handle both possible response formats
    const artist = data.artist || data;
    const albums = artist?.albums || [];

    return {
      artist: artist || null,
      albums: albums,
    };
  } catch (error) {
    console.error('Error fetching artist details:', error);
    return {
      artist: null,
      albums: [],
    };
  }
}