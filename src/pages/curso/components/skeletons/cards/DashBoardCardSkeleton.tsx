import { Skeleton, Box } from "@mui/material";

export const DashBoardCardSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" sx={{ width: "100%" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          marginTop: "1.5rem",
        }}
      >
        <Skeleton variant="text" sx={{ width: "100%", fontSize: "1.5rem" }} />
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={56}
          sx={{ marginTop: "1rem" }}
        />
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={56}
          sx={{ marginTop: "1rem" }}
        />
      </Box>
    </>
  );
};
