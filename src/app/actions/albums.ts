'use server';

import { endpoints } from '@/lib/api/endpoints';
import type { Album } from '@/api-types/models/Album';
import type { Song } from '@/api-types/models/Song';

const API_URL = process.env.BASE_URL || 'http://localhost:3000';

export async function getAllAlbums() {
  try {
    const response = await fetch(`${API_URL}${endpoints.albums.list}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch albums');
    }

    return response.json() as Promise<Album[]>;
  } catch (error) {
    console.error('Error fetching albums:', error);
    return [];
  }
}

export async function getFeaturedAlbums() {
  try {
    const response = await fetch(`${API_URL}${endpoints.albums.featured}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch featured albums');
    }

    return response.json() as Promise<Album[]>;
  } catch (error) {
    console.error('Error fetching featured albums:', error);
    return [];
  }
}

export async function getAlbumDetails(id: string): Promise<{ album: Album | null; songs: Song[] }> {
  if (!id) {
    console.error('Album ID is required');
    return { album: null, songs: [] };
  }

  try {
    const response = await fetch(`${API_URL}${endpoints.albums.details(id)}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch album details:', response.status, response.statusText);
      throw new Error('Failed to fetch album details');
    }

    const data = await response.json();

    if (!data) {
      console.error('No data received from album details endpoint');
      return { album: null, songs: [] };
    }

    // Handle both possible response formats
    const album = data.album || data;
    const rawSongs = album?.songs || [];

    // Ensure songs have the correct artist structure
    const songs = rawSongs.map((song: Song) => ({
      ...song,
      artist: album.artist,
      artistId: album.artist.id,
      albumId: album.id,
    }));

    return {
      album: album || null,
      songs,
    };
  } catch (error) {
    console.error('Error fetching album details:', error);
    return {
      album: null,
      songs: [],
    };
  }
}

export async function playAlbum(albumId: string) {
  try {
    const response = await fetch(`${API_URL}${endpoints.albums.details(albumId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ albumId }),
    });

    return response.json();
  } catch (error) {
    console.error('Error playing album:', error);
    return { success: false, error: 'Failed to play album' };
  }
}