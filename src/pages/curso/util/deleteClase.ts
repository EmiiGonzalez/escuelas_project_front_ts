import axiosInstance from "../../../api/axiosInstance";

export const deleteClase = async ({ url, id }: DeleteClaseParams) => {
  const response = await axiosInstance.delete(
    url + import.meta.env.VITE_API_DELETE_CLASE + "/" + id
  );
  return response.data;
};

interface DeleteClaseParams {
  id: number;
  url: string;
}
