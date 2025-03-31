export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    profile: '/auth/user/profile',
  },
  songs: {
    list: '/songs',
    featured: '/songs/featured',
    search: '/songs/search',
    play: (id: string) => `/songs/${id}`,
    like: (id: string) => `/songs/${id}/like`,
  },
  artists: {
    list: '/artists',
    featured: '/artists/featured',
    details: (id: string) => `/artists/${id}`,
    songs: (id: string) => `/artists/${id}/songs`,
  },
  albums: {
    list: '/albums',
    featured: '/albums/featured',
    details: (id: string) => `/albums/${id}`,
  },
  users: {
    likedSongs: '/users/me/liked-songs',
  },
}; 