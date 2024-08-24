import { useState } from 'react';

/**
 * @function useHandleBoolean
 * @returns {open: boolean, handleOpen: () => void, handleClose: () => void}
 * @description Hook custom para el uso de estados booleanos en React
 */
export const useHandleBoolean = () => {

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return { open, handleOpen, handleClose }
}