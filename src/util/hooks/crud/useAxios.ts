import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface FetchDataParams<T> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: T;
  params?: string;
}

const useAxios = <T>() => {
  const [response, setResponse] = useState<T>({} as T);
  const [errorRequest, setErrorRequest] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const axiosInstance = axios.create({
    baseURL:
      import.meta.env.VITE_base_url + import.meta.env.VITE_base_version_api,
  });

  axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  let controller = new AbortController();

  useEffect(() => {
    return () => controller?.abort();
  });

  const httpRequest = async ({
    url,
    method,
    data,
    params,
  }: FetchDataParams<T>) => {
    setIsLoading(true);

    controller.abort();
    controller = new AbortController();
    try {
      const result = await axiosInstance({
        url: url,
        method: method,
        data: data,
        params: params,
        signal: controller.signal,
      });
      setResponse(result.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            setErrorRequest(axiosError.response.data as string); // O maneja el error como necesites
          } else {
            setErrorRequest(axiosError.message);
          }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { response, errorRequest, isLoading, httpRequest };
};

export default useAxios;
