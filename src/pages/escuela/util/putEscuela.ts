import axiosInstance from "../../../api/axiosInstance";

export const putEscuela = async ({ nombre, url, id }: PutEscuelaParams) => {
  const response = await axiosInstance.put(
    url + import.meta.env.VITE_API_PUT_ESCUELA + "/" + id,
    { nombre }
  );
  return response.data;
};

interface PutEscuelaParams {
  id: number;
  nombre: string;
  url: string;
}
