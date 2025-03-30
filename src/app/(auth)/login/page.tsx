'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/app/actions/auth';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const [state, formAction] = useFormState(login, null);

  useEffect(() => {
    if (state?.success) {
      router.push(redirectUrl || '/');
      router.refresh(); // Refresh to update the client-side router state
    }
  }, [state, router, redirectUrl]);

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

        {state?.message && (
          <div className="bg-red-500/20 border border-red-500 p-3 rounded-md text-white text-sm">
            {state.message}
          </div>
        )}

        <form action={formAction} className="mt-8 space-y-6">
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
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Log in
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-text-secondary">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-white hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 