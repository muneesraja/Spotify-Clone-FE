'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/app/actions/auth';


export function UserMenu() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <form action={handleLogout}>
      <button
        type="submit"
        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#3E3E3E]"
      >
        Log out
      </button>
    </form>
  );
} 