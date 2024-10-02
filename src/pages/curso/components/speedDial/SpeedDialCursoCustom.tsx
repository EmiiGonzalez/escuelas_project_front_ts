import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContrastIcon from '@mui/icons-material/Contrast';
import { AlertColor, Box } from "@mui/material";
import { useHandleBoolean } from "../../../../util/hooks/useHandleBoolean";
import { DialogDeleteCursoCustom } from "../dialog/DialogDeleteCustom";
import { CursosRequest } from "../../../../util/interfaces/cursos/CursoInterface";
import { ModalEditCurso } from "../modals/ModalEditCurso";

export const SpeedDialCursoCustom = ({
  curso,
  handleOpenToast,
  tema,
  url,
  updateDataCurso,
  setTema
}: PropsSpeedDialCustom) => {
  const {
    open,
    handleOpen: handleOpenEdit,
    handleClose: handleCloseEdit,
  } = useHandleBoolean();
  const {
    open: openSpeedDial,
    handleOpen: handleOpenSpeedDial,
    handleClose: handleCloseSpeedDial,
  } = useHandleBoolean();
  const {
    open: openDialog,
    handleOpen: handleOpenDialog,
    handleClose: handleCloseDialog,
  } = useHandleBoolean();
  const actions = [
    {
      icon: <DeleteIcon sx={{ color: tema === "light" ? "#D91656" : "#B8001F" }} />,
      name: "Eliminar Curso",
      onClick: () => {
        handleOpenDialog();
        handleCloseSpeedDial();
      },
    },
    {
      icon: <EditIcon sx={{ color: tema === "light" ? "#117554" : "#347928" }} />,
      name: "Editar Curso",
      onClick: () => {
        handleOpenEdit();
        handleCloseSpeedDial();
      },
    },
    {
      icon: <ContrastIcon />,
      name: "Cambiar Tema",
      onClick: () => {
        setTema(tema === "light" ? "dark" : "light");
        handleCloseSpeedDial();
      },
    }
  ];

  return (
    <Box sx={{ height: 320, flexGrow: 1 , position: "fixed", bottom: 0, right: 0}}>
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
            sx={{ color: "primary.main", textWrap: "nowrap",}}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
      <ModalEditCurso
        url={url}
        curso={curso}
        handleClose={handleCloseEdit}
        open={open}
        handleOpenToast={handleOpenToast}
        tema={tema}
        updateData={updateDataCurso}
      />
      <DialogDeleteCursoCustom
        open={openDialog}
        handleClose={handleCloseDialog}
        curso={curso}
        url={url}
        handleOpenToast={handleOpenToast}
      />
    </Box>
  );
};

interface PropsSpeedDialCustom {
  curso: CursosRequest;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  tema: "light" | "dark";
  url: string;
  updateDataCurso: () => void;
  setTema: (t: "light" | "dark") => void;
}