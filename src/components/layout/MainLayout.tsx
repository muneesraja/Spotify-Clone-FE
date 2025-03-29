// import { getUser } from '@/lib/auth';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Player } from '@/components/layout/Player';

interface MainLayoutProps {
  children: React.ReactNode;
  user: any;
  isAuthenticated: boolean;
}

export function MainLayout({ children, user, isAuthenticated }: MainLayoutProps) {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isAuthenticated={isAuthenticated} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header user={user} isAuthenticated={isAuthenticated} />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
          {isAuthenticated && <Player />}
        </main>
      </div>
    </div>
  );
} 