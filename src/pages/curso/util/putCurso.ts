import axiosInstance from "../../../api/axiosInstance";

export const putCurso = async ({ nombre, materia , url, id }: PutEscuelaParams) => {
  const response = await axiosInstance.put(
    url + import.meta.env.VITE_API_PUT_CURSO + "/" + id,
    { nombre, materia }
  );
  return response.data;
};

interface PutEscuelaParams {
  id: number;
  nombre: string;
  materia: string;
  url: string;
}
