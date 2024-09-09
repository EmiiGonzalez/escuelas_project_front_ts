import axiosInstance from "../../../api/axiosInstance";

export const postCurso = async ({
  nombre,
  url,
  idEscuela,
  materia
}: PostCursoParams) => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  const dateParse: string = `${day}-${month}-${date.getFullYear()}`;

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
