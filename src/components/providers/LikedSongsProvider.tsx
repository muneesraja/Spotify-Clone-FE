'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { likedSongsAtom } from '@/store/atoms/likedSongs';

interface LikedSongsProviderProps {
  initialLikedSongs: {
    likedSongIds: string[];
    likedSongsData: any[];
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