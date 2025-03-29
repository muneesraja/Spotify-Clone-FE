import Link from 'next/link';
import { LibrarySection } from '@/components/layout/LibrarySection';
import { UserMenu } from './UserMenu';

interface SidebarProps {
  isAuthenticated: boolean;
  isMobileNavOpen?: boolean;
}

export function Sidebar({ isAuthenticated, isMobileNavOpen }: SidebarProps) {

  return (
    <div 
      className={`sidebar fixed inset-y-0 left-0 z-40 flex flex-col w-72
                 bg-[#121212] transition-transform duration-300 ease-in-out 
                 ${isAuthenticated ? 'h-full' : 'h-screen'}
                 ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}
                 lg:relative lg:translate-x-0 lg:flex lg:w-72 xl:w-80 lg:flex-shrink-0
                 ${isAuthenticated && !isMobileNavOpen ? 'lg:h-full' : 'lg:h-screen'}
                `}
    >
      <div className="p-6 flex-shrink-0">
        <Link href="/" className="mb-8 block">
          <h2 className='text-white text-2xl font-bold'>Music <span className="text-primary">App</span></h2>
        </Link>

        <nav className="space-y-3">
          <Link 
            href="/" 
            className="flex items-center gap-4 py-2 px-3 rounded-md font-bold text-text-secondary hover:text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 3.25L4.5 9.25V20.75H9.5V14.75H15.5V20.75H20.5V9.25L12.5 3.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Home
          </Link>
          <Link 
            href="/search" 
            className="flex items-center gap-4 py-2 px-3 rounded-md font-bold text-text-secondary hover:text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Search
          </Link>
        </nav>
      </div>

      <div className="flex-grow overflow-y-auto">
        <LibrarySection isAuthenticated={isAuthenticated} />
      </div>
      
      <div className="px-6 pb-4 flex-shrink-0 mt-auto">
        {isAuthenticated && (
          <UserMenu  />
        )}

        <div className="flex flex-wrap gap-2 text-xs mb-6">
          <a href="#" className="text-text-secondary hover:underline">Legal</a>
          <a href="#" className="text-text-secondary hover:underline">Privacy Center</a>
          <a href="#" className="text-text-secondary hover:underline">Privacy Policy</a>
          <a href="#" className="text-text-secondary hover:underline">Cookies</a>
          <a href="#" className="text-text-secondary hover:underline">About Ads</a>
          <a href="#" className="text-text-secondary hover:underline">Accessibility</a>
        </div>
        
        <button className="border border-text-secondary text-white rounded-full py-1.5 px-4 text-sm font-medium flex items-center gap-1.5 hover:border-white hover:scale-105 transition-all">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.0002 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00001C14.6668 4.31811 11.6821 1.33334 8.0002 1.33334C4.3183 1.33334 1.33354 4.31811 1.33354 8.00001C1.33354 11.6819 4.3183 14.6667 8.0002 14.6667Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 14.6667C9.84095 14.6667 11.3333 11.6819 11.3333 8C11.3333 4.31811 9.84095 1.33334 8 1.33334C6.15905 1.33334 4.66667 4.31811 4.66667 8C4.66667 11.6819 6.15905 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1.33354 8H14.6668" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          English
        </button>
      </div>
    </div>
  );
}