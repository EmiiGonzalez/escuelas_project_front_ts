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

  const openToast = useCallback(
    (type: AlertColor, message: string) => {
      handleOpenToast(type, message);
    },
    []
  );

  const update = useCallback(
    (data: EscuelasRequest) => {
      updateData(data);
    },
    [updateData]
  );

  // Maneja la respuesta
  useEffect(() => {
    if (response && response.id && response.nombre) {
      handleOpenToast("success", `Escuela ${response.nombre} agregada`);
      update(response);
    }
  }, [response, handleOpenToast, update]);

  // Maneja los errores
  useEffect(() => {
    if (errorRequest) {
      openToast("error", errorRequest);
    }
  }, [errorRequest, openToast]);

  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    }
  }, [isLoading]);

  return { postEscuela, isLoading };
};
