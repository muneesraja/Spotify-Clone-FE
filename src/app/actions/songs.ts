'use server';

import { endpoints } from '@/lib/api/endpoints';
import type { Song } from '@/api-types/models/Song';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getAllSongs() {
  try {
    const response = await fetch(`${API_URL}${endpoints.songs.list}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch songs');
    }

    return response.json() as Promise<Song[]>;
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
}

export async function getFeaturedSongs() {
  try {
    const response = await fetch(`${API_URL}${endpoints.songs.featured}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch featured songs');
    }

    return response.json() as Promise<Song[]>;
  } catch (error) {
    console.error('Error fetching featured songs:', error);
    return [];
  }
}

export async function playSong(songId: string) {
  const token = await getToken();
  if (!token) {
    console.log('Play action requires authentication: No token found');
    return { success: false, error: 'Authentication required' };
  }

  try {
    const response = await fetch(`${API_URL}${endpoints.songs.play(songId)}`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('Failed to play song:', response.status, response.statusText);
      try {
          const errorBody = await response.json();
          console.error('Play song API error body:', errorBody);
      } catch(e) { /* Ignore if body isn't JSON */ }
      throw new Error('Failed to play song');
    }

    const result = await response.json(); 
    return { success: true, data: result };

  } catch (error) {
    console.error('Error playing song:', error);
    return { success: false, error: 'Failed to play song' };
  }
}

export async function initializeLikedSongs() {
  const token = await getToken();
  if (!token) {
    return { likedSongIds: [], likedSongsData: [] };
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoints.user.likedSongs}`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch liked songs:', response.statusText);
      return { likedSongIds: [], likedSongsData: [] };
    }

    const songs = await response.json();
    return {
      likedSongIds: songs.map((song: Song) => song.id),
      likedSongsData: songs,
    };
  } catch (error) {
    console.error('Error fetching liked songs:', error);
    return { likedSongIds: [], likedSongsData: [] };
  }
}

export async function likeSong(songId: string) {
  const token = await getToken();
  if (!token) {
    return { success: false, error: 'Authentication required' };
  }

  try {
    const response = await fetch(`${API_URL}${endpoints.songs.like(songId)}`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to like song');
    }

    // Fetch updated song data
    const songResponse = await fetch(`${API_URL}/songs/${songId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!songResponse.ok) {
      throw new Error('Failed to fetch updated song data');
    }

    const updatedSong = await songResponse.json();
    return { success: true, song: updatedSong };
  } catch (error) {
    console.error('Error liking song:', error);
    return { success: false, error: 'Failed to like song' };
  }
}

export async function unlikeSong(songId: string) {
  const token = await getToken();
  if (!token) {
    return { success: false, error: 'Authentication required' };
  }

  try {
    const response = await fetch(`${API_URL}${endpoints.songs.like(songId)}`, {
      method: 'DELETE',
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to unlike song');
    }

    return { success: true };
  } catch (error) {
    console.error('Error unliking song:', error);
    return { success: false, error: 'Failed to unlike song' };
  }
}

const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  return token?.value;
}

export async function getLikedSongs(): Promise<Song[]> {
  const token = await getToken();
  if (!token) {
    console.log('No token found');
    return [];
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoints.user.likedSongs}`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.log('Error response:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      throw new Error(`Failed to fetch liked songs: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching liked songs:', error);
    return [];
  }
}