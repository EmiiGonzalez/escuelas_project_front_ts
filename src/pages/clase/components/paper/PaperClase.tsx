import Grid from "@mui/material/Grid2";
import ClassIcon from "@mui/icons-material/Class";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AlertColor,
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { ClasesRequest } from "../../../../util/interfaces/clases/ClasesRequest";
import { useHandleBoolean } from "../../../../util/hooks/useHandleBoolean";
import { DialogDeleteClase } from "../dialog/DialogDeleteClase";
import { ModalEditClase } from "../modals/ModalEditClase";
import React from "react";

export const PaperClase = React.memo(({
  url,
  handleOpenToast,
  datosCurso,
}: PropsPaperClase) => {
  const {
    open: openDialogDelete,
    handleOpen: handleOpenDialogDelete,
    handleClose: handleCloseDialogDelete,
  } = useHandleBoolean();

  const {
    open: openDialogEdit,
    handleOpen: handleOpenDialogEdit,
    handleClose: handleCloseDialogEdit,
  } = useHandleBoolean();

  if (datosCurso.isLoading) {
    return <div>Loading...</div>;
  }

  if (datosCurso.isError || !datosCurso.data) {
    return <div>Error</div>;
  }

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          marginY: "1rem",
          borderRadius: "15px",
          width: "95%",
          minWidth: "300px",
        }}
      >
        <Grid
          container
          sx={{ justifyContent: "space-between", flexWrap: "nowrap" }}
        >
          <Grid
            columnSpacing={{ xs: 4, sm: 6, md: 8 }}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Avatar
              sx={{ width: 56, height: 56, backgroundColor: "#1976d2", mr: 2 }}
            >
              <ClassIcon />
            </Avatar>
            <Box>
              <Typography variant="h4" gutterBottom>
                Clase #{datosCurso.data?.numeroDeClase}
              </Typography>
              <Chip
                label={
                  datosCurso.data?.asistencia
                    ? "Asistencia Tomada"
                    : "Asistencia Pendiente"
                }
                color={datosCurso.data?.asistencia ? "success" : "warning"}
                variant="outlined"
              />
            </Box>
          </Grid>
          <Grid
            columnSpacing={{ xs: 2, sm: 4, md: 4 }}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-between",
              marginLeft: "5rem",
            }}
          >
            <IconButton color="primary" onClick={handleOpenDialogEdit}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={handleOpenDialogDelete}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      <DialogDeleteClase
        handleOpenToast={handleOpenToast}
        open={openDialogDelete}
        handleClose={handleCloseDialogDelete}
        url={url}
        id={datosCurso.data?.id}
        updateData={datosCurso.refetch}
      />
      <ModalEditClase
        clase={datosCurso.data}
        handleClose={handleCloseDialogEdit}
        handleOpenToast={handleOpenToast}
        url={url}
        open={openDialogEdit}
        updateListClases={datosCurso.refetch}
      />
    </>
  );
});

interface PropsPaperClase {
  url: string;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  datosCurso: UseQueryResult<ClasesRequest, Error>;
}
