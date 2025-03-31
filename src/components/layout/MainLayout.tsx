'use client'; // Convert to Client Component for state

import { useState, useEffect } from 'react'; // Import useState and useEffect
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { User } from '@/api-types';
import { useLikedSongsStore } from '@/store/likedSongsStore'; // Import the store
import PlayerContainer from '../player/PlayerContainer';

interface MainLayoutProps {
  children: React.ReactNode;
  user: User;
  isAuthenticated: boolean;
}

export function MainLayout({ children, user, isAuthenticated }: MainLayoutProps) {
  // State for mobile sidebar visibility
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fetch liked songs when the user is authenticated
  const { fetchLikedSongs } = useLikedSongsStore();
  useEffect(() => {
    if (isAuthenticated) {
      console.log('MainLayout: Authenticated, fetching liked songs...');
      fetchLikedSongs();
    }
    // We only want to run this when isAuthenticated status potentially changes or on initial load
    // If isAuthenticated changes from true to false, we don't need to do anything here
  }, [isAuthenticated, fetchLikedSongs]);

  // Function to toggle the state
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden relative"> {/* Add relative for absolute sidebar */} 
        {/* Pass state and toggle function to Sidebar */}
        <Sidebar 
           isAuthenticated={isAuthenticated} 
           isMobileNavOpen={isMobileNavOpen} 
         />
        <main className="flex-1 flex flex-col overflow-hidden">
           {/* Pass toggle function to Header */}
          <Header 
            user={user} 
            isAuthenticated={isAuthenticated} 
            onMenuToggle={toggleMobileNav} // Pass toggle function
          />
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8">
             <div className="max-w-7xl mx-auto">
                {children}
             </div>
          </div>
        </main>
        <PlayerContainer />
         {/* Optional: Overlay for closing mobile nav when clicking outside */}
         {isMobileNavOpen && (
           <div 
             className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
             onClick={toggleMobileNav} 
             aria-hidden="true"
           />
         )}
      </div>
    </div>
  );
}