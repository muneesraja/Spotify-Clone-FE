'use server';

import { endpoints } from '@/lib/api/endpoints';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

  const API_URL = process.env.BASE_URL || 'http://localhost:3000';

export async function login(prevState: unknown, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await fetch(API_URL + endpoints.auth.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Important for handling cookies
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Login failed:', error);
      return { message: error.message || 'Login failed' };
    }
    const data = await response.json();
    console.log('Login successful, setting cookie...');
    
    // Set the JWT token in an HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    // Instead of immediate redirect, return success and let the client handle it
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { message: 'An error occurred during login' };
  }
}

export async function register(prevState: unknown, formData: FormData) {
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await fetch(API_URL + endpoints.auth.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Registration failed:', error);
      return { message: error.message || 'Registration failed' };
    }

    // After successful registration, log the user in
    const loginResult = await login(null, formData);
    if (loginResult.success) {
      return { success: true };
    }
    return loginResult;
  } catch (error) {
    console.error('Registration error:', error);
    return { message: 'An error occurred during registration' };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/login');
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  return token?.value;
} 