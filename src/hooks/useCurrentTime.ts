import { useEffect, useState } from 'react';

export default function useCurrentTime(timeout = 1000) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, timeout);
    return () => clearInterval(timer);
  }, []);

  return currentTime;
}
