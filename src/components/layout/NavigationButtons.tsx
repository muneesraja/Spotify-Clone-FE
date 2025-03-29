'use client';

import { useRouter } from 'next/navigation';

export function NavigationButtons() {
  const router = useRouter();

  return (
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
  );
} 