import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const useCountUp = (end: number, duration: number = 2) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration * 60);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return { count, ref };
};
