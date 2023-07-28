import { getCookie } from 'cookies-next';

export function isAuthenticated() {
  if (typeof window === 'undefined') return false; // Check if running on the server-side
  const token = getCookie('token'); // - client side
  if (!token) return false;
  return !!token; // Return true if the token exists
}
