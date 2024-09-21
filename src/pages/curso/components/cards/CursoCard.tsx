import { Typography } from "@mui/material";
import { CursosRequest } from "../../../../util/interfaces/cursos/CursoInterface";
import { Box } from '@mui/material';

export const CursoCard = ({ curso }: CursoCardProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h1" color={"text.primary"} sx={{userSelect: "none"}}>
          {curso.nombre}
        </Typography>
        <Typography variant="h5" color={"text.primary"} sx={{userSelect: "none"}}>
          {curso.materia}
        </Typography>
      </Box>
      <Box>
      </Box>
    </Box>
  );
};

interface CursoCardProps {
    curso: CursosRequest;
}