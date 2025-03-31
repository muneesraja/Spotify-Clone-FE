import { create } from 'zustand';
import type { Song } from '@/api-types/models/Song';
import { songApi } from '@/lib/api/songs';

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  isVisible: boolean;
  isLoading: boolean;
  error: string | null;
  volume: number;
  playSong: (songId: string) => Promise<void>;
  pauseSong: () => void;
  resumeSong: () => void;
  stopSong: () => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  // Initial state
  currentSong: null,
  isPlaying: false,
  isVisible: false,
  isLoading: false,
  error: null,
  volume: 1,

  // Actions
  playSong: async (songId: string) => {
    set({ isLoading: true, error: null });
    try {
      const song = await songApi.getSongDetails(songId);
      set({
        currentSong: song,
        isPlaying: true,
        isVisible: true,
        isLoading: false,
      });
    } catch (err: any) {
      console.error('Failed to play song:', err);
      set({
        error: err.response?.data?.message || 'Failed to play song',
        isLoading: false,
      });
    }
  },

  pauseSong: () => {
    set({ isPlaying: false });
  },

  resumeSong: () => {
    set({ isPlaying: true });
  },

  stopSong: () => {
    set({
      currentSong: null,
      isPlaying: false,
      isVisible: false,
      error: null,
    });
  },

  setVolume: (volume: number) => {
    set({ volume: Math.max(0, Math.min(1, volume)) });
  },
})); 