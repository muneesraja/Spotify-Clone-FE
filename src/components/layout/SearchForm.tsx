'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  
  // Effect to set initial state from URL
  useEffect(() => { 
    const query = searchParams.get('q') || '';
    // Only update local state if on the search page to avoid overwriting input on other pages
    if (pathname === '/search') {
      setSearchQuery(query);
    }
    // If not on search page and query param exists, clear local state
    else if (query) {
      setSearchQuery('');
    }
  }, [searchParams, pathname]);

  // Effect to update URL when debounced query changes (REVISED LOGIC & DEPENDENCIES)
  useEffect(() => {
    // Get router, pathname, searchParams inside the effect
    // Note: This might trigger lint warnings about missing dependencies, 
    // but including them caused the previous issues. We rely on the internal 
    // conditional logic to prevent unnecessary calls.
    const currentPathname = pathname; // Use current values
    const currentSearchParams = searchParams;
    const currentUrlQuery = currentSearchParams.get('q') || '';

    if (debouncedSearchQuery) {
      // Only push if not on search page OR if query differs
      if (currentPathname !== '/search' || debouncedSearchQuery !== currentUrlQuery) {
        router.push(`/search?q=${encodeURIComponent(debouncedSearchQuery)}`);
      }
    } else {
      // Only clear query param if ON search page AND query param EXISTS
      if (currentPathname === '/search' && currentUrlQuery) {
        router.push('/search');
      }
    }
    // Only react to changes in the debounced query itself
  }, [debouncedSearchQuery]); // Removed router, pathname, searchParams to prevent unintended triggers

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
          className="bg-[#242424] text-white py-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary w-full max-w-xs lg:max-w-sm"
          placeholder="What do you want to listen to?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </form>
  );
} 