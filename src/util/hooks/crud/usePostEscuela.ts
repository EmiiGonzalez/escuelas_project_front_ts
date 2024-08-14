import { AlertColor } from "@mui/material";
import { EscuelasRequest } from "../../interfaces/escuelas/EscuelasRequest";
import useAxios from "./useAxios";
import { useCallback, useEffect } from "react";

export const usePostEscuela = (
  handleOpenToast: (variante: AlertColor, msg: string) => void,
  updateData: (d: EscuelasRequest) => void
) => {
  const { httpRequest, response, errorRequest, isLoading } =
    useAxios<EscuelasRequest>();

  // Encapsula la lógica para enviar los datos de la escuela
  const postEscuela = useCallback(
    async (escuela: EscuelasRequest) => {
      await httpRequest({
        url: import.meta.env.VITE_api_post_escuelas,
        method: "POST",
        data: escuela,
      });
    },
    [httpRequest]
  );

  // Maneja la respuesta exitosa
  useEffect(() => {
    if (response && response.id && response.nombre) {
      handleOpenToast("success", `Escuela ${response.nombre} agregada`);
      updateData(response);
    }
  }, [response, handleOpenToast, updateData]);

  // Maneja los errores
  useEffect(() => {
    if (errorRequest) {
      handleOpenToast("error", errorRequest);
    }
  }, [errorRequest, handleOpenToast]);

  // Indica que la solicitud está en progreso
  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    }
  }, [isLoading]);

  return { postEscuela, isLoading };
};
