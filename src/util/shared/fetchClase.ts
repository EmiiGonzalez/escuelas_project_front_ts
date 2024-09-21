import axiosInstance from "../../api/axiosInstance";
import { ClasesRequest } from "../interfaces/clases/ClasesRequest";

/**
 * @description Busca todas las clases de un curso
 * @param url base url de la API
 * @param cursoId id del curso
 * @returns todas las clases
 */
export const fetchClases = async (url: string, cursoId: number): Promise<ClasesRequest[]> => {
    const urlApi = url + import.meta.env.VITE_API_GET_ALL_CLASES + "/" + cursoId
    const response = await axiosInstance.get(urlApi);
    return response.data;
}