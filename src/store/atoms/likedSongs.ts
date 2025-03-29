import { atom } from 'jotai';
import type { Song } from '@/api-types/models/Song';

interface LikedSongsState {
  likedSongIds: string[];
  likedSongsData: Song[];
}

export const likedSongsAtom = atom<LikedSongsState>({
  likedSongIds: [],
  likedSongsData: [],
});

// Derived atom for checking if a song is liked
export const isLikedAtom = atom(
  (get) => (songId: string) => get(likedSongsAtom).likedSongIds.includes(songId)
); 