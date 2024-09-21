import axiosInstance from "../../../api/axiosInstance";

export const postClase = async ({
  descripcion,
  url,
  idCurso,
  numeroDeClase,
  fecha
}: PostCursoParams) => {
  if (fecha) {
    const response = await axiosInstance.post(
      url + import.meta.env.VITE_API_POST_CURSO + "/" + idCurso,
      { contenido: descripcion, fecha, numero: numeroDeClase }
    );
    return response.data;
  }
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  const dateParse: string = `${day}-${month}-${date.getFullYear()}`;

  const response = await axiosInstance.post(
    url + import.meta.env.VITE_API_POST_CURSO + "/" + idCurso,
    {contenido: descripcion, fecha: dateParse, numero: numeroDeClase}
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
