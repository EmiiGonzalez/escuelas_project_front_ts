import axiosInstance from "../../../api/axiosInstance";

/**
 * @description elimina un solo Alumno
 * @param url base url de la API
 * @param id id del Alumno
 */
export const deleteAlumno = async ({ url, id }: DeleteAlumnoParams) => {
  const response = await axiosInstance.delete(
    url + import.meta.env.VITE_API_DELETE_ALUMNO + "/" + id
  );
  return response.data;
};

interface DeleteAlumnoParams {
  id: number;
  url: string;
}
