import { CursosRequest } from "../interfaces/cursos/CursoInterface";
import axiosInstance from "../../api/axiosInstance"
import { ClasesCountRequest } from "../interfaces/clases/ClasesCountInterface";

/**
 * @description Busca todos los Cursos de una Escuela por año
 * @param url base url de la API
 * @param escuelaId id de la escuela
 * @param year año a buscar
 * @returns Cursos de la escuela
 */
export const fetchCursos = async (url: string, escuelaId: number, year: number): Promise<CursosRequest[]> => {
    const urlApi = url + import.meta.env.VITE_API_GET_ALL_CURSO + "/" + escuelaId + "/" + year
    const response = await axiosInstance.get(urlApi);
    return response.data;
}

/**
 * @description Busca un solo curso por id
 * @param url base url de la API
 * @param id id del curso
 * @returns el curso
 */
export const fetchCurso = async (url: string, id: number): Promise<CursosRequest> => {
    const urlApi = url + import.meta.env.VITE_API_GET_CURSO + "/" + id 
    const response = await axiosInstance.get(urlApi);
    return response.data;
}

/**
 * @description Busca el total de clases de un curso
 * @param url base url de la API
 * @param cursoId id del curso
 * @returns el total de clases
 */
export const fetchCountClasesForCurso = async (url: string, cursoId: number): Promise<ClasesCountRequest> => {
    const urlApi = url + import.meta.env.VITE_API_GET_COUNT_CLASES_CURSO + "/" + cursoId
    const response = await axiosInstance.get(urlApi);
    return response.data;
}