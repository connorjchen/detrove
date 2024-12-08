import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export default function ContentBox({ title, content }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: "16px",
        border: `1px solid ${theme.palette.secondary.outline}`,
      }}
    >
      <Typography
        variant="h6"
        borderBottom={`1px solid ${theme.palette.secondary.outline}`}
        padding="16px"
      >
        {title}
      </Typography>
      <Box padding="16px" backgroundColor={theme.palette.secondary.main}>
        {content}
      </Box>
    </Box>
  );
}
