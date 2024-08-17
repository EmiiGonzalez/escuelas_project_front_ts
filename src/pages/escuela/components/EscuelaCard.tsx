import { Button, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { EscuelasRequest } from "../../../util/interfaces/escuelas/EscuelasRequest";

export const EscuelaCard = ({ datosEscuela, tema }: PropsEscuelaCard) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        height: "15vh",
      }}
    >
      <Box
        sx={{
          marginRight: "2rem",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" color={"text.primary"}>
          {datosEscuela.nombre}
        </Typography>
      </Box>
      <Box>
        <IconButton color="success" aria-label="edit" component="label">
          <EditIcon />
        </IconButton>

        <IconButton color="error" aria-label="delete" component="label">
          <DeleteIcon />
        </IconButton>

        <IconButton color="success" aria-label="delete" component="label">
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

interface PropsEscuelaCard {
  datosEscuela: EscuelasRequest;
  tema: "light" | "dark";
}
