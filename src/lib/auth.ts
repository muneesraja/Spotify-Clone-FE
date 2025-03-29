import { cookies } from 'next/headers';
import { endpoints } from '@/lib/api/endpoints';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}${endpoints.auth.profile}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getUser();
  return !!user;
} 