import { Box, styled } from "@mui/material";
import React from "react";
const HamburgerBar = styled("div")(({ theme }) =>
  theme.unstable_sx({
    display: "block",
    bgcolor: "#999999",
    width: 25,
    height: 2,
    mb: "7px",
  })
);

const HamburgerMenu = ({ mobileOpen, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        zIndex: 3,
        transition: "all 0.3s ease",
        "&>:first-of-type": {
          transform: mobileOpen
            ? "rotate(45deg) translateY(6px) translateX(6px)"
            : "none",
          transition: "all 0.3s ease-out",
        },
        "&>:nth-of-type(2)": {
          opacity: mobileOpen ? 0 : 1,
          transition: "all 0.3s ease-out",
        },
        "&>:nth-of-type(3)": {
          transform: mobileOpen
            ? "rotate(-45deg) translateY(-7px) translateX(7px)"
            : "none",
          transition: "all 0.3s ease-out",
        },
      }}
    >
      <HamburgerBar />
      <HamburgerBar />
      <HamburgerBar />
    </Box>
  );
};

export default HamburgerMenu;
