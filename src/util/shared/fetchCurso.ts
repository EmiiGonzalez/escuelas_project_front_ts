import { CursosRequest } from "../interfaces/cursos/CursoInterface";
import axiosInstance from "../../api/axiosInstance"

export const fetchCursos = async (url: string, escuelaId: number, year: number): Promise<CursosRequest[]> => {
    const urlApi = url + import.meta.env.VITE_API_GET_ALL_CURSO + "/" + escuelaId + "/" + year
    const response = await axiosInstance.get(urlApi);
    return response.data;
}