import { atom } from 'jotai';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

// Store the user data
export const userAtom = atom<User | null>(null);

// Authentication loading state
export const loadingAtom = atom<boolean>(true);

// Derived atom to check if user is authenticated
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));

// Store redirect URL for post-login navigation
export const authRedirectAtom = atom<string | null>(null); 