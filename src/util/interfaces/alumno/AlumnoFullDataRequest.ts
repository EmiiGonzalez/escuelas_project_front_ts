import { AsistenciaResponseDto } from "../asistencia/AsistenciaResponse";
import { AsistenciaStats } from "../asistencia/AsistenciaStats";
import { AlumnoRequest } from "./AlumnoRequest";

/**
 * @interface AlumnoFullDataRequest 
 * @description Alumno con todas sus asistencias y estadisticas
 */
export interface AlumnoFullDataRequest {
    alumno: AlumnoRequest;
    idCurso: number;
    asistencias: AsistenciaResponseDto[];
    stats: AsistenciaStats[];
}