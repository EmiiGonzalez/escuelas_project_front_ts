import dayjs from "dayjs";
import axiosInstance from "../../../api/axiosInstance";

export const putClase = async ({
  id,
  descripcion,
  url,
  numeroDeClase,
  fecha
}: PostCursoParams) => {
  if (fecha) {
    const response = await axiosInstance.put(
      url + import.meta.env.VITE_API_PUT_CLASE + "/" + id,
      { contenido: descripcion, fecha, numeroDeClase }
    );
    return response.data;
  }
  const dateParse: string = dayjs().format("DD-MM-YYYY");

  const response = await axiosInstance.put(
    url + import.meta.env.VITE_API_PUT_CLASE + "/" + id,
    {contenido: descripcion, fecha: dateParse, numeroDeClase}
  );
  return response.data;
};

interface PostCursoParams {
  descripcion: string;
  url: string;
  id: number;
  numeroDeClase: number;
  fecha?: string;
}
