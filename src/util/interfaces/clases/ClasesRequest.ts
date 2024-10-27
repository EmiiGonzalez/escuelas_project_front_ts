export interface ClasesRequest {
    id: number
    fecha: string
    contenido: string
    numeroDeClase : number
    asistencia : boolean
    idCurso : number
    message? : string
    errorCode? : number
}