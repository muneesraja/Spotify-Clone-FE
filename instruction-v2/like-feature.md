# Song Like Feature Implementation Plan

## 1. Goal

Integrate a song liking feature allowing authenticated users to like/unlike songs and view a list of their liked songs.

## 2. Technology Stack

-   Frontend Framework: Next.js
-   Language: TypeScript
-   State Management: Zustand (v5.0.3)
-   Styling: Tailwind CSS (implied from existing components)

## 3. Backend API Endpoints

The backend provides the following endpoints (using `BASE_URL` from `.env`):

-   **Like a song:** `POST /songs/:id/like`
-   **Unlike a song:** `DELETE /songs/:id/like`
-   **List liked songs:** `GET /users/me/liked-songs`

*Authentication is required for all endpoints.*

## 4. State Management (Zustand)

Create a dedicated Zustand store to manage the state of liked songs globally.

-   **File:** `src/store/likedSongsStore.ts`
-   **State:**
    -   `likedSongIds`: `Set<string>` - A set containing the IDs of songs the current user has liked. Using a Set provides efficient lookups (O(1)) to check if a song is liked.
    -   `isLoading`: `boolean` - Tracks loading state for fetching liked songs.
    -   `error`: `string | null` - Stores any potential error messages during API calls.
-   **Actions:**
    -   `fetchLikedSongs()`: Action to call the `GET /users/me/liked-songs` endpoint, update `likedSongIds`, and handle loading/error states.
    -   `toggleLike(songId: string)`: Action that determines if the song is currently liked.
        -   If liked, call `DELETE /songs/:id/like`.
        -   If not liked, call `POST /songs/:id/like`.
        -   Update `likedSongIds` optimistically and revert on error. Handle loading/error states for the specific toggle action.

## 5. API Utility Functions

Create or update API utility functions (e.g., in `src/lib/apiClient.ts` or a new `src/lib/api/songs.ts`) to handle authenticated requests to the like/unlike/list endpoints. These functions will encapsulate the `fetch` logic, including setting authentication headers and handling standard responses/errors. The Zustand store actions will utilize these functions.

## 6. UI Implementation

### a. Reusable Like Button Component

-   **File:** `src/components/shared/LikeButton.tsx`
-   **Props:** `songId: string`
-   **Functionality:**
    -   Subscribe to the `likedSongsStore` to get the `likedSongIds` set and the `toggleLike` action.
    -   Determine if the `songId` exists in the `likedSongIds` set.
    -   Render a button with a heart icon (filled if liked, outline if not).
    -   On click, call the `toggleLike(songId)` action from the store.
    -   Handle loading/disabled states during the toggle operation.

### b. Integrate Like Button into Existing Components

-   **`src/components/shared/SongCard.tsx`:**
    -   Import and use the `LikeButton` component.
    -   Position it appropriately, potentially as an overlay button visible on hover over the card, near the play button.
-   **`src/components/shared/SongList.tsx`:**
    -   Import and use the `LikeButton` component within the song row mapping (`.map`).
    -   Replace the existing placeholder heart button in the "Actions" column with `<LikeButton songId={song.id} />`.

### c. Library Section Update

-   **`src/components/layout/LibrarySection.tsx`:**
    -   Check if the user is authenticated.
    -   If authenticated, add a new entry/link within the library section (e.g., below the "Create favorites" block or as part of a list of playlists/categories).
    -   This entry should be styled like a playlist item (e.g., "Liked Songs").
    -   Clicking this entry should navigate the user to the `/liked-songs` page (`router.push('/liked-songs')`).

### d. Liked Songs Page

-   **Route:** `/liked-songs`
-   **File:** `src/app/liked-songs/page.tsx`
-   **Functionality:**
    -   This page should be a Client Component (`'use client'`).
    -   Protect the route, ensuring only authenticated users can access it. Redirect to login if not authenticated.
    -   Fetch the list of liked songs using an appropriate method (e.g., a server action triggered from a client component, or directly using the API utility function within a `useEffect` hook if fetching client-side).
    -   Use the `SongList` component to display the fetched liked songs. Pass the fetched songs data to `SongList`.
    -   Set an appropriate title (e.g., "Liked Songs").

## 7. Initialization

-   In a central part of the application that runs for authenticated users (e.g., the main layout component `src/app/layout.tsx` or a specific provider), call the `fetchLikedSongs()` action from the `likedSongsStore` *once* when the user's session is confirmed. This ensures the initial state of liked songs is available throughout the app.

## 8. Authentication Handling

-   Ensure all API calls related to the like feature include the necessary authentication token.
-   Implement robust error handling. If an API call returns a 401 Unauthorized error, the user's session might be invalid. Handle this by potentially clearing the local auth state and redirecting the user to the login page (`/login`).
-   Display appropriate feedback to the user for successful actions (like/unlike) and errors.
