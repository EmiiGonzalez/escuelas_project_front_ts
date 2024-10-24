import axiosInstance from "../../api/axiosInstance";
import { AsistenciaPost } from "../interfaces/asistencia/AsistenciaPost";

export const postAsistencia = async ({ url, id, asistencia }: PostEscuelaParams) => {
  const response = await axiosInstance.post(
    url + import.meta.env.VITE_API_POST_ASISTENCIA + "/" + id,
    asistencia
  );
  return response.data;
};

interface PostEscuelaParams {
  url: string;
  id: number;
  asistencia: AsistenciaPost[];
}
