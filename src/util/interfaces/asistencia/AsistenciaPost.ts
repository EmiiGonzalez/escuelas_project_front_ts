export interface AsistenciaPost {
  id: number;
  asistio: AsistioEnum;
}

export enum AsistioEnum {
  PRESENTE = "PRESENTE",
  AUSENTE = "AUSENTE",
  JUSTIFICADO = "JUSTIFICADO",
  NOENLISTADO = "NOENLISTADO",
}

export const convertStringToAsistioEnum = (asistio: "PRESENTE" | "AUSENTE" | "JUSTIFICADO" | "NOENLISTADO"): AsistioEnum => {
  return AsistioEnum[asistio as keyof typeof AsistioEnum];
};
