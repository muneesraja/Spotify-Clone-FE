/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateSongDto = {
    /**
     * The title of the song
     */
    title: string;
    /**
     * The duration of the song in seconds
     */
    duration: number;
    /**
     * The URL of the song file
     */
    url: string;
    /**
     * The URL of the song image
     */
    imageUrl: string;
    /**
     * The ID of the album that the song belongs to
     */
    albumId: string;
    /**
     * The ID of the artist that created the song
     */
    artistId: string;
    /**
     * Whether the song is featured
     */
    isFeatured: boolean;
    /**
     * The release date of the song
     */
    releaseDate: string;
};

