import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

// Card Components
import SongCard from "@/components/shared/SongCard";
import ArtistCard from "@/components/shared/ArtistCard";
import AlbumCard from "@/components/shared/AlbumCard";

export default function Home() {
  // Dummy data that would normally come from an API
  const trendingSongs = [
    { id: '1', title: 'Finding Her', artist: 'Kushagra, Bharath', image: 'https://picsum.photos/id/64/300/300' },
    { id: '2', title: 'Raanjhan', artist: 'Sachet-Parampara', image: 'https://picsum.photos/id/65/300/300' },
    { id: '3', title: 'Jhol', artist: 'Maanu, Annural Khalid', image: 'https://picsum.photos/id/68/300/300' },
    { id: '4', title: 'Ek Khtola', artist: 'Masoom Sharma', image: 'https://picsum.photos/id/76/300/300' },
    { id: '5', title: 'Premalo', artist: 'Vijai Bulganin', image: 'https://picsum.photos/id/240/300/300' },
  ];
  
  const popularArtists = [
    { id: '1', name: 'Pritam', image: 'https://picsum.photos/id/91/300/300' },
    { id: '2', name: 'A.R. Rahman', image: 'https://picsum.photos/id/92/300/300' },
    { id: '3', name: 'Arijit Singh', image: 'https://picsum.photos/id/93/300/300' },
    { id: '4', name: 'Sachin-Jigar', image: 'https://picsum.photos/id/94/300/300' },
    { id: '5', name: 'Vishal-Shekhar', image: 'https://picsum.photos/id/95/300/300' },
  ];
  
  const popularAlbums = [
    { id: '1', title: 'Sanam Teri Kasam', artist: 'Himesh Reshammiya', image: 'https://picsum.photos/id/111/300/300' },
    { id: '2', title: 'Yeh Jawaani Hai Deewani', artist: 'Pritam', image: 'https://picsum.photos/id/112/300/300' },
    { id: '3', title: 'Aashiqui 2', artist: 'Mithoon, Ankit Tiwari', image: 'https://picsum.photos/id/113/300/300' },
    { id: '4', title: 'Young G.O.A.T', artist: 'Cheema Y, Gur Sidhu', image: 'https://picsum.photos/id/114/300/300' },
    { id: '5', title: 'Glory', artist: 'Yo Yo Honey Singh', image: 'https://picsum.photos/id/115/300/300' },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Trending songs</h2>
            <Link href="/songs" className="text-sm text-text-secondary font-bold hover:underline">
              Show all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {trendingSongs.map(song => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Popular artists</h2>
            <Link href="/artists" className="text-sm text-text-secondary font-bold hover:underline">
              Show all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Popular albums and singles</h2>
            <Link href="/albums" className="text-sm text-text-secondary font-bold hover:underline">
              Show all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularAlbums.map(album => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 