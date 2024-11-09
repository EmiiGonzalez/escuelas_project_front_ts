import axiosInstance from "../../../api/axiosInstance";
import {  AsistioEnum } from "../../../util/interfaces/asistencia/AsistenciaPost";

export const putAsistencia = async ({
  id,
  asistio,
  url
}: PostCursoParams) => {
  
  const response = await axiosInstance.put(
    url + import.meta.env.VITE_API_PUT_ASISTENCIA + "/" + id,
    {asistio}
  );
  return response.data;
};

interface PostCursoParams {
  url: string;
  id: number;
  asistio: AsistioEnum;
}
