import { api } from './axios';
import { endpoints } from './endpoints';
import { Song } from '@/api-types/models/Song';

export const songApi = {
  // Fetch trending/featured songs
  getFeaturedSongs: async (): Promise<Song[]> => {
    const response = await api.get(endpoints.songs.featured);
    return response.data;
  },

  // Fetch all songs
  getAllSongs: async (): Promise<Song[]> => {
    const response = await api.get(endpoints.songs.list);
    return response.data;
  },

  // Search songs
  searchSongs: async (query: string): Promise<Song[]> => {
    const response = await api.get(`${endpoints.songs.search}?q=${encodeURIComponent(query)}`);
    console.log('response', response.data);
    return response.data;
  },

  // Like a song
  likeSong: async (id: string): Promise<{ success: boolean }> => {
    const response = await api.post(endpoints.songs.like(id));
    return response.data;
  },

  // Play a song
  playSong: async (id: string): Promise<{ url: string }> => {
    const response = await api.post(endpoints.songs.play(id));
    return response.data;
  }
}; 