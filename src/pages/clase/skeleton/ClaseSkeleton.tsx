import { Skeleton, Grid2 } from "@mui/material"
import { motion } from "framer-motion"

export const ClaseSkeleton = () => {
  return (
    <motion.div
        style={{ minHeight: "100vh", width: "100%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={100}
          sx={{ marginY: "1rem", borderRadius: "15px" }}
        />

        <Grid2 spacing={2} container sx={{ width: "100%" }}>
          <Grid2 size={{ xs: 12, sm: 5, md: 4 }}>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={300}
              sx={{borderRadius: "15px" }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 7, md: 8 }}>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={300}
              sx={{ borderRadius: "15px" }}
            />
          </Grid2>
        </Grid2>
      </motion.div>
  )
}
