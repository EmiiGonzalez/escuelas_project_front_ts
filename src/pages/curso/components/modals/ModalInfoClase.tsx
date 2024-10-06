import { Modal, Box, Typography } from "@mui/material";
import { ClasesRequest } from "../../../../util/interfaces/clases/ClasesRequest";
import { styleModal } from "../../../../util/shared/styles/modal/modalStyle";

export const ModalInfoClase = ( { open, handleClose, clase }: ModalInfoClaseProps ) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Clase numero {clase.numeroDeClase}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
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
