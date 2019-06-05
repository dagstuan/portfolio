import { useState, useCallback, useLayoutEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useDarkMode = (): [boolean, () => void] => {
  const [localStorageDark, setLocalStorageDark] = useLocalStorage(
    'dark',
    false
  );
  const [dark, setDark] = useState(localStorageDark);

  const toggleDark = useCallback(() => {
    const nextDark = !dark;
    setDark(nextDark);
    setLocalStorageDark(nextDark);
  }, [dark]);

  useLayoutEffect(() => {
    setDark(localStorageDark);
  }, []);

  return [dark, toggleDark];
};

export default useDarkMode;
