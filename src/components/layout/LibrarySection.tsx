'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { likedSongsAtom } from '@/store/atoms/likedSongs';
import type { Song } from '@/api-types/models/Song';

interface LibrarySectionProps {
  isAuthenticated: boolean;
}

export function LibrarySection({ isAuthenticated }: LibrarySectionProps) {
  const router = useRouter();
  const [showLikedSongs, setShowLikedSongs] = useState(false);
  const [likedSongs] = useAtom(likedSongsAtom);

  const handleLibraryClick = () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/songs');
      return;
    }
    router.push('/songs');
  };

  return (
    <div className="mt-6 p-6 flex-1">
      <div className="flex items-center gap-3 mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 2H15M12 10V16M9 13H15M3 6.2C3 5.0799 3 4.51984 3.21799 4.09202C3.40973 3.71569 3.71569 3.40973 4.09202 3.21799C4.51984 3 5.0799 3 6.2 3H17.8C18.9201 3 19.4802 3 19.908 3.21799C20.2843 3.40973 20.5903 3.71569 20.782 4.09202C21 4.51984 21 5.0799 21 6.2V17.8C21 18.9201 21 19.4802 20.782 19.908C20.5903 20.2843 20.2843 20.5903 19.908 20.782C19.4802 21 18.9201 21 17.8 21H6.2C5.0799 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V6.2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className="text-xl font-bold">Your Library</h2>
      </div>

      <div className="space-y-2 mt-8">
        <div className="p-4 bg-[#242424] rounded-md">
          <p className="font-bold">Create your most liked playlist</p>
          <p className="text-sm text-text-secondary mt-1 mb-3">It's easy, we'll help you</p>
          <button 
            onClick={handleLibraryClick}
            className="text-black bg-white px-4 py-1.5 rounded-full text-sm font-bold hover:scale-105 transition-all"
          >
            Create favorites
          </button>
        </div>
        {isAuthenticated && (
          <div>
            <button 
              onClick={() => setShowLikedSongs(!showLikedSongs)} 
              className="w-full flex items-center gap-4 p-4 bg-[#242424] rounded-md mt-4 hover:bg-[#333] transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-md flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 18.25C9.75277 18.2525 9.5126 18.1603 9.325 17.9917L3.44167 12.4917C1.86667 11.025 1.86667 8.57331 3.44167 7.09831C4.94167 5.69831 7.275 5.72331 8.75 7.15831L10 8.33331L11.25 7.15831C12.725 5.72331 15.0583 5.69831 16.5583 7.09831C18.1333 8.56665 18.1333 11.0183 16.5583 12.4917L10.675 17.9917C10.4874 18.1603 10.2472 18.2525 10 18.25Z" fill="white"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold">Liked Songs</h3>
                <p className="text-sm text-text-secondary">Your saved tracks</p>
              </div>
            </button>
            
            {showLikedSongs && (
              <div className="mt-2 ml-4 space-y-2">
                {likedSongs.likedSongsData.map((song) => (
                  <div key={song.id} className="flex items-center gap-3 p-2 hover:bg-[#333] rounded-md cursor-pointer">
                    <div className="w-10 h-10 bg-[#282828] rounded flex-shrink-0"></div>
                    <div className="truncate">
                      <p className="text-sm font-medium truncate">{song.title}</p>
                      <p className="text-xs text-text-secondary truncate">
                        {typeof song.artist === 'string' ? song.artist : song.artist.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 