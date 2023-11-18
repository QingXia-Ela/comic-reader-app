import $settings from '@/store/settings';
import sleep from '@/utils/sleep';
import Config from 'react-native-config';

let BASE_URL =
  process.env.NODE_ENV === 'development'
    ? Config.BACKEND_API
    : $settings.get().BackendAddress;

$settings.subscribe((value) => {
  BASE_URL = value.BackendAddress;
});

export const fetcher = async (url: string) => {
  await sleep(600);
  const { AuthHeaderKey, AuthHeaderValue } = $settings.get();
  const headers: Record<string, string> = {};
  if (AuthHeaderKey && AuthHeaderValue) {
    headers[AuthHeaderKey] = AuthHeaderValue;
  }
  const res = await fetch(`${BASE_URL}${url}`, {
    headers,
  });

  return await res.json();
};

export default function request(path: string, options: RequestInit = {}) {
  return fetch(path, {
    ...options,
    headers: {
      ...options.headers,
    },
  });
}
