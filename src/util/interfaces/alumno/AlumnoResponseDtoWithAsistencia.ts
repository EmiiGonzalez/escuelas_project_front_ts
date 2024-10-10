import { AsistenciaResponseDto } from "../asistencia/AsistenciaResponse";

export interface AlumnoResponseDtoWithAsistencia {
  id: number;
  nombre: string;
  telefono: string;
  asistencias: AsistenciaResponseDto[];
}
