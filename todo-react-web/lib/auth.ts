import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  exp: number;
}

export function getTokenPayload(): TokenPayload | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}

export function getUserRole(): string | null {
  const payload = getTokenPayload();
  return payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? null;
}

export function isAdmin(): boolean {
  return getUserRole() === 'Admin';
}

export function isBusiness(): boolean {
  const role = getUserRole();
  return role === 'Business' || role === 'Admin';
}

export function isAuthenticated(): boolean {
  const payload = getTokenPayload();
  if (!payload) return false;
  return Date.now() < payload.exp * 1000;
}