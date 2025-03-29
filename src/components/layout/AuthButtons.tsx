'use client';

import Link from 'next/link';
import { UserMenu } from './UserMenu';

interface AuthButtonsProps {
  isAuthenticated: boolean;
  user: any;
}

export function AuthButtons({ isAuthenticated, user }: AuthButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <UserMenu user={user} />
      ) : (
        <>
          <Link 
            href="/register" 
            className="text-text-secondary hover:text-white font-medium px-4 py-2 rounded-full"
          >
            Sign up
          </Link>
          <Link 
            href="/login" 
            className="bg-white text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform"
          >
            Log in
          </Link>
        </>
      )}
    </div>
  );
} 