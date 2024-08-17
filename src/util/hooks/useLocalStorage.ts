import { useState } from "react";

/**
 * useLocalStorage
 * @param {string} key
 * @param {T} initialValue
 * @returns {[T, (value: T) => void]}
 * @description Hook para el uso de localStorage
 */
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storeValue, setStoreValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      console.error("Error reading localStorage", e);
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    try {
      setStoreValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error setting localStorage", e);
    }
  };

  return [storeValue, setValue];
};
