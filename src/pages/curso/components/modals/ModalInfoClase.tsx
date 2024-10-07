import { Modal, Box, Typography } from "@mui/material";
import { ClasesRequest } from "../../../../util/interfaces/clases/ClasesRequest";
import { styleModal } from "../../../../util/shared/styles/modal/modalStyle";

export const ModalInfoClase = ({
  open,
  handleClose,
  clase,
}: ModalInfoClaseProps) => {
 
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Typography variant="h6" component="h2" color="text.primary">
          Clase numero {clase.numeroDeClase}
        </Typography>
        <Typography sx={{ mt: 2 }} color="text.secondary" variant="body2">
          Dictada el dia: {clase.fecha}
        </Typography>
        <Typography sx={{ mt: 2 }} color="text.primary">
          {clase.contenido}
        </Typography>
      </Box>
    </Modal>
  );
};

interface ModalInfoClaseProps {
  open: boolean;
  handleClose: () => void;
  clase: ClasesRequest;
}
