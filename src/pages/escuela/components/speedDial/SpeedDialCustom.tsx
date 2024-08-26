import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContrastIcon from '@mui/icons-material/Contrast';
import { AlertColor, Box } from "@mui/material";
import { useHandleBoolean } from "../../../../util/hooks/useHandleBoolean";
import { EscuelasRequest } from "../../../../util/interfaces/escuelas/EscuelasRequest";
import { ModalEditEscuela } from "../modals/ModalEditEscuela";
import { DialogDeleteCustom } from "../dialog/DialogDeleteCustom";
import { ModalAddCurso } from "../modals/ModalAddCurso";

export const SpeedDialCustom = ({
  escuela,
  handleOpenToast,
  tema,
  url,
  updateDataEscuela,
  updateDataCursos,
  setTema,
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
  const {
    open: openModalAddCurso,
    handleOpen: handleOpenModalAddCurso,
    handleClose: handleCloseModalAddCurso,
  } = useHandleBoolean();

  const actions = [
    {
      icon: <AddIcon />,
      name: "Añadir Curso",
      onClick: () => {
        handleOpenModalAddCurso();
        handleCloseSpeedDial();
      },
    },
    {
      icon: <DeleteIcon />,
      name: "Eliminar Escuela",
      onClick: () => {
        handleOpenDialog();
        handleCloseSpeedDial();
      },
    },
    {
      icon: <EditIcon />,
      name: "Editar Escuela",
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
            sx={{ color: "primary.main", textWrap: "nowrap" }}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
      <ModalEditEscuela
        url={url}
        escuela={escuela}
        handleClose={handleCloseEdit}
        open={open}
        handleOpenToast={handleOpenToast}
        tema={tema}
        updateData={updateDataEscuela}
      />
      <ModalAddCurso
        handleClose={handleCloseModalAddCurso}
        open={openModalAddCurso}
        handleOpenToast={handleOpenToast}
        idEscuela={escuela.id}
        tema={tema}
        updateData={updateDataCursos}
        url={url}
      />
      <DialogDeleteCustom
        open={openDialog}
        handleClose={handleCloseDialog}
        id={escuela.id}
        url={url}
        handleOpenToast={handleOpenToast}
      />
    </Box>
  );
};

interface PropsSpeedDialCustom {
  escuela: EscuelasRequest;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  tema: "light" | "dark";
  url: string;
  updateDataEscuela: () => void;
  updateDataCursos: () => void;
  setTema: (t: "light" | "dark") => void;
}
