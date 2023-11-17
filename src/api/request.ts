import $settings from '@/store/settings';
import sleep from '@/utils/sleep';
import Config from 'react-native-config';

export const fetcher = async (url: string) => {
  await sleep(600);
  const { BackendAddress, AuthHeaderKey, AuthHeaderValue } = $settings.get();
  const headers: Record<string, string> = {};
  if (AuthHeaderKey && AuthHeaderValue) {
    headers[AuthHeaderKey] = AuthHeaderValue;
  }
  const res = await fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? Config.BACKEND_API
        : BackendAddress
    }${url}`,
    {
      headers,
    },
  );

  return await res.json();
};

export default function request(path: string, options: RequestInit) {
  return fetch(path, {
    ...options,
    headers: {
      ...options.headers,
    },
  });
}
