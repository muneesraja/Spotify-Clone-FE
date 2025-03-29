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
    like: (id: string) => `/songs/${id}/like`,
    play: (id: string) => `/songs/${id}/play`,
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
  user: {
    likedSongs: '/users/me/liked-songs',
  },
}; 