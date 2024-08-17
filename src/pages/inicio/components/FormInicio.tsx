import { AlertColor, Button } from "@mui/material";
import { EscuelasRequest } from "../../../util/interfaces/escuelas/EscuelasRequest";
import { useEscuela } from "../../../util/hooks/useEscuela";
import { useHandleBoolean } from "../../../util/hooks/useHandleBoolean";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { AutoCompleteEscuela } from "./AutoCompleteEscuela";
import { ModalAddEscuela } from "./ModalAddEscuela";
import { Box } from '@mui/material';

export const FormInicio = (props: PropsFormInicio) => {
  const { data, handleOpenToast, tema, url, updateData } = props;
  const { escuela, setEscuela, error, setError } = useEscuela();
  const { open, handleOpen, handleClose } = useHandleBoolean();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (escuela.nombre == "") {
        setError({
          state: true,
          message: "Por favor, ingrese una escuela de la lista",
        });
        e.currentTarget.reset();
        return;
      }
      navigate(`/cursos/${escuela.id}/${new Date().getFullYear()}`);
  }

  return (
    <Box
      component={"form"}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      onSubmit={handleSubmit}
    >
        <AutoCompleteEscuela
        data={data} setEscuela={setEscuela} setError={setError} tema={tema} error={error} />
        <Box
        sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}
      >
        <Button
          variant={tema === "light" ? "contained" : "outlined"}
          type="submit"
        >
          Buscar
        </Button>
        <Button
          onClick={handleOpen}
          variant={tema === "light" ? "contained" : "outlined"}
          color="success"
          startIcon={<AddIcon />}
        >
          Añadir
        </Button>
        <ModalAddEscuela
          open={open}
          handleClose={handleClose}
          tema={tema}
          updateData={updateData}
          url={url}
          handleOpenToast={handleOpenToast}
        />
      </Box>
    </Box>
  );
};

interface PropsFormInicio {
  data: EscuelasRequest[];
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  tema: "light" | "dark";
  url: string;
  updateData: ( d: EscuelasRequest ) => void;
}
