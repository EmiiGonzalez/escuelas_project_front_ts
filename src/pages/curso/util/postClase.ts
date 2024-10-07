import dayjs from "dayjs";
import axiosInstance from "../../../api/axiosInstance";

export const postClase = async ({
  descripcion,
  url,
  idCurso,
  numeroDeClase,
  fecha
}: PostCursoParams) => {
  console.log(numeroDeClase);
  if (fecha) {
    
    const response = await axiosInstance.post(
      url + import.meta.env.VITE_API_POST_CLASE + "/" + idCurso,
      { contenido: descripcion, fecha, numeroDeClase }
    );
    return response.data;
  }
  const dateParse: string = dayjs().format("DD-MM-YYYY");

  const response = await axiosInstance.post(
    url + import.meta.env.VITE_API_POST_CLASE + "/" + idCurso,
    {contenido: descripcion, fecha: dateParse, numeroDeClase}
  );
  return response.data;
};

interface PostCursoParams {
  descripcion: string;
  url: string;
  idCurso: number;
  numeroDeClase: number;
  fecha?: string;
}
