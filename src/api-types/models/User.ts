/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type User = {
    /**
     * The unique identifier of the user
     */
    id: string;
    /**
     * The email address of the user
     */
    email: string;
    /**
     * The username of the user
     */
    username: string;
    /**
     * The hashed password of the user
     */
    password: string;
    /**
     * Whether the user account is active
     */
    isActive: boolean;
    /**
     * When the user account was created
     */
    createdAt: string;
    /**
     * When the user account was last updated
     */
    updatedAt: string;
};

