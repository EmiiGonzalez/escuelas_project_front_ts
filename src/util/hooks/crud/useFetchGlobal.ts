import axiosInstance from "../../../api/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";

/**
 * @function useFetchGlobal
 * @description Hook para consumir endpoints globales con axios en React
 * @param path - path del endpoint a consumir
 * @returns  {data: T[] | T, loading: boolean, error: string, updateData: (d: T) => void}
 */
export const useFetchGlobal = <T>(path: string): useFetchGlobalState<T> => {
  const [data, setData] = useState<T[] | T>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<T | T[]>(path);
      setData(response.data);
      setLoading(false);
    } catch (e) {
      const axiosError = e as AxiosError;
      if (axiosError.response) {
        setError(axiosError.response.data as string); // O maneja el error como necesites
      } else {
        setError(axiosError.message);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateData = (d: T) => {
    if (Array.isArray(data)) {
      setData([...data, d]);
    } else {
      setData(d);
    }
  }

  return { data, loading, error, updateData };
};

interface useFetchGlobalState<T> {
  data: T[] | T;
  loading: boolean;
  error: string;
  updateData: (d: T) => void
}
