import axiosInstance from "../../api/axiosInstance"
import { EscuelasRequest } from "../interfaces/escuelas/EscuelasRequest";

export const fetchEscuelas = async (url: string): Promise<EscuelasRequest[]> => {
    const urlApi = url + import.meta.env.VITE_API_GET_ALL_ESCUELAS
    const response = await axiosInstance.get(urlApi);
    return response.data;
}

export const fetchEscuela = async (url: string, id: number): Promise<EscuelasRequest> => {
    const urlApi = url + import.meta.env.VITE_API_GET_ESCUELA + "/" + id
    const response = await axiosInstance.get(urlApi);
    return response.data;
}