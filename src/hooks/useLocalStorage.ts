import { useState, useCallback } from 'react';

export default function useLocalStorage<T extends unknown = string>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item =
        typeof window !== `undefined`
          ? window.localStorage.getItem(key)
          : undefined;
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback((value: React.SetStateAction<T>) => {
    setStoredValue((currVal) => {
      const newVal = value instanceof Function ? value(currVal) : value;

      window.localStorage.setItem(key, JSON.stringify(newVal));

      return newVal;
    });
  }, []);

  return [storedValue, setValue];
}
