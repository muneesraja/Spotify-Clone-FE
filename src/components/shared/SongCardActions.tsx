'use client';

import { useAtom } from 'jotai';
import { likeSong, playSong, unlikeSong } from '@/app/actions/songs';
import { likedSongsAtom, isLikedAtom } from '@/store/atoms/likedSongs';
import type { Song } from '@/api-types/models/Song';

interface SongCardActionsProps {
  songId: string;
  isHovered: boolean;
}

export function SongCardActions({ songId, isHovered }: SongCardActionsProps) {
  const [likedSongs, setLikedSongs] = useAtom(likedSongsAtom);
  const [isLiked] = useAtom(isLikedAtom);

  const handlePlay = async () => {
    const result = await playSong(songId);
    if (result.success) {
      // Play song logic would go here
      console.log(`Playing song: ${songId}`);
    }
  };
  
  const handleLike = async () => {
    const isSongLiked = isLiked(songId);
    const action = isSongLiked ? unlikeSong : likeSong;
    
    const result = await action(songId);
    if (result.success) {
      if (isSongLiked) {
        // Remove from liked songs
        setLikedSongs({
          likedSongIds: likedSongs.likedSongIds.filter(id => id !== songId),
          likedSongsData: likedSongs.likedSongsData.filter(song => song.id !== songId)
        });
      } else {
        // For like action, we need to fetch the updated song data
        const likeResult = result as { success: boolean; song?: Song };
        if (likeResult.song) {
          // Add to liked songs
          setLikedSongs({
            likedSongIds: [...likedSongs.likedSongIds, songId],
            likedSongsData: [...likedSongs.likedSongsData, likeResult.song]
          });
        }
      }
    }
  };

  const isSongLiked = isLiked(songId);

  return (
    <div className={`absolute inset-0 flex items-center justify-center gap-4 bg-black/40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
      <button 
        onClick={handleLike}
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill={isSongLiked ? "white" : "none"} 
          stroke={isSongLiked ? "none" : "white"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 18.25C9.75277 18.2525 9.5126 18.1603 9.325 17.9917L3.44167 12.4917C1.86667 11.025 1.86667 8.57331 3.44167 7.09831C4.94167 5.69831 7.275 5.72331 8.75 7.15831L10 8.33331L11.25 7.15831C12.725 5.72331 15.0583 5.69831 16.5583 7.09831C18.1333 8.56665 18.1333 11.0183 16.5583 12.4917L10.675 17.9917C10.4874 18.1603 10.2472 18.2525 10 18.25Z" strokeWidth="1.5"/>
        </svg>
      </button>
      <button 
        onClick={handlePlay}
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
      >
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 14V0L10 7L0 14Z" fill="black"/>
        </svg>
      </button>
    </div>
  );
} 