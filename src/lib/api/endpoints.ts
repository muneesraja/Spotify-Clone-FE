export const endpoints = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    profile: '/api/auth/user/profile',
  },
  songs: {
    list: '/api/songs',
    featured: '/api/songs/featured',
    search: '/api/songs/search',
    play: (id: string) => `/api/songs/${id}`,
    like: (id: string) => `/api/songs/${id}/like`,
  },
  artists: {
    list: '/api/artists',
    featured: '/api/artists/featured',
    details: (id: string) => `/api/artists/${id}`,
    songs: (id: string) => `/api/artists/${id}/songs`,
  },
  albums: {
    list: '/api/albums',
    featured: '/api/albums/featured',
    details: (id: string) => `/api/albums/${id}`,
  },
  users: {
    likedSongs: '/api/users/me/liked-songs',
  },
}; 