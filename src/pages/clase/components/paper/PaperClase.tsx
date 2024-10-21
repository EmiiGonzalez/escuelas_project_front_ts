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

export const PaperClase = ({
  url,
  handleOpenToast,
  datosCurso,
}: PropsPaperClase) => {
  if (datosCurso.isLoading) {
    return <div>Loading...</div>;
  }

  if (datosCurso.isError) {
    return <div>Error</div>;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        marginY: "1rem",
        borderRadius: "15px",
        width: "80%",
        minWidth: "350px",
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
          <Avatar sx={{ width: 56, height: 56, backgroundColor: "#1976d2", mr: 2 }}>
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
          sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
        >
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

interface PropsPaperClase {
  url: string;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  datosCurso: UseQueryResult<ClasesRequest, Error>;
}
