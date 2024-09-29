import dayjs from "dayjs";
import axiosInstance from "../../../api/axiosInstance";

export const postCurso = async ({
  nombre,
  url,
  idEscuela,
  materia
}: PostCursoParams) => {
  const dateParse: string = dayjs().format("DD-MM-YYYY");

  const response = await axiosInstance.post(
    url + import.meta.env.VITE_API_POST_CURSO + "/" + idEscuela,
    { nombre, fecha: dateParse, materia }
  );
  return response.data;
};

interface PostCursoParams {
  nombre: string;
  url: string;
  idEscuela: number;
  materia: string;
}
