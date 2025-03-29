# Changelog - Frontend

## [2.0.0] - 2025-03-29

### Added
- Migrated `/songs`, `/artists`, `/albums`, and `/search` routes to Server Components.
- Implemented Server Actions (`actions/songs.ts`, `actions/artists.ts`, `actions/albums.ts`) for data fetching (e.g., `getSongDetails`, `getArtistDetails`, `getAlbumDetails`).
- Implemented `getLikedSongs` server action and integrated liked songs display in the library section.
- Added global state management for liked songs (using Jotai/Context and `LikedSongsProvider`).
- Added `QueryProvider` for `@tanstack/react-query` to manage client-side data fetching state (e.g., for search).
- Refactored `(main)` layout to handle user authentication data fetching and pass props to `MainLayout`.
- Implemented real-time search updates in `SearchForm` using debouncing.
- Created specific components for nested routes (e.g., `AlbumSongs`, `ArtistAlbums`).

### Changed
- Refactored `Header` and `Sidebar` to accept `user` and `isAuthenticated` as props instead of fetching directly.
- Updated `SongList` component to handle different artist data structures.
- Modified `SearchPage` and `SearchResults` to handle `SearchResponseDto` and display songs, artists, and albums.

### Fixed
- Resolved various build errors related to Server/Client component boundaries.
- Fixed type errors in `SongList` and search results display.
- Corrected React Query setup by adding `QueryClientProvider`.
- Addressed issues with data fetching and prop drilling for layout components.

## [1.0.0] - 2025-03-28

### Added
- Created project structure using Next.js App Router
- Implemented responsive layout with Tailwind CSS
- Added MainLayout component with conditional rendering for auth pages
- Created core layout components:
  - Header with search functionality
  - Sidebar with navigation and user library access
  - Player with playback controls
- Implemented shared card components:
  - SongCard for displaying song information
  - ArtistCard for displaying artist information
  - AlbumCard for displaying album information
- Added authentication pages:
  - Login page with form validation
  - Registration page with form validation
- Created search functionality with results display
- Added home page with trending songs, popular artists, and albums
- Implemented responsive design for mobile, tablet, and desktop viewports

### Fixed
- Resolved routing conflicts between authentication and main pages
- Fixed layout issues with component visibility and positioning
- Corrected metadata configuration in root layout

### Technical
- Organized component structure for maximum reusability
- Implemented client-side navigation with proper routing
- Added proper error handling for authentication flows
- Used TypeScript for type safety throughout the application
