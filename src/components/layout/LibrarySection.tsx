'use client';
import { useRouter } from 'next/navigation';

interface LibrarySectionProps {
  isAuthenticated: boolean;
}

export function LibrarySection({ isAuthenticated }: LibrarySectionProps) {
  const router = useRouter();

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
          <p className="font-bold">Create your first playlist</p>
          <p className="text-sm text-text-secondary mt-1 mb-3">It&apos;s easy, we&lsquo;ll help you</p>
          <button 
            onClick={handleLibraryClick}
            className="text-black bg-white px-4 py-1.5 rounded-full text-sm font-bold hover:scale-105 transition-all"
          >
            Create playlist
          </button>
        </div>

        {isAuthenticated && (
          <div 
            className="p-4 bg-[#242424] rounded-md hover:bg-[#2a2a2a] transition-colors cursor-pointer"
            onClick={() => router.push('/liked-songs')}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-white">Liked Songs</p>
                <p className="text-sm text-text-secondary">Playlist • {/* TODO: Add count of liked songs from store */} songs</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 