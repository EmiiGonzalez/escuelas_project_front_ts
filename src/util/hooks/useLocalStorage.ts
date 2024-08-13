import { useState } from "react";

/**
 * @function useLocalStorage
 * @description Hook custom para el uso de LocalStorage en React
 * @param {string} key - Key to store data
 * @param {T} initialValue - Valor inicial para el LocalStorage en caso de que no exista de tipo T o generico
 * @returns {[T, (value: T) => void]} - Retorna el valor del LocalStorage y una funcion para setearlo
 */
export const useLocalStorage = <T>(key: string, initialValue: T) : [T, (value: T) => void] => {

    /**
     * @function [storeValue, setStoreValue]
     * @description Retorna el valor del LocalStorage y una funcion para setearlo
     * @param {T} initialValue - Valor inicial para el LocalStorage en caso de que no exista de tipo T o generico
     * @returns {[T, (value: T) => void]} - Retorna el valor del LocalStorage y una funcion para setearlo
     */
  const [storeValue, setStoreValue] = useState<T>(() => {
    try {
        const item = window.localStorage.getItem(key);
        if (item) return JSON.parse(item);

        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
    } catch (e) {
       return initialValue 
    }
  });

  /**
   * @function setValue
   * @description Setea el valor del LocalStorage
   * @param {T} value - Valor a setear
   * @returns {void} - No retorna
   */
  const setValue = (value: T): void => {
    try {
        setStoreValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log(e);
    }
  }

  return [storeValue, setValue]
};
