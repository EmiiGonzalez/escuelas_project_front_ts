import axiosInstance from "../../../api/axiosInstance";

export const postAlumno = async ({
  url,
  idCurso,
  alumno, 
  telefono,
}: PostAlumnoParams) => {
  
  const response = await axiosInstance.post(
    url + import.meta.env.VITE_API_POST_ALUMNO + "/" + idCurso,
    {nombre: alumno, telefono}
  );
  return response.data;
};

interface PostAlumnoParams {
  url: string;
  idCurso: number;
  alumno: string;
  telefono: string;
}
