import Typography from "@mui/material/Typography/Typography";
import { ClasesRequest } from "../../../../util/interfaces/clases/ClasesRequest";
import Stack from "@mui/material/Stack/Stack";
import Pagination from "@mui/material/Pagination/Pagination";
import Box from "@mui/material/Box/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { AlertColor, IconButton } from "@mui/material";
import { DialogDeleteClase } from "../dialog/DialogDeleteClase";
import { useHandleBoolean } from "../../../../util/hooks/useHandleBoolean";
import { useState } from "react";
import { ModalInfoClase } from "../modals/ModalInfoClase";

export const ClasesListCard = ({
  data,
  totalPages,
  pageNumber,
  setPageNumber,
  handleOpenToast,
  url,
  updateData,
  updateCountClases,
}: ClasesListCardProps) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };
  const [claseAction, setClaseAction] = useState<ClasesRequest>(
    {} as ClasesRequest
  );
  const [idAction, setIdAction] = useState<number>(0);
  const {
    open: openDialogDelete,
    handleOpen: handleOpenDialogDelete,
    handleClose: handleCloseDialogDelete,
  } = useHandleBoolean();
  const {
    open: openDialogEdit,
    handleOpen: handleOpenDialogEdit,
    handleClose: handleCloseDialogEdit,
  } = useHandleBoolean();

  return (
    <>
      <Typography
        variant="h5"
        color={"text.primary"}
        sx={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      >
        Clases dictadas
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          marginTop: "1rem",
        }}
      >
        {data.length > 0 ? (
          data.map((clase) => (
            <Box
              key={clase.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  color={"text.primary"}
                  sx={{
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                >
                  {clase.contenido.length > 10
                    ? clase.contenido.substring(0, 10) + "..."
                    : clase.contenido}
                </Typography>
                <Typography color="#FFFF99" variant="subtitle2">
                  Fecha: {clase.fecha}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setIdAction(clase.id);
                    handleOpenDialogDelete();
                  }}
                  sx={{ color: "whitesmoke" }}
                >
                  {" "}
                  <DeleteForeverIcon />{" "}
                </IconButton>
                <IconButton
                  aria-label="edit"
                  onClick={() => {}}
                  sx={{ color: "whitesmoke" }}
                >
                  {" "}
                  <EditIcon />{" "}
                </IconButton>
                <IconButton
                  aria-label="info"
                  onClick={() => {
                    setClaseAction(clase);
                    handleOpenDialogEdit();
                  }}
                  sx={{ color: "whitesmoke" }}
                >
                  {" "}
                  <InfoIcon />{" "}
                </IconButton>
              </Box>
            </Box>
          ))
        ) : (
          <Typography
            color={"text.primary"}
            sx={{
              marginBottom: "1rem",
              width: "100%",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            No se ha dictado alguna clase
          </Typography>
        )}
        <Stack spacing={2} alignItems={"center"} sx={{ width: "100%" }}>
          <Pagination
            count={totalPages}
            page={pageNumber}
            onChange={handleChange}
          />
        </Stack>
      </Box>
      <DialogDeleteClase
        handleOpenToast={handleOpenToast}
        open={openDialogDelete}
        handleClose={handleCloseDialogDelete}
        url={url}
        id={idAction}
        updateData={updateData}
        updateCountClases={updateCountClases}
      />
      <ModalInfoClase
        handleClose={handleCloseDialogEdit}
        open={openDialogEdit}
        clase={claseAction}
      />
    </>
  );
};

interface ClasesListCardProps {
  data: ClasesRequest[];
  totalPages: number;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  url: string;
  updateData: () => void;
  updateCountClases: () => void;
}
