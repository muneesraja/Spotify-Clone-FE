/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Artist } from './Artist';
import type { Song } from './Song';
export type Album = {
    /**
     * The unique identifier of the album
     */
    id: string;
    /**
     * The title of the album
     */
    title: string;
    /**
     * The URL of the album cover image
     */
    imageUrl: string;
    /**
     * The release date of the album
     */
    releaseDate: string;
    /**
     * The ID of the artist who created this album
     */
    artistId: string;
    /**
     * Whether the album is featured
     */
    isFeatured: boolean;
    /**
     * When the album was created in the system
     */
    createdAt: string;
    /**
     * When the album was last updated
     */
    updatedAt: string;
    /**
     * The artist who created this album
     */
    artist: Artist;
    /**
     * The songs in this album
     */
    songs: Array<Song>;
};

