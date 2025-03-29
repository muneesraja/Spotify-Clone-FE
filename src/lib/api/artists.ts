import { api } from './axios';
import { endpoints } from './endpoints';
import { Artist } from '@/api-types/models/Artist';
import { Song } from '@/api-types/models/Song';

export interface ArtistWithSongs extends Artist {
  songs: Song[];
}

export const artistApi = {
  // Fetch featured/popular artists
  getFeaturedArtists: async (): Promise<Artist[]> => {
    const response = await api.get(endpoints.artists.featured);
    return response.data;
  },

  // Fetch all artists
  getAllArtists: async (): Promise<Artist[]> => {
    const response = await api.get(endpoints.artists.list);
    return response.data;
  },

  // Get artist details with songs
  getArtistDetails: async (id: string): Promise<ArtistWithSongs> => {
    const response = await api.get(endpoints.artists.details(id));
    return response.data;
  },

  // Get artist songs
  getArtistSongs: async (id: string): Promise<Song[]> => {
    const response = await api.get(`${endpoints.artists.details(id)}/songs`);
    return response.data;
  },
}; 