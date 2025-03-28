'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPrompt() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center gap-4 p-8 bg-[#121212] rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold text-white">Authentication Required</h2>
      <p className="text-text-secondary">You need to be logged in to access this feature</p>
      <button
        onClick={() => router.push('/login')}
        className="mt-4 px-6 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-full"
      >
        Log in
      </button>
      <p className="text-sm text-text-secondary mt-2">
        Don't have an account?{' '}
        <Link href="/register" className="text-white hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
} 