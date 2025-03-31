import axios from 'axios';



export const api = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // Ensure withCredentials is always true
  config.withCredentials = true;
  return config;
});