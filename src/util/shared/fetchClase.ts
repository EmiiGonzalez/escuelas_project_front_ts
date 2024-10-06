import axiosInstance from "../../api/axiosInstance";
import { ClasesRequest } from "../interfaces/clases/ClasesRequest";
import { Page } from "../interfaces/PageInterface";

/**
 * @description Busca todas las clases de un curso
 * @param url base url de la API
 * @param cursoId id del curso
 * @returns todas las clases
 */
export const fetchClases = async (url: string, cursoId: number, pageNumber: number): Promise<Page<ClasesRequest>> => {
    //El back comienza con la página 0 en vez de 1, por eso se resta 1
    const urlApi = url + import.meta.env.VITE_API_GET_ALL_CLASES + "/" + cursoId + "?page=" + (pageNumber - 1) + "&size=" + import.meta.env.VITE_PAGE_SIZE;
    const response = await axiosInstance.get(urlApi);
    
    return response.data;
}