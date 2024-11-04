import axiosInstance from "../../api/axiosInstance";

export const putAlumno = async ({
  url,
  idAlumno,
  alumno, 
  telefono,
}: PutAlumnoParams) => {
  console.log(alumno,telefono);
  
  const response = await axiosInstance.put(
    url + import.meta.env.VITE_API_PUT_ALUMNO + "/" + idAlumno,
    {nombre: alumno, telefono}
  );
  return response.data;
};

interface PutAlumnoParams {
  url: string;
  idAlumno: number;
  alumno: string;
  telefono: string;
}
