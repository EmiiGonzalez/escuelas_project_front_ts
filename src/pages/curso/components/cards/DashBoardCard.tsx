import { AlertColor, Box, Button, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { ClasesCountRequest } from "../../../../util/interfaces/clases/ClasesCountInterface";
import { DashBoardCardSkeleton } from "../skeletons/cards/DashBoardCardSkeleton";
import { useHandleBoolean } from "../../../../util/hooks/useHandleBoolean";
import { ModalAddClase } from "../modals/ModalAddClase";
import { UseQueryResult } from "@tanstack/react-query";

export const DashBoardCard = ({
  url,
  idCurso,
  handleOpenToast,
  lastClase,
  updateListClases,
  cantClases,
}: PropsDashBoardCard) => {
  const {
    open: openModalAddClase,
    handleOpen: handleOpenModalAddClase,
    handleClose: handleCloseModalAddClase,
  } = useHandleBoolean();

  const openModal = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleOpenModalAddClase();
  };

  if (cantClases.isLoading) {
    return <DashBoardCardSkeleton />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around", width: "100%", height: "90%"}}>
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
        aria-hidden="true"
          variant="contained"
          size="large"
          sx={{
            marginTop: "1rem",
            width: "100%",
            backgroundColor: "#121212",
          }}
          onClick={openModal}
          startIcon={<ControlPointIcon />}
        >
          Agregar clase
        </Button>
        <Button
        aria-hidden="true"
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
      </Box>
      <ModalAddClase
        updateData={() => cantClases.refetch()}
        open={openModalAddClase}
        handleClose={handleCloseModalAddClase}
        url={url}
        idCurso={Number(idCurso)}
        handleOpenToast={handleOpenToast}
        lastClase={lastClase}
        updateListClases={updateListClases}
      />
    </Box>
  );
};

interface PropsDashBoardCard {
  url: string;
  idCurso: number;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  lastClase: number;
  updateListClases: () => void;
  cantClases: UseQueryResult<ClasesCountRequest, Error>
  ;
}
