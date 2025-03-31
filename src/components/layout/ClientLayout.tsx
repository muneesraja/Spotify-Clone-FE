'use client';

import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
    </>
  );
} 