import axiosInstance from "../../../api/axiosInstance";

export const deleteEscuela = async ({ url, id }: DeleteEscuelaParams) => {
  const response = await axiosInstance.delete(
    url + import.meta.env.VITE_API_DISABLE_ESCUELA + "/" + id
  );
  return response.data;
};

interface DeleteEscuelaParams {
  id: number;
  url: string;
}
