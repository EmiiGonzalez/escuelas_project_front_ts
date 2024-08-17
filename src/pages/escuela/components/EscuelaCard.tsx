import { Typography } from "@mui/material";
import { EscuelasRequest } from "../../../util/interfaces/escuelas/EscuelasRequest";
import { Box } from '@mui/material';

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
      </Box>
    </Box>
  );
};

interface PropsEscuelaCard {
  datosEscuela: EscuelasRequest;
  tema: "light" | "dark";
}
