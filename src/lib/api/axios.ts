import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for JWT auth token
api.interceptors.request.use((config) => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}); 