/**
 * @param id
 * @param claseNumero
 * @param fecha
 * @param asistio
 */
export interface AsistenciaResponseDto {
  id: number;
  claseNumero: number;
  fecha: string;
  asistio: boolean;
}

/**
 * @param id
 * @param asistio
 */
export interface AsistenciaRecord{
  id: number;
  asistio: boolean;
}