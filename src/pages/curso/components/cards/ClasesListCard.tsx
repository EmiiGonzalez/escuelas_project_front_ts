import Typography from "@mui/material/Typography/Typography";
import { ClasesRequest } from "../../../../util/interfaces/clases/ClasesRequest";
import Stack from "@mui/material/Stack/Stack";
import Pagination from "@mui/material/Pagination/Pagination";
import Box from "@mui/material/Box/Box";
import InfoIcon from "@mui/icons-material/Info";
import { AlertColor, IconButton } from "@mui/material";
import { useHandleBoolean } from "../../../../util/hooks/useHandleBoolean";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import { DialogAsistencia } from "../../../../components/shared/dialog/DialogAsistencia";
import { AlumnoResponseDtoWithAsistencia } from "../../../../util/interfaces/alumno/AlumnoResponseDto";
import { UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ClasesListCard = ({
  data,
  totalPages,
  pageNumber,
  setPageNumber,
  url,
  datosAlumnos,
  handleOpenToast,
}: ClasesListCardProps) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };
  const [claseAction, setClaseAction] = useState<number>(0);

  const navigate = useNavigate();

  const handleInfoClase = (id: number): void => {
    navigate("/clase/" + id);
  };

  const {
    open: openDialogAsistencia,
    handleOpen: handleOpenDialogAsistencia,
    handleClose: handleCloseDialogAsistencia,
  } = useHandleBoolean();

  return (
    <>
      <Typography
        variant="h5"
        color={"text.primary"}
        sx={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      >
        Clases dictadas
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          marginTop: "1rem",
        }}
      >
        {data.length > 0 ? (
          data.map((clase) => (
            <Box
              key={clase.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  color={"text.primary"}
                  sx={{
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                >
                  {clase.contenido.length > 10
                    ? clase.contenido.substring(0, 10) + "..."
                    : clase.contenido}
                </Typography>
                <Typography color="#FFFF99" variant="subtitle2">
                  Fecha: {clase.fecha}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  aria-label="info"
                  onClick={() => {
                    handleInfoClase(clase.id);
                  }}
                  sx={{ color: "whitesmoke" }}
                >
                  {" "}
                  <InfoIcon />{" "}
                </IconButton>
                {!clase.asistencia && (
                  <IconButton
                    aria-label="asistencia"
                    onClick={() => {
                      setClaseAction(clase.id);
                      handleOpenDialogAsistencia();
                    }}
                    sx={{ color: "whitesmoke" }}
                  >
                    <ChecklistRtlIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          ))
        ) : (
          <Typography
            color={"text.primary"}
            sx={{
              marginBottom: "1rem",
              width: "100%",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            No se ha dictado alguna clase
          </Typography>
        )}
        <Stack spacing={2} alignItems={"center"} sx={{ width: "100%" }}>
          <Pagination
            count={totalPages}
            page={pageNumber}
            onChange={handleChange}
          />
        </Stack>
      </Box>
      <DialogAsistencia
        dataAlumnos={datosAlumnos.data ? datosAlumnos.data : []}
        handleClose={handleCloseDialogAsistencia}
        open={openDialogAsistencia}
        url={url}
        idClase={claseAction}
        handleOpenToast={handleOpenToast}
        updateData={datosAlumnos.refetch}
      />
    </>
  );
};

interface ClasesListCardProps {
  data: ClasesRequest[];
  totalPages: number;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  url: string;
  updateData: () => void;
  updateCountClases: () => void;
  datosAlumnos: UseQueryResult<AlumnoResponseDtoWithAsistencia[], Error>;
}
