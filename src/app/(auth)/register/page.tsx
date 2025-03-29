'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from '@/app/actions/auth';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';

export default function Register() {
  const router = useRouter();
  const [state, formAction] = useFormState(register, null);

  useEffect(() => {
    if (state?.success) {
      router.push('/');
      router.refresh(); // Refresh to update the client-side router state
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block mb-8">
            <h2 className="text-white text-3xl font-bold">Music <span className="text-primary">App</span></h2>
          </Link>
          <h2 className="text-2xl font-bold">Create your account</h2>
        </div>

        {state?.message && (
          <div className="bg-red-500/20 border border-red-500 p-3 rounded-md text-white text-sm">
            {state.message}
          </div>
        )}

        <form action={formAction} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
                Full name
              </label>
              <input
                id="name"
                name="username"
                type="text"
                required
                className="w-full px-4 py-3 bg-[#242424] border border-[#333] rounded-md focus:ring-primary focus:border-primary text-white"
                placeholder="Full name"
              />
            </div>
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
              Sign up
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-text-secondary">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 