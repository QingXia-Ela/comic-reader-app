export default function request(path: string, options: RequestInit) {
  return fetch(path, {
    ...options,
    headers: {
      ...options.headers,
    },
  });
}
