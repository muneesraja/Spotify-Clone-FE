export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
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
  },
  albums: {
    list: '/albums',
    featured: '/albums/featured',
    details: (id: string) => `/albums/${id}`,
  },
  user: {
    profile: '/auth/user/profile',
    likedSongs: '/user/liked-songs',
  },
}; 