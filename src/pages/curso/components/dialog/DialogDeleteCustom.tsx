import { AlertColor, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { deleteCurso } from "../../util/deleteCurso";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { CursosRequest } from "../../../../util/interfaces/cursos/CursoInterface";

export const DialogDeleteCursoCustom = ({ open, handleClose, url, curso, handleOpenToast }: PropsDialogDeleteCustom) => {
  
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteCurso,
    onSuccess: () => {
      navigate("/escuela/" + curso.escuelaId + "/" + new Date().getFullYear());
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        handleOpenToast("error", error.response?.data.message ? error.response?.data.message : "Error al borrar el curso");
      }
    },
  });

  const handleDelete = () => {
    mutation.mutate({ url, id: curso.id });
    handleClose();
  }

  return (
    <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align="center">{"¿Deseea borrar el curso?"}</DialogTitle>
        <DialogActions sx={{ justifyContent: "space-around" }}>
          <Button color="error" onClick={handleClose}>Cancelar</Button>
          <Button color="success" onClick={handleDelete}>Borrar</Button>
        </DialogActions>
      </Dialog>
  )
}

interface PropsDialogDeleteCustom {
  open: boolean
  handleClose: () => void
  url: string
  curso: CursosRequest
  handleOpenToast: (variante: AlertColor, msg: string) => void
}
