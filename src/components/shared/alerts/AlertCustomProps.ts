import { AlertColor } from "@mui/material";

export interface AlertCustomProps {
    openToast: boolean;
    setOpenToast: (openToast: boolean) => void;
    variante: AlertColor;
    msg: string;
    tema: "light" | "dark";
}