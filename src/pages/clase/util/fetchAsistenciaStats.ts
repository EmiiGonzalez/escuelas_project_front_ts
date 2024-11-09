import axiosInstance from "../../../api/axiosInstance";
import { AsistenciaResponseWhitState } from "../../../util/interfaces/asistencia/AsistenciaResponseWhitState";
import { AsistenciaStats } from "../../../util/interfaces/asistencia/AsistenciaStats";

/**
 * @description Busca stats de asistencia de una clase
 * @param url base url de la API
 * @param id id de la clase
 * @returns la clase
 */
export const fetchAsistenciaStats = async (url: string, id: number): Promise<AsistenciaStats[]> => {
    const urlApi = url + import.meta.env.VITE_API_GET_ASISTENCIA_STATS + "/" + id;
    const response = await axiosInstance.get(urlApi);
    
    return response.data;
}

/**
 * @description Busca asistencias de una clase
 * @param url base url de la API
 * @param id id de la clase
 * @returns lista de asistencia de la clase con estado
 */
export const fetchAsistenciaWithState = async (url: string, id: number): Promise<AsistenciaResponseWhitState[]> => {
    const urlApi = url + import.meta.env.VITE_API_GET_ASISTENCIA_FOR_CLASE_WITH_STATE + "/" + id;
    const response = await axiosInstance.get(urlApi);
    return response.data;
}