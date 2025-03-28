'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom, loadingAtom } from '@/store/auth';
import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';

export default function AuthInitializer() {
  const [, setUser] = useAtom(userAtom);
  const [, setLoading] = useAtom(loadingAtom);

  useEffect(() => {
    const initAuth = async () => {
      // Start with loading state
      setLoading(true);
      
      // Check if we have a token
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          try {
            // Fetch user profile with the token
            const response = await api.get(endpoints.user.profile);
            
            if (response.data && response.data.email) {
              // Set the user in our global state
              setUser(response.data.email);
            } else {
              // Clear state if response doesn't have expected data
              setUser(null);
            }
          } catch (error) {
            // If the token is invalid or expired, clear it
            localStorage.removeItem('auth_token');
            setUser(null);
            console.error('Failed to initialize authentication:', error);
          }
        } else {
          // No token, clear user state
          setUser(null);
        }
      }
      
      // End loading state
      setTimeout(() => {
        setLoading(false);
      }, 500); // Small delay for better UX
    };

    initAuth();
  }, [setUser, setLoading]);

  // This component doesn't render anything
  return null;
} 