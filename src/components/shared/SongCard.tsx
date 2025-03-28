'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SongProps {
  song: {
    id: string;
    title: string;
    artist: string;
    image: string;
  }
}

export default function SongCard({ song }: SongProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handlePlay = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    // Play song logic would go here
    console.log(`Playing song: ${song.title}`);
  };
  
  const handleLike = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    // Like song logic would go here
    console.log(`Liked song: ${song.title}`);
  };

  return (
    <div 
      className="card group relative transition-all duration-300 hover:cursor-pointer" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4 rounded-md overflow-hidden">
        <img 
          src={song.image} 
          alt={song.title} 
          className="w-full h-full aspect-square object-cover"
        />
          <button  
            onClick={handleLike}
            className={`absolute left-2 bottom-2 bg-primary p-3 rounded-full text-black hover:bg-primary-hover shadow-lg transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-90'}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3.56911C7.26392 2.84576 6.38897 2.45001 5.5 2.45001C3.7239 2.45001 2.3 3.87391 2.3 5.65001C2.3 7.98091 4.4 9.99871 7.55 12.8522L8 13.2681L8.45 12.8522C11.6 9.99871 13.7 7.98091 13.7 5.65001C13.7 3.87391 12.2761 2.45001 10.5 2.45001C9.61103 2.45001 8.73608 2.84576 8 3.56911Z" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
          </button>
        <button 
          onClick={handlePlay}
          className={`absolute right-2 bottom-2 bg-primary p-3 rounded-full text-black hover:bg-primary-hover shadow-lg transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-90'}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3L12 8L5 13V3Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      <Link href={`/songs/${song.id}`}>
        <h3 className="font-bold text-white mb-1 line-clamp-1">{song.title}</h3>
      </Link>
      <Link href={`/artists/${song.id}`} className="text-sm text-text-secondary line-clamp-2">
        {song.artist}
      </Link>
    </div>
  );
} 