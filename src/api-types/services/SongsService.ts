/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSongDto } from '../models/CreateSongDto';
import type { SearchResponseDto } from '../models/SearchResponseDto';
import type { Song } from '../models/Song';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SongsService {
    /**
     * Create a new song
     * @param requestBody
     * @returns Song The song has been successfully created.
     * @throws ApiError
     */
    public static songsControllerCreate(
        requestBody: CreateSongDto,
    ): CancelablePromise<Song> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/songs',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all songs
     * @returns Song Return all songs.
     * @throws ApiError
     */
    public static songsControllerFindAll(): CancelablePromise<Array<Song>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/songs',
        });
    }
    /**
     * Get featured songs
     * @returns Song Return featured songs.
     * @throws ApiError
     */
    public static songsControllerFindFeatured(): CancelablePromise<Array<Song>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/songs/featured',
        });
    }
    /**
     * Search across songs, albums, and artists
     * @param q
     * @returns SearchResponseDto Return matching songs, albums, and artists.
     * @throws ApiError
     */
    public static songsControllerSearch(
        q: string,
    ): CancelablePromise<SearchResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/songs/search',
            query: {
                'q': q,
            },
        });
    }
    /**
     * Get a song by id
     * @param id
     * @returns Song Return the song.
     * @throws ApiError
     */
    public static songsControllerFindOne(
        id: string,
    ): CancelablePromise<Song> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/songs/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Song not found.`,
            },
        });
    }
    /**
     * Like a song
     * @param id
     * @returns any The song has been liked.
     * @throws ApiError
     */
    public static songsControllerLikeSong(
        id: string,
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/songs/{id}/like',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Unlike a song
     * @param id
     * @returns any The song has been unliked.
     * @throws ApiError
     */
    public static songsControllerUnlikeSong(
        id: string,
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/songs/{id}/like',
            path: {
                'id': id,
            },
        });
    }
}
