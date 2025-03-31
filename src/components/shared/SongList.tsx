'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Song } from '@/api-types/models/Song';
import type { Artist } from '@/api-types/models/Artist';
import { formatDuration } from '@/lib/utils/formatDuration';
import { playSong } from '@/app/actions/songs';
import { LikeButton } from './LikeButton';
import { PlayIcon } from '@heroicons/react/24/outline';
import { usePlayerStore } from '@/store/playerStore';

interface SongListProps {
  songs?: Song[];
  showHeader?: boolean;
  artist?: Artist;
  emptyMessage?: string;
}

export default function SongList({ 
  songs = [], 
  showHeader = true, 
  artist, 
  emptyMessage = 'No songs found' 
}: SongListProps) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<'title' | 'artist' | 'recent'>('title');
  const playSong = usePlayerStore((state) => state.playSong);

  // Sort songs based on the selected criteria
  const sortedSongs = [...songs].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'artist' && !artist) {
      const aName = typeof a.artist === 'string' ? a.artist : a.artist.name;
      const bName = typeof b.artist === 'string' ? b.artist : b.artist.name;
      return aName.localeCompare(bName);
    } else {
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    }
  });

  const handlePlaySong = (songId: string) => {
    playSong(songId);
  };

  if (songs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="flex justify-end">
          <div className="flex items-center gap-3">
            <span className="text-text-secondary">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'title' | 'artist' | 'recent')}
              className="bg-[#333] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="title">Title</option>
              {!artist && <option value="artist">Artist</option>}
              <option value="recent">Release Date</option>
            </select>
          </div>
        </div>
      )}

      <div className="bg-[#181818] rounded-md overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-2 border-b border-[#333]">
          <div className="w-8">#</div>
          <div>Title</div>
          <div className="text-right">Duration</div>
          <div className="w-20">Actions</div>
        </div>

        <div className="divide-y divide-[#333]">
          {sortedSongs.map((song, index) => {
            return (
              <div 
                key={song.id}
                className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-3 items-center hover:bg-[#282828] group"
              >
                <div className="w-8 text-text-secondary">{index + 1}</div>
                <div>
                  <h3 className="font-medium">{song.title}</h3>
                  {!artist && (
                    <p className="text-sm text-text-secondary">
                      {typeof song.artist === 'string' ? song.artist : song.artist?.name ?? 'Unknown Artist'}
                    </p>
                  )}
                </div>
                <div className="text-text-secondary text-right">
                  {formatDuration(song.duration || 0)}
                </div>
                <div className="w-20 flex justify-end gap-2">
                  <button
                    onClick={() => handlePlaySong(song.id)}
                    className="p-2 rounded-full hover:bg-[#333] text-text-secondary hover:text-white transition-colors"
                  >
                    <PlayIcon className="w-5 h-5" />
                  </button>
                  <LikeButton songId={song.id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 