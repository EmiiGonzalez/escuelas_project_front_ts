import { Box } from "@mui/material";

export const CardGeneric = ({ children }: CardGenericProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "flex-start",
        minWidth: "250px",
        width: "100%",
        maxWidth: "calc(50% - 2rem)",
        marginBottom: "2rem",
        bgcolor: "secondary.main",
        borderRadius: "10px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        "&:hover": {
          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        },
        padding: "1.5rem",
        minHeight: "200px",
        marginX: "1rem",

        transition: "0.5s ease",

        ":hover": {
          boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          transform: "scale(1.01)",
        },
      }}
    >
      {children}
    </Box>
  );
};
interface CardGenericProps {
  children: React.ReactNode;
}
