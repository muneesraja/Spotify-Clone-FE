'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Update search input when URL query parameter changes
  useEffect(() => {
    if (pathname === '/search') {
      const query = searchParams.get('q') || '';
      setSearchQuery(query);
    }
  }, [pathname, searchParams]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-transparent p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => router.back()}
            className="bg-black/40 rounded-full p-2 hover:bg-black/60"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            onClick={() => router.forward()}
            className="bg-black/40 rounded-full p-2 hover:bg-black/60"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="relative ml-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-text-secondary">
                <path d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              className="bg-[#242424] text-white py-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary w-[300px]"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
      
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <button className="bg-white text-black font-bold py-2 px-6 rounded-full text-sm hover:scale-105 transition-transform">
            <span className="flex items-center gap-2">
              <span className="h-7 w-7 bg-[#535353] rounded-full flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor"/>
                  <path d="M8 10C5.33333 10 0 11.3333 0 14V16H16V14C16 11.3333 10.6667 10 8 10Z" fill="currentColor"/>
                </svg>
              </span>
              Username
            </span>
          </button>
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
    </header>
  );
} 