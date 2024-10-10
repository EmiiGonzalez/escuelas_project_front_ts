import { AlertColor, Box, Button, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ClasesCountRequest } from "../../../../util/interfaces/clases/ClasesCountInterface";
import { DashBoardCardSkeleton } from "../skeletons/cards/DashBoardCardSkeleton";
import { useHandleBoolean } from "../../../../util/hooks/useHandleBoolean";
import { ModalAddClase } from "../modals/ModalAddClase";
import { UseQueryResult } from "@tanstack/react-query";
import { ModalAddAlumno } from "../modals/ModalAddAlumno";

export const DashBoardCard = ({
  url,
  idCurso,
  handleOpenToast,
  updateListClases,
  cantClases,
}: PropsDashBoardCard) => {
  const {
    open: openModalAddClase,
    handleOpen: handleOpenModalAddClase,
    handleClose: handleCloseModalAddClase,
  } = useHandleBoolean();
  const {
    open: openModalAddAlumno,
    handleOpen: handleOpenModalAddAlumno,
    handleClose: handleCloseModalAddAlumno,
  } = useHandleBoolean();

  const openModalClaseEvent = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    handleOpenModalAddClase();
  };

  if (cantClases.isLoading) {
    return <DashBoardCardSkeleton />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-around",
        width: "100%",
        height: "90%",
      }}
    >
      <Typography variant="h5" color={"text.primary"}>
        Total de clases dictadas
      </Typography>
      <Typography
        color={"text.primary"}
        sx={{
          marginBottom: "1rem",
          width: "100%",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        {cantClases.data?.count}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          marginTop: "1.5rem",
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            marginTop: "1rem",
            width: "100%",
            backgroundColor: "#121212",
          }}
          onClick={openModalClaseEvent}
          startIcon={<ControlPointIcon />}
        >
          Agregar clase
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            marginTop: "1rem",
            width: "100%",
            backgroundColor: "#121212",
          }}
          startIcon={<LibraryBooksIcon />}
        >
          Pasar Asistencia
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            marginTop: "1rem",
            width: "100%",
            backgroundColor: "#121212",
          }}
          startIcon={<PersonAddIcon />}
          onClick={() => handleOpenModalAddAlumno()}
        >
          Añadir alumno
        </Button>
      </Box>
      <ModalAddClase
        updateData={() => cantClases.refetch()}
        open={openModalAddClase}
        handleClose={handleCloseModalAddClase}
        url={url}
        cantClases={cantClases.data?.count || 0}
        idCurso={Number(idCurso)}
        handleOpenToast={handleOpenToast}
        updateListClases={updateListClases}
      />
      <ModalAddAlumno handleClose={handleCloseModalAddAlumno} open={openModalAddAlumno} url={url} idCurso={Number(idCurso)} handleOpenToast={handleOpenToast} />
    </Box>
  );
};

interface PropsDashBoardCard {
  url: string;
  idCurso: number;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  updateListClases: () => void;
  cantClases: UseQueryResult<ClasesCountRequest, Error>;
}
