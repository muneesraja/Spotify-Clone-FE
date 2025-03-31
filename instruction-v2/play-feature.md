# Song Play Feature Implementation Plan

## 1. Goal

Implement a simple audio player feature that allows users to play songs from the song list or song cards. The player should be hidden by default and appear when a song is played.

## 2. Technology Stack

-   Frontend Framework: Next.js
-   Language: TypeScript
-   State Management: Zustand (v5.0.3)
-   Styling: Tailwind CSS
-   Audio Playback: HTML5 Audio API
-   HTTP Client: Axios

## 3. Backend API Endpoints

The backend provides the following endpoints (using `BASE_URL` from `.env`):

-   **Get song details:** `GET /songs/:id`
  - Returns song details including the URL path (e.g., "/song.mp4")
  - The full URL will be constructed using `SONG_BASE_URL` from `.env`

## 4. State Management (Zustand)

Create a dedicated Zustand store to manage the player state globally.

-   **File:** `src/store/playerStore.ts`
-   **State:**
    -   `currentSong`: `Song | null` - Currently playing song details
    -   `isPlaying`: `boolean` - Whether the song is currently playing
    -   `isVisible`: `boolean` - Whether the player component is visible
    -   `isLoading`: `boolean` - Loading state while fetching song details
    -   `error`: `string | null` - Any error messages
-   **Actions:**
    -   `playSong(songId: string)`: Action to play a song
        -   Fetch song details using the API
        -   Construct full URL using `SONG_BASE_URL`
        -   Update state with song details
        -   Set `isVisible` to true
        -   Handle loading and error states
    -   `pauseSong()`: Action to pause the current song
    -   `resumeSong()`: Action to resume the paused song
    -   `stopSong()`: Action to stop playing and hide the player
    -   `setVolume(volume: number)`: Action to adjust volume (0-1)

## 5. API Utility Functions

Update the existing songs API functions in `src/lib/api/songs.ts`:

-   Add `getSongDetails(id: string)` function to fetch song details
-   Use the existing Axios instance and endpoints

## 6. UI Implementation

### a. Audio Player Component

-   **File:** `src/components/player/AudioPlayer.tsx`
-   **Props:** None (uses Zustand store)
-   **Functionality:**
    -   Hidden by default, visible when a song is playing
    -   Display current song details (title, artist)
    -   Play/pause button
    -   Progress bar
    -   Volume control
    -   Close button to hide the player
    -   Handle audio events (ended, error, etc.)

### b. Update Existing Components

-   **`src/components/shared/SongCard.tsx`:**
    -   Add play button next to the like button
    -   Use the player store's `playSong` action
    -   Style consistently with the like button

-   **`src/components/shared/SongList.tsx`:**
    -   Update the existing play button to use the player store's `playSong` action
    -   Ensure proper error handling and loading states

### c. Player Container

-   **File:** `src/components/player/PlayerContainer.tsx`
-   **Functionality:**
    -   Fixed position at the bottom of the screen
    -   Only render when `isVisible` is true
    -   Contains the AudioPlayer component
    -   Handle responsive layout

## 7. Integration

-   Add the `PlayerContainer` to the main layout (`src/app/layout.tsx`)
-   Ensure the player is accessible across all pages
-   Handle route changes without interrupting playback

## 8. Error Handling

-   Handle network errors during song loading
-   Handle audio playback errors
-   Provide user feedback for errors
-   Gracefully handle cases where song URL is invalid

## 9. Performance Considerations

-   Preload song details when hovering over play buttons
-   Cache song details in the Zustand store
-   Optimize audio loading and playback
-   Handle memory cleanup when stopping playback

## 10. User Experience

-   Smooth transitions when showing/hiding the player
-   Visual feedback during loading states
-   Clear indication of currently playing song
-   Persistent playback across page navigation
-   Keyboard shortcuts for play/pause (optional)
