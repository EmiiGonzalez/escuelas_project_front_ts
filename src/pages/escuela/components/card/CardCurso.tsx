import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import AddchartIcon from "@mui/icons-material/Addchart";
import { useNavigate } from "react-router-dom";
import { CursosRequest } from "../../../../util/interfaces/cursos/CursoInterface";

export const CardCurso = ({ nombre, materia, id }: CursosRequest) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/curso/${id}`);
  };

  return (
    <Card
      raised
      sx={{
        bgcolor: "secondary.dark",
        color: "secondary.contrastText",
        transition: "0.3s",
        "&:hover": {
          bgcolor: "secondary.A100",
          boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ userSelect: "none", fontWeight: "bold" }}
        >
          {nombre}
        </Typography>
        <Typography
          variant="body2"
          sx={{ userSelect: "none", fontWeight: "bold" }}
        >
          {materia}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<AddchartIcon />}
          sx={{
            color: "primary.contrastText",
            fontWeight: "bold",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          }}
          onClick={handleClick}
        >
          Mas Informacion
        </Button>
      </CardActions>
    </Card>
  );
};
