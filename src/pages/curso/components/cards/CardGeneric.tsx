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
        height: "100%",
        maxHeight: "360px",
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
