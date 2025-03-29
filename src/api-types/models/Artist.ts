/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Album } from './Album';
export type Artist = {
    /**
     * The unique identifier of the artist
     */
    id: string;
    /**
     * The name of the artist
     */
    name: string;
    /**
     * The URL of the artist's profile image
     */
    imageUrl: string;
    /**
     * A brief description of the artist
     */
    description: string | null;
    /**
     * Whether the artist is featured
     */
    isFeatured: boolean;
    /**
     * When the artist was created in the system
     */
    createdAt: string;
    /**
     * When the artist was last updated
     */
    updatedAt: string;
    /**
     * The albums by this artist
     */
    albums: Array<Album>;
};

