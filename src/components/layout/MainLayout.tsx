'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Player from '@/components/layout/Player';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen grid grid-rows-[1fr_80px] grid-cols-[300px_1fr]">
      <div className="col-start-1 row-start-1 row-span-1">
        <Sidebar />
      </div>
      <div className="col-start-2 col-span-1 row-start-1 row-span-1 overflow-y-auto">
        <Header />
        <main className="p-6">{children}</main>
      </div>
      <div className="col-span-2 row-start-2">
        <Player />
      </div>
    </div>
  );
} 