'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AlbumProps {
  album: {
    id: string;
    title: string;
    artist: string;
    image: string;
  }
}

export default function AlbumCard({ album }: AlbumProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handlePlay = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    // Play album logic would go here
    console.log(`Playing album: ${album.title}`);
  };

  return (
    <div 
      className="card group relative transition-all duration-300 hover:cursor-pointer" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4 rounded-md overflow-hidden">
        <img 
          src={album.image} 
          alt={album.title} 
          className="w-full h-full aspect-square object-cover"
        />
        <button 
          onClick={handlePlay}
          className={`absolute right-2 bottom-2 bg-primary p-3 rounded-full text-black hover:bg-primary-hover shadow-lg transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-90'}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3L12 8L5 13V3Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      <Link href={`/albums/${album.id}`}>
        <h3 className="font-bold text-white mb-1 line-clamp-1">{album.title}</h3>
      </Link>
      <Link href={`/artists/${album.id}`} className="text-sm text-text-secondary line-clamp-2">
        {album.artist}
      </Link>
    </div>
  );
} 