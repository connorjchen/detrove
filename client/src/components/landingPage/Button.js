import { Typography, useTheme } from "@mui/material";
import React from "react";

const Button = ({ title, variant, color, sx, onClick }) => {
  const theme = useTheme();
  const colorSetsPrimary = {
    black: {
      color: "white",
      bgcolor: "black",
    },
    white: {
      color: "black",
      bgcolor: "white",
    },
    blue: {
      color: "white",
      bgcolor: theme.palette.accent.dark,
    },
  };

  const colorSetsSecondary = {
    black: {
      color: "black",
      border: "1px solid black",
    },
    white: {
      color: "white",
      border: "1px solid white",
    },
    blue: {
      color: theme.palette.accent.dark,
      border: `1px solid ${theme.palette.accent.dark}`,
    },
  };
  const primary = {
    ...colorSetsPrimary[color],
    "&:hover": {
      cursor: "pointer",
      bgcolor: theme.palette.accent.dark,
    },
  };

  const secondary = {
    ...colorSetsSecondary[color],
    "&:hover": {
      cursor: "pointer",
      bgcolor: theme.palette.accent.dark,
      color: "white",
      border: `1px solid ${theme.palette.accent.dark}`,
    },
  };

  return (
    <Typography
      {...{ onClick: onClick }}
      sx={{
        py: 2.25,
        px: 4,
        width: "fit-content",
        textAlign: "center",
        borderRadius: "8px",
        transition: "all 0.2s ease",
        ...(variant === "primary" ? primary : secondary),
        ...sx,
      }}
    >
      {title}
    </Typography>
  );
};

export default Button;
