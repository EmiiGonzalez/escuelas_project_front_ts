import { AlertColor, Box, Grid2 } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchClase } from "../../util/shared/fetchClase";
import { ClasesRequest } from "../../util/interfaces/clases/ClasesRequest";
import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { PaperClase } from "./components/paper/PaperClase";
import { CardDescriptionClase } from "./components/cards/CardDescriptionClase";
import { CardDashboardAsistencia } from "./components/cards/CardDashboardAsistencia";
import { AlumnoResponseDtoWithAsistencia } from "../../util/interfaces/alumno/AlumnoResponseDtoWithAsistencia";
import { fetchAlumnos } from "../curso/util/fetchAlumno";
import { useHandleBoolean } from "../../util/hooks/useHandleBoolean";
import { DialogAsistencia } from "../curso/components/dialog/DialogAsistencia";

export const Clase = ({ url, handleOpenToast }: PropsClase) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const { id } = useParams();

  const datosClase = useQuery<ClasesRequest, Error>({
    queryKey: ["clase-info", id],
    queryFn: () => fetchClase(url, Number(id)),
  });

  const datosAlumnos = useQuery<AlumnoResponseDtoWithAsistencia[], Error>({
    queryKey: ["alumnos", id],
    queryFn: () => fetchAlumnos(url, Number(datosClase.data?.idCurso)),
    enabled: !!datosClase.data
  })

  const {
    open: openDialogAsistencia,
    handleOpen: handleOpenDialogAsistencia,
    handleClose: handleCloseDialogAsistencia,
  } = useHandleBoolean();

  return (
    <motion.div
      style={{ minHeight: "100vh", width: "100%" }}
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
          height: "100%",
        }}
      >
        <PaperClase
          url={url}
          handleOpenToast={handleOpenToast}
          datosClase={datosClase}
        />
        <Grid2 spacing={2} container sx={{ width: "95%" }}>
          <Grid2 size={{ xs: 12, sm: 5, md: 4 }}>
            <CardDescriptionClase datosClase={datosClase} />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 7, md: 8 }}>
            <CardDashboardAsistencia datosClase={datosClase} datosAlumnos={datosAlumnos} handleOpenDialogAsistencia={handleOpenDialogAsistencia}/>
          </Grid2>
        </Grid2>
        <DialogAsistencia
        dataAlumnos={datosAlumnos.data ? datosAlumnos.data : []}
        handleClose={handleCloseDialogAsistencia}
        open={openDialogAsistencia}
        url={url}
        idClase={Number(id)}
      />
      </Box>
    </motion.div>
  );
};

interface PropsClase {
  url: string;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
}
