import axiosInstance from "../../../api/axiosInstance";

export const postEscuela = async ({ nombre, url }: PostEscuelaParams) => {
  const response = await axiosInstance.post(
    url + import.meta.env.VITE_API_POST_ESCUELA,
    { nombre }
  );
  return response.data;
};

interface PostEscuelaParams {
  nombre: string;
  url: string;
}
