import { create } from 'zustand';
import type { Song } from '@/api-types/models/Song';
import { songApi } from '@/lib/api/songs'; // Import the API functions

// Define the interface for the store's state and actions
interface LikedSongsState {
  likedSongIds: Set<string>;
  isLoading: boolean;
  error: string | null;
  fetchLikedSongs: () => Promise<void>;
  toggleLike: (songId: string) => Promise<void>;
  isLiked: (songId: string) => boolean; // Helper getter
}



// Create the Zustand store
export const useLikedSongsStore = create<LikedSongsState>((set, get) => ({
  // Initial state
  likedSongIds: new Set<string>(),
  isLoading: false,
  error: null,

  // Helper function to check if a song is liked
  isLiked: (songId: string) => get().likedSongIds.has(songId),

  // Action to fetch liked songs from the API
  fetchLikedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      // Call the actual API function
      const likedSongs = await songApi.getLikedSongs(); 
      const ids = new Set(likedSongs.map((song: Song) => song.id));
      set({ likedSongIds: ids, isLoading: false });

    } catch (err: any) { // Add type annotation for error
      console.error('Failed to fetch liked songs:', err);
      // Consider more specific error handling, e.g., for 401
      const errorMessage = err.response?.data?.message || 'Failed to load liked songs.';
      set({ error: errorMessage, isLoading: false });
    }
  },

  // Action to toggle the like status of a song
  toggleLike: async (songId: string) => {
    const currentLikedIds = get().likedSongIds;
    const isCurrentlyLiked = currentLikedIds.has(songId);

    // Optimistic update: Modify the set immediately
    const newLikedIds = new Set(currentLikedIds);
    if (isCurrentlyLiked) {
      newLikedIds.delete(songId);
    } else {
      newLikedIds.add(songId);
    }
    set({ likedSongIds: newLikedIds });

    try {
      // Call the actual API functions
      if (isCurrentlyLiked) {
        await songApi.unlikeSong(songId);
      } else {
        await songApi.likeSong(songId);
      }
      // No need for simulated delay anymore
    } catch (err: any) { // Add type annotation for error
      console.error(`Failed to ${isCurrentlyLiked ? 'unlike' : 'like'} song:`, err);
      // Revert optimistic update on error
      const errorMessage = err.response?.data?.message || 'Failed to update like status.';
      set({ likedSongIds: currentLikedIds, error: errorMessage });
      // TODO: Implement proper handling for 401 Unauthorized (e.g., redirect to login)
      if (err.response?.status === 401) {
        console.error('Authentication error. User might need to log in again.');
        // Trigger logout or redirect logic here if needed
      }
    }
  },
})); 