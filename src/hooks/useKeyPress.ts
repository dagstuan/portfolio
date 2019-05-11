import { useState, useEffect } from 'react';

interface IKey {
  key: string;
  shiftKey?: boolean;
}

export default function useKeyPress(...targetKeys: IKey[]) {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = (event: KeyboardEvent) => {
    const targetKey = targetKeys.find(k => k.key === event.key);

    if (targetKey) {
      event.preventDefault();
      if ((targetKey.shiftKey || false) === event.shiftKey) {
        setKeyPressed(true);
      }
    }
  };

  const upHandler = (event: KeyboardEvent) => {
    const targetKey = targetKeys.find(k => k.key === event.key);

    if (targetKey) {
      event.preventDefault();
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
    }

    // Remove event listeners on cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      }
    };
  }, []);

  return keyPressed;
}
