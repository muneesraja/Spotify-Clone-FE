import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { userAtom, authRedirectAtom, loadingAtom, LoginCredentials, RegisterCredentials, User } from '@/store/auth';
import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [authRedirect, setAuthRedirect] = useAtom(authRedirectAtom);
  const [authLoading, setAuthLoading] = useAtom(loadingAtom);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Log in user
  const login = async (credentials: LoginCredentials) => {
    setActionLoading(true);
    setError(null);
    
    try {
      const response = await api.post(endpoints.auth.login, credentials);
      const { user, access_token } = response.data;
      
      // Store token in localStorage for API requests
      localStorage.setItem('auth_token', access_token);
      
      // Update user state
      setUser(user);
      
      // Redirect if needed
      if (authRedirect) {
        router.push(authRedirect);
        setAuthRedirect(null);
      } else {
        router.push('/');
      }
      
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setActionLoading(false);
    }
  };

  // Register new user
  const register = async (credentials: RegisterCredentials) => {
    setActionLoading(true);
    setError(null);
    
    try {
      const response = await api.post(endpoints.auth.register, credentials);
      const { user, access_token } = response.data;
      
      // Store token in localStorage for API requests
      localStorage.setItem('auth_token', access_token);
      
      // Update user state
      setUser(user);
      
      // Redirect to home page
      router.push('/');
      
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setActionLoading(false);
    }
  };

  // Log out user
  const logout = async () => {
    try {
      setActionLoading(true);
      // Call logout endpoint if needed
      // await api.post(endpoints.auth.logout);
      
      // Clear token from localStorage
      localStorage.removeItem('auth_token');
      
      // Clear user state
      setUser(null);
      
      // Redirect to home page
      router.push('/');
      
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Logout failed. Please try again.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setActionLoading(false);
    }
  };

  // Handle redirect for protected routes
  const requireAuth = (redirectPath?: string) => {
    if (!isAuthenticated) {
      setAuthRedirect(redirectPath || window.location.pathname);
      router.push('/login');
    }
    return isAuthenticated;
  };

  return {
    user,
    isAuthenticated,
    loading: authLoading,
    actionLoading,
    error,
    login,
    register,
    logout,
    requireAuth
  };
}; 