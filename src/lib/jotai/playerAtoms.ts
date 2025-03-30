import { atom } from 'jotai';
import type { Song } from '@/api-types/models/Song';
import type { Artist } from '@/api-types/models/Artist';

// Define a type for the song including the potentially nested artist
export type PlayerSong = Song & { artist: Artist | string };

export const currentSongAtom = atom<PlayerSong | null>(null);
export const isPlayingAtom = atom(false);
export const currentTimeAtom = atom(0); // in seconds
export const durationAtom = atom(0); // in seconds
export const volumeAtom = atom(0.5); // 0 to 1 