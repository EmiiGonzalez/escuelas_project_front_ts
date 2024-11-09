import { AsistioEnum } from "../../../../util/interfaces/asistencia/AsistenciaPost";

/**
 * Mapa de colores de asistencia
 * 
 * @author Emiliano Gonzalez
 * @version 1.0
 * @since 1.0
 * 
 * @param asistio 
 * @returns string
 */
export const asistenciaMapColor = (asistio : AsistioEnum) => {
    switch (asistio) {
        case AsistioEnum.PRESENTE:
            return "#2ECC71";
        case AsistioEnum.AUSENTE:
            return "#E74C3C";
        case AsistioEnum.JUSTIFICADO:
            return "#F1C40F";
        case AsistioEnum.NOENLISTADO:
            return "#3498DB";
        default:
            return "primary.text";
    }
}