'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/actions/auth';

interface UserMenuProps {
  user: {
    username?: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <div className="relative group">
      <button className="bg-white text-black font-bold py-2 px-6 rounded-full text-sm hover:scale-105 transition-transform">
        <span className="flex items-center gap-2">
          <span className="h-7 w-7 bg-[#535353] rounded-full flex items-center justify-center text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor"/>
              <path d="M8 10C5.33333 10 0 11.3333 0 14V16H16V14C16 11.3333 10.6667 10 8 10Z" fill="currentColor"/>
            </svg>
          </span>
          {user?.username || 'User'}
        </span>
      </button>
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#282828] ring-1 ring-black ring-opacity-5 hidden group-hover:block">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <Link href="/profile" className="block px-4 py-2 text-sm text-white hover:bg-[#3E3E3E]">
            Profile
          </Link>
          <Link href="/liked-songs" className="block px-4 py-2 text-sm text-white hover:bg-[#3E3E3E]">
            Liked Songs
          </Link>
          <form action={handleLogout}>
            <button 
              type="submit"
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#3E3E3E]"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 