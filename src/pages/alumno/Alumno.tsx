import { Alert, AlertColor, Box, CircularProgress, Grid2 } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { fetchAlumnoFullData } from "./util/fetchAlumnoFullData";
import { useQuery } from "@tanstack/react-query";
import { AlumnoFullDataRequest } from "../../util/interfaces/alumno/AlumnoFullDataRequest";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { PaperAlumno } from "./components/paper/CardDescriptionAlumno";
import { CardDashboardAsistenciaAlumno } from "./components/cards/CardDashboardAsistenciaAlumno";
import { CardListAsistenciaAlumno } from "./components/cards/CardListAsistenciaAlumno";

export const Alumno = ({ url, handleOpenToast }: PropsAlumno) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  const datosFullAlumno = useQuery<AlumnoFullDataRequest, Error>({
    queryKey: ["alumno-full-data", id],
    queryFn: () => fetchAlumnoFullData(url, Number(id)),
  });

  if (!id) {
    return <CircularProgress />;
  }

  if (datosFullAlumno.isError || !datosFullAlumno.data) {
    if (!datosFullAlumno.data) {
      return (
        <Alert severity="error">
          Ocurrio un error al cargar los datos del alumno
        </Alert>
      );
    }
    if (datosFullAlumno.error instanceof AxiosError) {
      return (
        <Alert severity="error">
          {datosFullAlumno.error.response?.data.message
            ? datosFullAlumno.error.response?.data.message
            : datosFullAlumno.error?.message ||
              "Ocurrio un error al cargar los datos del alumno"}
        </Alert>
      );
    }
  }

  console.log(datosFullAlumno.data);

  return (
    <>
      <motion.div
        style={{ minHeight: "100vh", width: "95%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <PaperAlumno
            datosAlumno={datosFullAlumno.data}
            handleOpenToast={handleOpenToast}
            update={datosFullAlumno.refetch}
            url={url}
          />
          <Grid2 spacing={2} container sx={{ width: "95%" }}>
            <Grid2 size={{ xs: 12, sm: 5, md: 4 }}>
              <CardDashboardAsistenciaAlumno
                datosAlumnos={datosFullAlumno.data.alumno}
                datosStats={datosFullAlumno.data.stats}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 7, md: 8 }}>
              <CardListAsistenciaAlumno
                datosAsistencia={datosFullAlumno.data.asistencias}
                handleOpenToast={handleOpenToast}
                updateData={datosFullAlumno.refetch}
                url={url}
                datosAlumno={datosFullAlumno.data.alumno}
              />
            </Grid2>
          </Grid2>
        </Box>
      </motion.div>
    </>
  );
};

interface PropsAlumno {
  url: string;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
}
