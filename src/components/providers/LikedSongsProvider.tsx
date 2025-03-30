'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { likedSongsAtom } from '@/store/atoms/likedSongs';
import type { LikedSong } from '@/api-types/services/LikedSongsService';

interface LikedSongsProviderProps {
  initialLikedSongs: {
    likedSongIds: string[];
    likedSongsData: LikedSong[];
  };
  children: React.ReactNode;
}

export function LikedSongsProvider({ initialLikedSongs, children }: LikedSongsProviderProps) {
  const [, setLikedSongs] = useAtom(likedSongsAtom);

  useEffect(() => {
    setLikedSongs(initialLikedSongs);
  }, [initialLikedSongs, setLikedSongs]);

  return <>{children}</>;
}