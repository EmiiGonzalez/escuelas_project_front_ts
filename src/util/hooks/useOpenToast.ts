import { AlertColor } from "@mui/material";
import { useState } from "react";

/**
 * @function useOpenToast
 * @returns {openToast: boolean, variante: AlertColor, msg: string, setOpenToast: (openToast: boolean) => void, handleOpenToast: (variante: AlertColor, msg: string) => void}
 * @description Hook custom para el uso de Toast en React (AlertCustom) y (AlertCustomProps) para mostrar notificaciones
 */
export const useOpenToast = () : OpenToastState => {
    const [variante, setVariante] = useState<AlertColor>("success");
    const [msg, setMsg] = useState<string>("");
    const [openToast, setOpenToast] = useState<boolean>(false);
    
    const handleOpenToast = (variante: AlertColor, msg: string) => {
        setVariante(variante);
        setMsg(msg);
        setOpenToast(true);
    }

    return { openToast, variante, msg, setOpenToast, handleOpenToast };
}

interface OpenToastState {
    openToast: boolean;
    variante: AlertColor;
    msg: string;
    setOpenToast: (openToast: boolean) => void;
    handleOpenToast: (variante: AlertColor, msg: string) => void;
}