'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const { login, actionLoading, error } = useAuth();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block mb-8">
            <h2 className="text-white text-3xl font-bold">Music <span className="text-primary">App</span></h2>
          </Link>
          <h2 className="text-2xl font-bold">Log in to your account</h2>
          {redirectUrl && (
            <p className="text-sm text-text-secondary mt-2">
              You need to login to access this feature
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 p-3 rounded-md text-white text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-[#242424] border border-[#333] rounded-md focus:ring-primary focus:border-primary text-white"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={actionLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-[#242424] border border-[#333] rounded-md focus:ring-primary focus:border-primary text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={actionLoading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={actionLoading}
              className="w-full flex justify-center py-3 px-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {actionLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : 'Log in'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-text-secondary">
            Don't have an account?{' '}
            <Link href="/register" className="text-white hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 