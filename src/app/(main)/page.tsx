import Link from "next/link";
import { getFeaturedSongs } from "@/app/actions/songs";
import { getFeaturedArtists } from "@/app/actions/artists";
import { getFeaturedAlbums } from "@/app/actions/albums";
import type { Song } from "@/api-types/models/Song";
import type { Artist } from "@/api-types/models/Artist";
import type { Album } from "@/api-types/models/Album";

// Card Components
import { SongCard } from "@/components/shared/SongCard";
import { ArtistCard } from "@/components/shared/ArtistCard";
import { AlbumCard } from "@/components/shared/AlbumCard";

export default async function Home() {
  // Fetch data from the server
  const [trendingSongs, popularArtists, popularAlbums] = await Promise.all([
    getFeaturedSongs(),
    getFeaturedArtists(),
    getFeaturedAlbums(),
  ]);

  return (
    <div className="space-y-8">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Trending songs</h2>
          <Link href="/songs" className="text-sm text-text-secondary font-bold hover:underline">
            Show all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trendingSongs.map((song: Song & { artist: Artist }) => (
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
          {popularArtists.map((artist: Artist) => (
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
          {popularAlbums.map((album: Album) => (
            <AlbumCard key={album.id} artist={album.artist} album={album} />
          ))}
        </div>
      </section>
    </div>
  );
} 