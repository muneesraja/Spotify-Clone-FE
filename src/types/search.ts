export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Album {
  id: string;
  title: string;
  imageUrl: string;
  releaseDate: string;
  artistId: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  artist: Artist; // Nested artist info
}

// Nested album info within Song might be slightly different
export interface SongNestedAlbum {
    id: string;
    title: string;
    imageUrl: string;
    releaseDate: string;
    artistId: string;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Song {
  id: string;
  title: string;
  duration: number;
  url: string;
  imageUrl: string;
  albumId: string;
  artistId: string;
  isFeatured: boolean;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
  album: SongNestedAlbum; // Nested album info
  artist: Artist; // Nested artist info
}

export interface SearchResponse {
  songs: Song[];
  albums: Album[];
  artists: Artist[];
}
