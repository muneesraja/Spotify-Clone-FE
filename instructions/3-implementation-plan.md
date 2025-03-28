# Spotify Clone Frontend Implementation Plan

## 1. Project Setup & Dependencies

### Core Dependencies
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS for styling
- shadcn/ui for UI components
- Jotai for state management
- React Query (via Jotai Query) for data fetching
- Axios for API calls

### Development Dependencies
- ESLint
- Prettier
- TypeScript
- TailwindCSS
- shadcn/ui CLI

## 2. Folder Structure

```
front-end/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── (main)/            # Main app routes
│   │   ├── search/
│   │   ├── artists/
│   │   ├── albums/
│   │   └── songs/
│   ├── layout.tsx
│   └── page.tsx
├── components/            # Reusable components
│   ├── ui/               # shadcn components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Player.tsx
│   └── shared/           # Shared components
│       ├── SongCard.tsx
│       ├── AlbumCard.tsx
│       └── ArtistCard.tsx
├── lib/                  # Utility functions and configurations
│   ├── api/             # API client setup
│   │   ├── axios.ts
│   │   └── endpoints.ts
│   ├── utils/           # Utility functions
│   │   ├── debounce.ts
│   │   └── format.ts
│   └── constants/       # Constants and configurations
├── hooks/               # Custom hooks
│   ├── useAuth.ts
│   ├── usePlayer.ts
│   └── useSearch.ts
├── store/              # Jotai atoms
│   ├── auth.ts
│   ├── player.ts
│   └── search.ts
└── types/              # TypeScript types
    ├── api.ts
    └── models.ts
```

## 3. Route Structure

### Authentication Routes
- `/login` - User login page
- `/register` - User registration page

### Main Routes
- `/` - Home page with featured content
- `/search` - Search page with results
- `/artists` - Artists listing page
- `/artists/[id]` - Individual artist page
- `/albums` - Albums listing page
- `/albums/[id]` - Individual album page
- `/songs/[id]` - Individual song page

### Protected Routes
- `/liked-songs` - User's liked songs (requires authentication)
- `/player` - Music player component (requires authentication)

## 4. State Management

### Jotai Atoms
1. **Authentication State**
   ```typescript
   // store/auth.ts
   export const userAtom = atom<User | null>(null);
   export const isAuthenticatedAtom = atom((get) => !!get(userAtom));
   export const authRedirectAtom = atom<string | null>(null); // Store redirect URL after login
   ```

2. **Player State**
   ```typescript
   // store/player.ts
   export const currentSongAtom = atom<Song | null>(null);
   export const isPlayingAtom = atom(false);
   export const volumeAtom = atom(1);
   export const isPlayerEnabledAtom = atom((get) => !!get(isAuthenticatedAtom));
   ```

3. **Search State**
   ```typescript
   // store/search.ts
   export const searchQueryAtom = atom('');
   export const searchResultsAtom = atom<SearchResults | null>(null);
   ```

## 5. API Integration

### API Client Setup
```typescript
// lib/api/axios.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Endpoints
```typescript
// lib/api/endpoints.ts
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  songs: {
    list: '/songs',
    featured: '/songs/featured',
    search: '/songs/search',
    like: (id: string) => `/songs/${id}/like`,
  },
  // ... other endpoints
};
```

## 6. Reusable Components

### Layout Components
1. **Header**
   - Navigation
   - Search bar
   - User menu

2. **Sidebar**
   - Navigation links
   - Library section
   - Playlists

3. **Player**
   - Song controls (protected)
   - Progress bar
   - Volume control
   - Preview mode for non-authenticated users
   - Login prompt when trying to play full song

### Shared Components
1. **SongCard**
   - Song thumbnail
   - Title and artist
   - Like button (with auth check)
   - Play button (with auth check)
   - Preview mode for non-authenticated users

2. **AlbumCard**
   - Album cover
   - Title and artist
   - Release date

3. **ArtistCard**
   - Artist image
   - Name
   - Description

4. **AuthGuard**
   ```typescript
   // components/auth/AuthGuard.tsx
   interface AuthGuardProps {
     children: React.ReactNode;
     fallback?: React.ReactNode;
   }
   
   export const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
     const isAuthenticated = useAtomValue(isAuthenticatedAtom);
     const setAuthRedirect = useSetAtom(authRedirectAtom);
     
     useEffect(() => {
       if (!isAuthenticated) {
         setAuthRedirect(window.location.pathname);
       }
     }, [isAuthenticated, setAuthRedirect]);
     
     if (!isAuthenticated) {
       return fallback || <LoginPrompt />;
     }
     
     return <>{children}</>;
   };
   ```

5. **LoginPrompt**
   ```typescript
   // components/auth/LoginPrompt.tsx
   export const LoginPrompt = () => {
     const router = useRouter();
     
     return (
       <div className="flex flex-col items-center gap-4 p-4">
         <p>Please log in to access this feature</p>
         <Button onClick={() => router.push('/login')}>
           Log In
         </Button>
       </div>
     );
   };
   ```

## 7. Utility Functions

### Search Debounce
```typescript
// lib/utils/debounce.ts
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
```

### Format Functions
```typescript
// lib/utils/format.ts
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
```

## 8. Loading States

### Loading Components
1. **Skeleton Loaders**
   - SongCardSkeleton
   - AlbumCardSkeleton
   - ArtistCardSkeleton

2. **Loading Spinners**
   - Button loading state
   - Page loading state

## 9. Error Handling

### Error Components
1. **ErrorBoundary**
   - Global error handling
   - Fallback UI

2. **API Error Handling**
   - Error messages
   - Retry mechanisms

## 10. Implementation Phases

### Phase 1: Setup & Authentication
1. Project initialization
2. Dependencies installation
3. Basic folder structure
4. Authentication implementation

### Phase 2: Core Features
1. Home page
2. Search functionality
3. Artist/Album/Song pages
4. Player implementation

### Phase 3: Enhanced Features
1. Like/Unlike functionality
2. User library
3. Playback controls
4. Responsive design

### Phase 4: Polish & Optimization
1. Loading states
2. Error handling
3. Performance optimization
4. Testing

## 11. Testing Strategy

### Unit Tests
- Component tests
- Hook tests
- Utility function tests

### Integration Tests
- API integration tests
- State management tests
- Route tests

### E2E Tests
- User flows
- Critical paths
- Edge cases

## 12. Authentication Flow

### Protected Features
1. **Player Access**
   - Non-authenticated users can preview songs (30-second clips)
   - Full playback requires authentication
   - Clicking play on full song redirects to login
   - After login, redirects back to previous page

2. **Liked Songs**
   - Like button shows login prompt for non-authenticated users
   - Stores current URL for post-login redirect
   - Automatically adds song to likes after login
   - Handles duplicate likes gracefully

3. **User Library**
   - Protected route requiring authentication
   - Shows user's liked songs
   - Displays playlists (future feature)

### Authentication Middleware
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register');
  
  if (!token && !isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/liked-songs/:path*',
    '/player/:path*',
  ],
};
```

### Authentication Hooks
```typescript
// hooks/useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [authRedirect, setAuthRedirect] = useAtom(authRedirectAtom);
  const router = useRouter();
  
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post(endpoints.auth.login, credentials);
      setUser(response.data.user);
      if (authRedirect) {
        router.push(authRedirect);
        setAuthRedirect(null);
      }
    } catch (error) {
      // Handle error
    }
  };
  
  return {
    user,
    isAuthenticated: !!user,
    login: handleLogin,
    logout: () => {
      setUser(null);
      router.push('/');
    },
  };
};
```
