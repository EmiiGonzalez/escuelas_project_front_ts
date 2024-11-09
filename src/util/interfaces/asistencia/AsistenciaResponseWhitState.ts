import { AsistioEnum } from "./AsistenciaPost"

export interface AsistenciaResponseWhitState {
    id: number
    asistio: AsistioEnum
    alumno: string
}