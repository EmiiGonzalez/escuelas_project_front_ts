import axiosInstance from "../../../api/axiosInstance";
import { AlumnoFullDataRequest } from "../../../util/interfaces/alumno/AlumnoFullDataRequest";

/**
 * @description Busca un solo alumno por id
 * @param url base url de la API
 * @param id id de la clase
 * @returns el alumno con todas sus asistencias
 */
export const fetchAlumnoFullData = async (url: string, id: number): Promise<AlumnoFullDataRequest> => {
    const urlApi = url + import.meta.env.VITE_API_GET_ALUMNO_FULL_DATA + "/" + id;
    const response = await axiosInstance.get(urlApi);
    
    return response.data;
}