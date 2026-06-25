import { useState, useEffect, useRef } from 'react';

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [hasEnded, setHasEnded] = useState(false);
  const intervalRef = useRef(null);

  function getTimeLeft(date) {
    const now = new Date().getTime();
    const target = new Date(date).getTime();
    const diff = target - now;

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      if (target <= now) {
        setHasEnded(true);
        clearInterval(intervalRef.current);
        return;
      }
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [targetDate]);

  return { ...timeLeft, hasEnded };
}
