import { API_BASE } from './config';

const TOKEN_KEY = 'token';
const TOKEN_EXPIRY_KEY = 'tokenExpiry';
const TOKEN_LIFETIME_MS = 5 * 60 * 1000;
const REFRESH_ENDPOINT = `${API_BASE}/users-service/api/v1/auth/refresh`;

export const saveAuthToken = (token: string) => {
  const expiresAt = Date.now() + TOKEN_LIFETIME_MS;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt.toString());
  return expiresAt;
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const getTokenExpiry = () => {
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  return expiry ? Number(expiry) : null;
};

export const isTokenExpired = () => {
  const expiry = getTokenExpiry();
  return !expiry || Date.now() >= expiry;
};

export const refreshAuthToken = async () => {
  const currentToken = getStoredToken();
  if (!currentToken) {
    throw new Error('NO_TOKEN');
  }

  const response = await fetch(REFRESH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${currentToken}`,
    },
    body: JSON.stringify({
      targetMethod: 'POST',
      body: {},
    }),
  });

  if (!response.ok) {
    throw new Error('REFRESH_FAILED');
  }

  const data = await response.json();
  const newToken = data?.token;
  if (!newToken) {
    throw new Error('REFRESH_FAILED');
  }

  saveAuthToken(newToken);
  return newToken;
};

export const ensureAuthToken = async () => {
  const currentToken = getStoredToken();
  if (!currentToken) {
    return null;
  }

  if (isTokenExpired()) {
    try {
      return await refreshAuthToken();
    } catch (error) {
      clearAuthToken();
      return null;
    }
  }

  return currentToken;
};
