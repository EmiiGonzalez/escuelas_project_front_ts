import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import { ClasesRequest } from "../../../../util/interfaces/clases/ClasesRequest";

export const ClasesListCard = ({ data }: ClasesListCardProps) => {

  return (
    <>
      <Typography variant="h5" color={"text.primary"}>
        Clases dictadas
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          marginTop: "1.5rem",
        }}
      >
        {data.length > 0 ? (
          data.map((clase) => (
            <Typography
              key={clase.id} 
              color={"text.primary"}
              sx={{
                marginBottom: "1rem",
                width: "100%",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              {clase.contenido}
            </Typography>
          ))
        ) : (
          <Typography
            color={"text.primary"}
            sx={{
              marginBottom: "1rem",
              width: "100%",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            No se ha dictado ninguna clase
          </Typography>
        )}
      </Box>
    </>
  );
};

interface ClasesListCardProps {
  data: ClasesRequest[];
}
