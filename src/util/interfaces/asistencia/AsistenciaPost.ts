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

export const convertStringToAsistioEnum = (asistio: string): AsistioEnum => {
  return AsistioEnum[asistio as keyof typeof AsistioEnum];
};
