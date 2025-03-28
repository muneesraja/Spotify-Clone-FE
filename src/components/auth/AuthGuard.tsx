'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginPrompt from '@/components/auth/LoginPrompt';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectPath?: string;
}

export default function AuthGuard({ 
  children, 
  fallback,
  redirectPath
}: AuthGuardProps) {
  const { isAuthenticated, requireAuth } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      requireAuth(redirectPath);
    }
  }, [isAuthenticated, requireAuth, redirectPath]);
  
  if (!isAuthenticated) {
    return fallback || <LoginPrompt />;
  }
  
  return <>{children}</>;
} 