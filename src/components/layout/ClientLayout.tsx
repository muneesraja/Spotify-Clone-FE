'use client';

import { usePathname } from 'next/navigation';
import { Player } from './Player';

interface ClientLayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export function ClientLayout({ children, isAuthenticated }: ClientLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <div className="col-span-2 row-start-2">
        {isAuthenticated && <Player />}
      </div>
    </>
  );
} 