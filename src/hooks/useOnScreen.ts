import { useState, useEffect, RefObject } from 'react';

export default function useOnScreen(ref: RefObject<HTMLElement>) {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: `0px`,
        threshold: 0.9,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref.current]); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}
