import React from "react";

import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <CircularProgress color="tertiary" />
    </Box>
  );
}
