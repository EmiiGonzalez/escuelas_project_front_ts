import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material"
import { AlumnoResponseDtoWithAsistencia } from "../../../../util/interfaces/alumno/AlumnoResponseDtoWithAsistencia"
import { useIncremental } from "../../../../util/hooks/useIncremental"
import { AsistenciaRecord } from "../../../../util/interfaces/asistencia/AsistenciaResponse"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react"

export const DialogAsistencia = ( { open, handleClose, url, dataAlumnos }: PropsDialogAsistencia) => {
  const {count: index, increment, decrement} = useIncremental(dataAlumnos.length)
  const [asistenciaRecord, setAsistenciaRecord] = useState<AsistenciaRecord[]>([])
  
  const currentAlumno = dataAlumnos[index]

  const handleAttendance = (asistio: boolean) => {
    setAsistenciaRecord([...asistenciaRecord, {id: currentAlumno.id, asistio}])
    if (index < dataAlumnos.length - 1) {
      increment()
    }
  }

  const handlePrevious = () => {
    if (index > 0) {
      decrement()
    }
  }

  const onClose = () => {
    handleClose()
    setAsistenciaRecord([])
  }

  const handleSubmit = () => {
    console.log(asistenciaRecord);
  }



  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle align="center" sx={{mb: 2}}>Pasar asistencia</DialogTitle>
      <DialogContent>
        {
          currentAlumno && (<>
          <Typography variant="h6" gutterBottom align="center">
            {currentAlumno.nombre}
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="¿Asistió a clase?" />
              <IconButton color="primary" onClick={() => handleAttendance(true)}>
                <CheckIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleAttendance(false)}>
                <CloseIcon />
              </IconButton>
            </ListItem>
          </List>
        </>
      )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePrevious} disabled={index === 0} startIcon={<ArrowBackIcon />}>
          Anterior
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={asistenciaRecord.length !== dataAlumnos.length}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface PropsDialogAsistencia {
  open: boolean
  handleClose: () => void
  url: string
  dataAlumnos: AlumnoResponseDtoWithAsistencia[]
}