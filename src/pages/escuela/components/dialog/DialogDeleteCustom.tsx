import { AlertColor, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { deleteEscuela } from "../../util/deleteEscuela";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const DialogDeleteCustom = ({ open, handleClose, url, id, handleOpenToast }: PropsDialogDeleteCustom) => {
  
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteEscuela,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        handleOpenToast("error", error.response?.data.message ? error.response?.data.message : "Error al borrar la escuela");
      }
    },
  });

  const handleDelete = () => {
    mutation.mutate({ url, id });
    handleClose();
  }

  return (
    <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align="center">{"¿Deseea borrar la escuela?"}</DialogTitle>
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
  id: number
  handleOpenToast: (variante: AlertColor, msg: string) => void
}
