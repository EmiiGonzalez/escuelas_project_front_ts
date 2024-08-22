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

export const SpeedDialCustom = ({ escuela, handleOpenToast, tema, url, updateData }: PropsSpeedDialCustom) => {
  const { open, handleOpen, handleClose } = useHandleBoolean();

  const actions = [
    {
      icon: <AddIcon />,
      name: "Añadir Curso",
      onClick: () => console.log("hola"),
    },
    {
      icon: <DeleteIcon />,
      name: "Eliminar Escuela",
      onClick: () => console.log("hola"),
    },
    {
      icon: <EditIcon />,
      name: "Editar Escuela",
      onClick: () => handleOpen(),
    },
  ];

  return (
    <Box sx={{ height: 320, flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="speedDial"
        sx={{ position: "absolute", bottom: 30, right: 30 }}
        icon={<SpeedDialIcon />}
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
      <ModalEditEscuela url={url} escuela={escuela} handleClose={handleClose} open={open} handleOpenToast={handleOpenToast} tema={tema} updateData={updateData}  />
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
