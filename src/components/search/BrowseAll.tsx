import React from 'react';

interface CategoryCardProps {
  title: string;
  color: string; // Tailwind background color class (e.g., 'bg-pink-600')
  // Optional: Add image URL if needed based on design
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, color }) => {
  return (
    <div className={`relative rounded-lg overflow-hidden aspect-square ${color} p-4`}>
      <h3 className="text-white text-xl lg:text-2xl font-bold break-words">{title}</h3>
      {/* Optional: Add image element here */}
      {/* Example: <img src="/path/to/image.jpg" alt="" className="absolute bottom-0 right-0 w-16 h-16 transform rotate-12 translate-x-2 translate-y-2" /> */}
    </div>
  );
};

// Sample categories based on the reference image
const categories = [
  { title: 'Music', color: 'bg-pink-600' },
  { title: 'Podcasts', color: 'bg-green-700' },
  { title: 'Live Events', color: 'bg-purple-700' },
  { title: 'Made For You', color: 'bg-blue-800' },
  { title: 'New Releases', color: 'bg-lime-600' },
  { title: 'Hindi', color: 'bg-rose-600' },
  { title: 'Telugu', color: 'bg-orange-600' },
  { title: 'Punjabi', color: 'bg-purple-500' },
  { title: 'Podcast Charts', color: 'bg-blue-600' },
  { title: 'Podcast New Releases', color: 'bg-indigo-500' },
  { title: 'Video Podcast', color: 'bg-red-700' },
  { title: 'Business & Technology', color: 'bg-gray-600' },
  { title: 'Charts', color: 'bg-purple-400' },
  { title: 'Tamil', color: 'bg-orange-800' },
  { title: 'Malayalam', color: 'bg-teal-700' },
  { title: 'Bhojpuri', color: 'bg-red-600' },
  { title: 'Ghazals', color: 'bg-gray-500' },
  { title: 'Discover', color: 'bg-indigo-400' },
  { title: 'Summer', color: 'bg-emerald-500' },
  { title: 'Pop', color: 'bg-cyan-700' },
  { title: 'Indie', color: 'bg-red-500' },
  // Add more categories as needed
];

export function BrowseAll() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Browse all</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.title} title={category.title} color={category.color} />
        ))}
      </div>
    </div>
  );
} 