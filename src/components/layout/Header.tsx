import Link from 'next/link';
import { SearchForm } from './SearchForm';
import { NavigationButtons } from './NavigationButtons';
import { AuthButtons } from './AuthButtons';

// Define props interface
interface HeaderProps {
  user: any; // Use a more specific type if available
  isAuthenticated: boolean;
}

// Accept props instead of calling getUser
export function Header({ user, isAuthenticated }: HeaderProps) {
  return (
    <header className="bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-transparent p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <NavigationButtons />
        <SearchForm />
      </div>
      <AuthButtons isAuthenticated={isAuthenticated} user={user} />
    </header>
  );
} 