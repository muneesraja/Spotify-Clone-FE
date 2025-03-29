import Link from 'next/link';
import { SearchForm } from './SearchForm';
import { NavigationButtons } from './NavigationButtons';
import { AuthButtons } from './AuthButtons';

// Define props interface
interface HeaderProps {
  user: any; // Use a more specific type if available
  isAuthenticated: boolean;
  onMenuToggle: () => void; // Add the toggle function prop
}

// Accept props instead of calling getUser
export function Header({ user, isAuthenticated, onMenuToggle }: HeaderProps) {
  return (
    <header className="bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-transparent p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          className="text-white p-2 lg:hidden" 
          aria-label="Toggle menu"
          onClick={onMenuToggle} // Call the toggle function on click
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <NavigationButtons />
        <SearchForm />
      </div>
      <AuthButtons isAuthenticated={isAuthenticated} user={user} />
    </header>
  );
} 