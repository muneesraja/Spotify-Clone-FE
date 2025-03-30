/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Album } from './Album';
import type { Artist } from './Artist';
export type Song = {
    /**
     * The unique identifier of the song
     */
    id: string;
    /**
     * The title of the song
     */
    title: string;
    /**
     * The duration of the song in seconds
     */
    duration: number;
    /**
     * The URL where the song file is stored
     */
    url: string;
    /**
     * The URL of the song's cover image
     */
    imageUrl: string | null;
    /**
     * The URL for the audio file
     */
    audioUrl?: string;
    /**
     * The ID of the album this song belongs to
     */
    albumId: string;
    /**
     * The ID of the artist who created this song
     */
    artistId: string;
    /**
     * Whether the song is featured on the platform
     */
    isFeatured: boolean;
    /**
     * The release date of the song
     */
    releaseDate: string;
    /**
     * When the song was created in the system
     */
    createdAt: string;
    /**
     * When the song was last updated
     */
    updatedAt: string;
    /**
     * The album object this song belongs to
     */
    album: Album;
    /**
     * The artist object who created this song
     */
    artist: Artist;
};

