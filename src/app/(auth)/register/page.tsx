'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle registration
    console.log('Register with:', name, email, password);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block mb-8">
            <h2 className="text-white text-3xl font-bold">Music <span className="text-primary">App</span></h2>
          </Link>
          <h2 className="text-2xl font-bold">Create your account</h2>
        </div>

        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-[#242424] border border-[#333] rounded-md focus:ring-primary focus:border-primary text-white"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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