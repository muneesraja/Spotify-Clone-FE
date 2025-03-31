import axios from 'axios';
import Cookies from 'js-cookie';



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