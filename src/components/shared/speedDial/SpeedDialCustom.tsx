import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useHandleBoolean } from "../../../util/hooks/useHandleBoolean";

const actions = [
  { icon: <AddIcon />, name: "Añadir Curso" },
  { icon: <DeleteIcon />, name: "Eliminar Escuela" },
  { icon: <EditIcon />, name: "Editar Escuela" },
];

export const SpeedDialCustom = () => {
  const { open, handleOpen, handleClose } = useHandleBoolean();
  return (
    <Box sx={{ height: 320, flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="speedDial"
        sx={{ position: "absolute", bottom: 30, right: 30 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            sx={{ color: "primary.main", textWrap: "nowrap" }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};
