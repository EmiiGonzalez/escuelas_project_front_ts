import axiosInstance from "../../../api/axiosInstance";
import { AlumnoResponseDtoWithAsistencia } from "../../../util/interfaces/alumno/AlumnoResponseDto";


/**
 * @description Busca todos los alumnos de un curso
 * @param url base url de la API
 * @param cursoId id del curso
 * @returns todos los alumnos de un curso
 */
export const fetchAlumnos = async (url: string, cursoId: number): Promise<AlumnoResponseDtoWithAsistencia[]> => {
    const urlApi = url + import.meta.env.VITE_API_GET_ALL_ALUMNOS + "/" + cursoId
    const response = await axiosInstance.get(urlApi);
    return response.data;
}