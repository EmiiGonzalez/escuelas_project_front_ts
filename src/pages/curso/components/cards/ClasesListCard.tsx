import Typography from "@mui/material/Typography/Typography";
import { ClasesRequest } from "../../../../util/interfaces/clases/ClasesRequest";
import Stack from "@mui/material/Stack/Stack";
import Pagination from "@mui/material/Pagination/Pagination";
import Box from "@mui/material/Box/Box";

export const ClasesListCard = ({ data, totalPages, pageNumber, setPageNumber }: ClasesListCardProps) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  }
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
            No se ha dictado alguna clase
          </Typography>
        )}
        <Stack spacing={2} alignItems={"center"} sx={{ width: "100%" }}>
          <Pagination count={totalPages} page={pageNumber} onChange={handleChange} />
        </Stack>
      </Box>
    </>
  );
};

interface ClasesListCardProps {
  data: ClasesRequest[];
  totalPages: number;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}
