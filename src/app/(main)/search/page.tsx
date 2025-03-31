import { SearchResults } from '@/components/search/SearchResults';

export default function SearchPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      {/* SearchResults reads the query from the URL and fetches/displays results */}
      <SearchResults /> 
    </main>
  );
}
