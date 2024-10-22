import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { ClasesRequest } from "../../../../util/interfaces/clases/ClasesRequest";
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import { UseQueryResult } from "@tanstack/react-query";

export const CardDescriptionClase = ( { datosClase }: PropsCardDescriptionClase ) => {
  return (
      <Card elevation={3} sx={{ height: '100%', borderRadius: '15px' , p: 2, my: 2, width: '95%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <EventIcon sx={{ mr: 1 }} /> Información de la Clase
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EventIcon sx={{ mr: 2, color: 'text.secondary' }} />
            <Typography><strong>Fecha:</strong> {datosClase.data?.fecha}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon sx={{ mr: 2, color: 'text.secondary' }} />
            <Typography><strong>Contenido:</strong> {datosClase.data?.contenido}</Typography>
          </Box>
        </CardContent>
      </Card>
  )
}

interface PropsCardDescriptionClase {
    datosClase: UseQueryResult<ClasesRequest, Error>
}
