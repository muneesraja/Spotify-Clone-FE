'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, requireAuth } = useAuth();
  const [showLikedSongs, setShowLikedSongs] = useState(false);
  const handleLibraryClick = () => {
    if (!isAuthenticated) {
      requireAuth('/songs');
      return;
    }
    router.push('/songs');
  };

  return (
    <div className={`sidebar flex flex-col ${isAuthenticated ?  'h-full' : 'h-screen'} bg-[#121212]`}>
      <div className="p-6">
        <Link href="/" className="mb-8 block">
          <h2 className='text-white text-2xl font-bold'>Music <span className="text-primary">App</span></h2>
        </Link>

        <nav className="space-y-3">
          <Link 
            href="/" 
            className={`flex items-center gap-4 py-2 px-3 rounded-md font-bold ${pathname === '/' ? 'text-white bg-[#282828]' : 'text-text-secondary hover:text-white'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 3.25L4.5 9.25V20.75H9.5V14.75H15.5V20.75H20.5V9.25L12.5 3.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Home
          </Link>
          <Link 
            href="/search" 
            className={`flex items-center gap-4 py-2 px-3 rounded-md font-bold ${pathname === '/search' ? 'text-white bg-[#282828]' : 'text-text-secondary hover:text-white'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Search
          </Link>
        </nav>
      </div>

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
                  {[
                    { title: "Finding Her", artist: "Kushagra, Bharath" },
                    { title: "Raanjhan", artist: "Sachet-Parampara" },
                    { title: "Jhol", artist: "Maanu, Annural Khalid" }
                  ].map((song, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-[#333] rounded-md cursor-pointer">
                      <div className="w-10 h-10 bg-[#282828] rounded flex-shrink-0"></div>
                      <div className="truncate">
                        <p className="text-sm font-medium truncate">{song.title}</p>
                        <p className="text-xs text-text-secondary truncate">{song.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2 text-xs">
          <a href="#" className="text-text-secondary hover:underline">Legal</a>
          <a href="#" className="text-text-secondary hover:underline">Privacy Center</a>
          <a href="#" className="text-text-secondary hover:underline">Privacy Policy</a>
          <a href="#" className="text-text-secondary hover:underline">Cookies</a>
          <a href="#" className="text-text-secondary hover:underline">About Ads</a>
          <a href="#" className="text-text-secondary hover:underline">Accessibility</a>
        </div>
        
        <button className="mt-6 border border-text-secondary text-white rounded-full py-1.5 px-4 text-sm font-medium flex items-center gap-1.5 hover:border-white hover:scale-105 transition-all">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.0002 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00001C14.6668 4.31811 11.6821 1.33334 8.0002 1.33334C4.3183 1.33334 1.33354 4.31811 1.33354 8.00001C1.33354 11.6819 4.3183 14.6667 8.0002 14.6667Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 14.6667C9.84095 14.6667 11.3333 11.6819 11.3333 8C11.3333 4.31811 9.84095 1.33334 8 1.33334C6.15905 1.33334 4.66667 4.31811 4.66667 8C4.66667 11.6819 6.15905 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1.33354 8H14.6668" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          English
        </button>
      </div>
    </div>
  );
} 