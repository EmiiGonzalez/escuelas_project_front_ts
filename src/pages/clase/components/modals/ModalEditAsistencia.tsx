import {
  AlertColor,
  Backdrop,
  Button,
  Divider,
  Fade,
  FormControl,
  FormControlLabel,
  FormGroup,
  Modal,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { FormEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Box } from "@mui/material";
import { useThemeStore } from "../../../../util/context/useThemeStore";
import { styleModal } from "../../../../util/shared/styles/modal/modalStyle";
import { AsistenciaResponseWhitState } from "../../../../util/interfaces/asistencia/AsistenciaResponseWhitState";
import { putAsistencia } from "../../util/putAsistencia";
import { AsistioEnum } from "../../../../util/interfaces/asistencia/AsistenciaPost";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { asistenciaMapColor } from "../../util/asistenciaUtils/asistenciaMapColor";

const iconsAsistencia: IconsAsistencia[] = [
  {
    icon: <CheckOutlinedIcon />,
    checkedIcon: <CheckIcon />,
    label: "Presente",
    color: "success",
    name: "asistencia",
    enum: AsistioEnum.PRESENTE,
  },
  {
    icon: <CloseOutlinedIcon />,
    checkedIcon: <CloseIcon />,
    color: "error",
    label: "Ausente",
    name: "asistencia",
    enum: AsistioEnum.AUSENTE,
  },
  {
    icon: <MedicalInformationOutlinedIcon />,
    checkedIcon: <MedicalInformationIcon />,
    color: "warning",
    label: "Justificado",
    name: "asistencia",
    enum: AsistioEnum.JUSTIFICADO,
  },
];

export const ModalEditAsistencia = React.memo(
  ({
    open,
    handleClose,
    url,
    handleOpenToast,
    updateListAlumnos,
    datosAsistencia,
  }: PropsModalEditEscuela) => {
    const { tema } = useThemeStore();
    const [stateAsistenciaBack, setStateAsistenciaBack] = useState<AsistioEnum>(
      datosAsistencia.asistio
    )
    const [asistencia, setAsistencia] = useState<AsistioEnum>(
      datosAsistencia.asistio
    );

    useEffect(() => {
      setAsistencia(datosAsistencia.asistio);
      setStateAsistenciaBack(datosAsistencia.asistio);
    }, [datosAsistencia]);

    const handleAsistencia = (asistio: AsistioEnum) => {
      setAsistencia(asistio);
    };

    const mutation = useMutation({
      mutationFn: putAsistencia,
      onSuccess: () => {
        handleOpenToast("success", "Asistencia editada con exito");
        updateListAlumnos();
        handleClose();
      },
      onError: (error) => {
        console.log(error);
        if (error instanceof AxiosError) {
          handleOpenToast(
            "error",
            error.response?.data.message
              ? error.response?.data.message
              : "Error al editar la asistencia"
          );
        }
      },
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
      event.preventDefault();
      event.stopPropagation();
      mutation.mutate({
        url,
        id: datosAsistencia.id,
        asistio: asistencia,
      });
    }

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={styleModal} component={"form"} onSubmit={handleSubmit}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{
                textAlign: "center",
                color: "text.primary",
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Editar asistencia de {datosAsistencia.alumno}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                component="p"
                sx={{ textAlign: "center", color: "text.primary", mb: 2 }}
              >
                Estado actual:{" "}
                <Typography
                  component={"span"}
                  sx={{
                    fontWeight: "bold",
                    color: asistenciaMapColor(stateAsistenciaBack),
                  }}
                >
                  {datosAsistencia.asistio}{" "}
                </Typography>
              </Typography>

              <FormControl
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "nowrap",
                  width: "50%",
                  flexDirection: "column",
                  mb: 2,
                }}
              >
                <FormGroup>
                  {iconsAsistencia.map((icon) => (
                    <FormControlLabel
                      key={icon.label}
                      label={icon.label}
                      sx={{
                        color: asistenciaMapColor(icon.enum),
                        borderBottom:
                          asistencia === icon.enum ? "1px solid" : "",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 1.5,
                        borderRadius: 1.5,
                        "&:hover": {
                          backgroundColor: asistenciaMapColor(icon.enum) + "10",
                        },
                      }}
                      labelPlacement="start"
                      onChange={() => handleAsistencia(icon.enum)}
                      checked={asistencia === icon.enum}
                      name={icon.name}
                      control={
                        <Checkbox
                          icon={icon.icon}
                          checkedIcon={icon.checkedIcon}
                          color={icon.color}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </FormControl>

              <Button
                sx={{ ml: 2 }}
                variant={tema === "light" ? "contained" : "outlined"}
                type="submit"
                color="success"
                endIcon={<SendIcon />}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Enviando..." : "Enviar"}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    );
  }
);

interface PropsModalEditEscuela {
  open: boolean;
  handleClose: () => void;
  url: string;
  updateListAlumnos: () => void;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  datosAsistencia: AsistenciaResponseWhitState;
}

interface IconsAsistencia {
  icon: JSX.Element;
  checkedIcon: JSX.Element;
  label: string;
  color:
    | "error"
    | "success"
    | "warning"
    | "default"
    | "info"
    | "primary"
    | "secondary";
  name: string;
  enum: AsistioEnum;
}
