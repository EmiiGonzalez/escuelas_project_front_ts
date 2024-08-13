import { useState } from 'react';
export const useHandleBoolean = () => {

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return { open, handleOpen, handleClose }
}