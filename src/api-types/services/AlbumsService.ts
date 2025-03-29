/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Album } from '../models/Album';
import type { CreateAlbumDto } from '../models/CreateAlbumDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AlbumsService {
    /**
     * Create a new album
     * @param requestBody
     * @returns Album The album has been successfully created.
     * @throws ApiError
     */
    public static albumsControllerCreate(
        requestBody: CreateAlbumDto,
    ): CancelablePromise<Album> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/albums',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all albums
     * @returns Album Return all albums.
     * @throws ApiError
     */
    public static albumsControllerFindAll(): CancelablePromise<Array<Album>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/albums',
        });
    }
    /**
     * Get featured albums
     * @returns Album Return featured albums.
     * @throws ApiError
     */
    public static albumsControllerFindFeatured(): CancelablePromise<Array<Album>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/albums/featured',
        });
    }
    /**
     * Get an album by id
     * @param id
     * @returns Album Return the album.
     * @throws ApiError
     */
    public static albumsControllerFindOne(
        id: string,
    ): CancelablePromise<Album> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/albums/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Album not found.`,
            },
        });
    }
}
