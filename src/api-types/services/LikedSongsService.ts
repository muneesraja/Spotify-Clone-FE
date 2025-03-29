/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Song } from '../models/Song';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LikedSongsService {
    /**
     * Get current user's liked songs
     * @returns Song Return the list of liked songs.
     * @throws ApiError
     */
    public static likedSongsControllerGetLikedSongs(): CancelablePromise<Array<Song>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me/liked-songs',
            errors: {
                401: `Unauthorized.`,
            },
        });
    }
}
