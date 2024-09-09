import { Box, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const CardCurso = ({ tittle, materia }: PropsCardCurso) => {
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
      <Box sx={{ width: "80%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}> 
      <Typography
        variant="h3"
        sx={{
          textWrap: "wrap",
          textAlign: "center",
          marginRight: "1rem",
          width: "80%",
          userSelect: "none",
        }}
      >
        {tittle}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "text.primary", userSelect: "none" }}>{materia}</Typography>
      </Box>
      <Box sx={{ width: "20%" }}>
        <AddCircleIcon sx={{ fontSize: "3rem", cursor: "pointer" }}  onClick={() => console.log("click")} />
      </Box>
    </Box>
  );
};

interface PropsCardCurso {
  tittle: string;
  materia: string;
}
