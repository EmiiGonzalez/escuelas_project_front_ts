import Grid from "@mui/material/Grid2";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
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
import { useHandleBoolean } from "../../../../util/hooks/useHandleBoolean";
import React from "react";
import { AlumnoFullDataRequest } from "../../../../util/interfaces/alumno/AlumnoFullDataRequest";
import { ModalEditAlumno } from "../../../../components/shared/modal/ModalEditAlumno";
import { DialogDeleteAlumno } from "../dialog/DialogDeleteClase";

export const PaperAlumno = React.memo(
  ({
    url,
    handleOpenToast,
    datosAlumno,
    update,
  }: PropsCardDescriptionAlumno) => {
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
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: "#1976d2",
                  mr: 2,
                }}
              >
                <ContactPageIcon />
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                  maxWidth: "500px",
                }}
              >
                <Typography variant="h4" gutterBottom sx={{fontSize: 'calc(1.3rem + 0.6vw)'}}>
                  {datosAlumno.alumno.nombre}
                </Typography>
                <Chip
                sx={{width: '100%', maxWidth: '150px'}}
                  icon={<SmartphoneIcon />}
                  label={datosAlumno.alumno.telefono}
                  color={"success"}
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
                maxHeight: "80px",
              }}
            >
              <IconButton
                color="primary"
                onClick={handleOpenDialogEdit}
                aria-hidden="true"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={handleOpenDialogDelete}
                aria-hidden="true"
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
        <ModalEditAlumno
          handleOpenToast={handleOpenToast}
          open={openDialogEdit}
          handleClose={handleCloseDialogEdit}
          alumnoData={datosAlumno.alumno}
          url={url}
          update={update}
        />
        <DialogDeleteAlumno 
        handleClose={handleCloseDialogDelete}
        handleOpenToast={handleOpenToast}
        open={openDialogDelete}
        url={url}
        id={datosAlumno.alumno.id}
        idCurso={datosAlumno.idCurso}
        />
      </>
    );
  }
);

interface PropsCardDescriptionAlumno {
  url: string;
  datosAlumno: AlumnoFullDataRequest;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  update: () => void;
}
