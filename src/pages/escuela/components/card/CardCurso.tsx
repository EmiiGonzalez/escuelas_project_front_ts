import { Box, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const CardCurso = ({ tittle }: PropsCardCurso) => {
  return (
    <Box
      component={"li"}
      sx={{
        listStyle: "none",
        marginBottom: "3rem",
        display: "flex",
        alignItems: "center",
        minWidth: "300px",
        minHeight: "100px",
        bgcolor: "secondary.main",
        borderRadius: "10px",
        width: "350px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        "&:hover": {
          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        },
        marginX: "1rem",
      }}
    >
      <Typography variant="h3" sx={{ textWrap: "wrap", textAlign: "center", marginRight: "1rem", width: "80%" }}>{tittle}</Typography>
      <Box sx={{width: "20%" }}>
        <AddCircleIcon sx={{ fontSize: "3rem"}} />
      </Box>
    </Box>
  );
};

interface PropsCardCurso {
  tittle: string;
}
