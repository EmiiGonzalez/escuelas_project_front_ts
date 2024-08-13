import { ErrorInterface } from "../interfaces/ErrorInterface";
import { EscuelasRequest } from "../interfaces/escuelas/EscuelasRequest";
import { useState } from "react";

/**
 * @function useEscuela
 * @returns {useEscuelaState, setEscuela, error, setError} - escuela: EscuelasRequest, setEscuela: React.Dispatch<React.SetStateAction<EscuelasRequest>>, error: ErrorInterface, setError: React.Dispatch<React.SetStateAction<ErrorInterface>>
 * @description Hook para manejar el estado de la escuela, si la misma tiene un error o no y para manejar el error
 */
export const useEscuela = () : useEscuelaState => {

    const [escuela, setEscuela] = useState<EscuelasRequest>({
        id: 0,
        nombre: ""
    });

    const [error,  setError] = useState<ErrorInterface>({
        state: false,
        message: ""
    });

    return {escuela, setEscuela, error, setError}
}

interface useEscuelaState {
    escuela: EscuelasRequest;
    setEscuela: React.Dispatch<React.SetStateAction<EscuelasRequest>>;
    error: ErrorInterface;
    setError: React.Dispatch<React.SetStateAction<ErrorInterface>>;
}
