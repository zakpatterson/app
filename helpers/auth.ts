import { useEffect, useState } from 'react';
import { getItem, removeItem, setItem } from './localstorage';

type AccessTokenListener = (accessToken: string | null) => unknown;

const MINUTES_15 = 1000 * 60 * 15;

const accessTokenListeners: Set<AccessTokenListener> = new Set();

export async function getAccessToken() {
  const accessToken = await getItem('accessToken', null);
  const accessTokenExpires = await getItem('accessTokenExpires', 0);
  const refreshToken = await getItem('refreshToken', null);

  if (accessToken && accessTokenExpires > Date.now()) {
    return accessToken;
  } else if (refreshToken) {
    return refreshAccessToken(refreshToken);
  }

  return null;
}

export async function refreshAccessToken(refreshToken: string) {
  // TODO: Exchange refresh token to new access token and refresh token here

  const accessToken = `accessToken-${Date.now()}`;
  const accessTokenExpires = Date.now() + MINUTES_15;
  const newRefreshToken = `refreshToken-${Date.now()}`;

  await setItem('accessToken', accessToken);
  await setItem('accessTokenExpires', accessTokenExpires);
  await setItem('refreshToken', newRefreshToken);

  emitAccessTokenUpdateEvent(accessToken);

  return accessToken;
}

export async function signOut() {
  await removeItem('accessToken');
  await removeItem('accessTokenExpires');
  await removeItem('refreshToken');

  emitAccessTokenUpdateEvent(null);
}

export function listenAccessTokenUpdates(fn: AccessTokenListener) {
  accessTokenListeners.add(fn);
  return () => unlistenAccessTokenUpdate(fn);
}

export function unlistenAccessTokenUpdate(fn: AccessTokenListener) {
  accessTokenListeners.delete(fn);
}

function emitAccessTokenUpdateEvent(accessToken: string | null) {
  accessTokenListeners.forEach((fn) => fn(accessToken));
}

export function useAuth() {
  const [user, setUser] = useState<string | null>();

  useEffect(() => {
    getAccessToken().then((accessToken) => setUser(accessToken));

    return listenAccessTokenUpdates((accessToken) => {
      setUser(accessToken);
    });
  }, []);

  return { user };
}
