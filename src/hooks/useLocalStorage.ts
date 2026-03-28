import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : (typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    }
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
        if (error instanceof DOMException && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
          alert('Paměť prohlížeče je plná. Prosím, promažte starou historii pro uvolnění místa.');
        }
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
