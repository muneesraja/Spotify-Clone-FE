import { api } from './axios';
import { endpoints } from './endpoints';
import { Album } from '@/api-types/models/Album';

export const albumApi = {
  // Fetch featured/popular albums
  getFeaturedAlbums: async (): Promise<Album[]> => {
    const response = await api.get(endpoints.albums.featured);
    return response.data;
  },

  // Fetch all albums
  getAllAlbums: async (): Promise<Album[]> => {
    const response = await api.get(endpoints.albums.list);
    return response.data;
  },

  // Get album details
  getAlbumDetails: async (id: string): Promise<Album> => {
    const response = await api.get(endpoints.albums.details(id));
    return response.data;
  },
}; 