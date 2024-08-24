import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertColor, Box } from "@mui/material";
import { useHandleBoolean } from "../../../../util/hooks/useHandleBoolean";
import { EscuelasRequest } from "../../../../util/interfaces/escuelas/EscuelasRequest";
import { ModalEditEscuela } from "../ModalEditEscuela";
import { DialogDeleteCustom } from "../dialog/DialogDeleteCustom";

export const SpeedDialCustom = ({ escuela, handleOpenToast, tema, url, updateData }: PropsSpeedDialCustom) => {
  const { open, handleOpen: handleOpenEdit, handleClose: handleCloseEdit } = useHandleBoolean();
  const { open: openSpeedDial, handleOpen : handleOpenSpeedDial, handleClose : handleCloseSpeedDial } = useHandleBoolean();
  const { open: openDialog, handleOpen: handleOpenDialog, handleClose: handleCloseDialog } = useHandleBoolean();

  const actions = [
    {
      icon: <AddIcon />,
      name: "Añadir Curso",
      onClick: () => console.log("hola"),
    },
    {
      icon: <DeleteIcon />,
      name: "Eliminar Escuela",
      onClick: () => {handleOpenDialog();
        handleCloseSpeedDial();
      }
    },
    {
      icon: <EditIcon />,
      name: "Editar Escuela",
      onClick: () => {handleOpenEdit();
        handleCloseSpeedDial();
      },
    },
  ];

  return (
    <Box sx={{ height: 320, flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="speedDial"
        sx={{ position: "absolute", bottom: 30, right: 30 }}
        icon={<SpeedDialIcon />}
        onClick={() => handleOpenSpeedDial()}
        open={openSpeedDial}
        onClose={handleCloseSpeedDial}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            sx={{ color: "primary.main", textWrap: "nowrap" }}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
      <ModalEditEscuela url={url} escuela={escuela} handleClose={handleCloseEdit} open={open} handleOpenToast={handleOpenToast} tema={tema} updateData={updateData}  />
      <DialogDeleteCustom open={openDialog} handleClose={handleCloseDialog} id={escuela.id} url={url} handleOpenToast={handleOpenToast} />
    </Box>
  );
};

interface PropsSpeedDialCustom {
  escuela: EscuelasRequest;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  tema: "light" | "dark";
  url: string;
  updateData : () => void;
}
