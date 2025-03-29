'use client';

import Link from 'next/link';
// Removed UserMenu import as it's replaced by greeting
// import { UserMenu } from './UserMenu'; 

interface AuthButtonsProps {
  isAuthenticated: boolean;
  // Assume user object has a username property
  user: { username?: string; [key: string]: any }; 
}

export function AuthButtons({ isAuthenticated, user }: AuthButtonsProps) {
  return (
    <div className="flex items-center gap-4"> {/* Increased gap slightly */} 
      {isAuthenticated ? (
        // Display greeting instead of UserMenu
        <div className="text-white font-medium">
          Hi, {user?.username || 'User'}!
        </div>
      ) : (
        // Unauthenticated buttons remain the same
        <>
          <Link 
            href="/register" 
            className="text-text-secondary hover:text-white font-medium px-4 py-2 rounded-full hidden sm:inline-block" // Hide Sign up on smallest screens
          >
            Sign up
          </Link>
          <Link 
            href="/login" 
            className="bg-white text-black font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:scale-105 transition-transform text-sm sm:text-base" // Adjust padding/text size
          >
            Log in
          </Link>
        </>
      )}
    </div>
  );
} 