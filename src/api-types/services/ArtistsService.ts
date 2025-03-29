/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Artist } from '../models/Artist';
import type { CreateArtistDto } from '../models/CreateArtistDto';
import type { Song } from '../models/Song';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ArtistsService {
    /**
     * Create a new artist
     * @param requestBody
     * @returns Artist The artist has been successfully created.
     * @throws ApiError
     */
    public static artistsControllerCreate(
        requestBody: CreateArtistDto,
    ): CancelablePromise<Artist> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/artists',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all artists
     * @returns Artist Return all artists.
     * @throws ApiError
     */
    public static artistsControllerFindAll(): CancelablePromise<Array<Artist>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/artists',
        });
    }
    /**
     * Get featured artists
     * @returns Artist Return featured artists.
     * @throws ApiError
     */
    public static artistsControllerFindFeatured(): CancelablePromise<Array<Artist>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/artists/featured',
        });
    }
    /**
     * Get an artist by id
     * @param id
     * @returns Artist Return the artist.
     * @throws ApiError
     */
    public static artistsControllerFindOne(
        id: string,
    ): CancelablePromise<Artist> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/artists/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Artist not found.`,
            },
        });
    }
    /**
     * Get all songs for an artist
     * @param id
     * @returns Song Return all songs for an artist.
     * @throws ApiError
     */
    public static artistsControllerFindSongs(
        id: string,
    ): CancelablePromise<Array<Song>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/artists/{id}/songs',
            path: {
                'id': id,
            },
        });
    }
}
