'use server';

import { endpoints } from '@/lib/api/endpoints';
import type { Song } from '@/api-types/models/Song';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function getAllSongs() {
  try {
    const response = await fetch(API_URL + endpoints.songs.list, {
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
    const response = await fetch(API_URL + endpoints.songs.featured, {
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
    const response = await fetch(API_URL + endpoints.songs.play(songId), {
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
      } catch(err: unknown) { console.error('Failed to play song:', err); }
      throw new Error('Failed to play song');
    }

    const result = await response.json(); 
    return { success: true, data: result };

  } catch (error) {
    console.error('Error playing song:', error);
    return { success: false, error: 'Failed to play song' };
  }
}

const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  return token?.value;
}
