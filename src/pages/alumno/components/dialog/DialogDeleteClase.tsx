import { AlertColor, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { deleteAlumno } from "../../util/deleteAlumno";

export const DialogDeleteAlumno = ({ open, handleClose, url, id, handleOpenToast, idCurso }: PropsDialogDeleteAlumno) => {

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteAlumno,
    onSuccess: () => {
      navigate("/curso/" + idCurso);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        handleOpenToast("error", error.response?.data.message ? error.response?.data.message : "Error al borrar el curso");
      }
    },
  });

  const handleDelete = () => {
    mutation.mutate({ url, id });
    handleOpenToast("success", "Alumno borrado con exito");
    handleClose();
  }

  return (
    <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align="center">{"¿Deseea borrar el alumno?"}</DialogTitle>
        <DialogActions sx={{ justifyContent: "space-around" }}>
          <Button color="error" onClick={handleClose}>Cancelar</Button>
          <Button color="success" onClick={handleDelete}>Borrar</Button>
        </DialogActions>
      </Dialog>
  )
}

interface PropsDialogDeleteAlumno {
  open: boolean
  handleClose: () => void
  url: string
  id: number
  idCurso: number
  handleOpenToast: (variante: AlertColor, msg: string) => void
}
