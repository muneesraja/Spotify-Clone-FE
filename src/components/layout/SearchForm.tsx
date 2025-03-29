'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const DEBOUNCE_DELAY = 500; // Delay in milliseconds

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Remove debouncing functionality
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
  }, [searchParams]);


  useEffect(() => {
    const timerId = setTimeout(() => {
      const currentUrlQuery = searchParams.get('q') || '';
      if (searchQuery !== currentUrlQuery) {
        if (searchQuery.trim()) {
          router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        } else if (currentUrlQuery) {
          router.push('/search');
        }
      }
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery, router, searchParams]);

  return (
    <form className="relative ml-4" onSubmit={(e) => e.preventDefault()}>
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
  );
} 