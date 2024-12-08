import React from "react";
import { Box, Link } from "@mui/material";
const SocialIcons = ({ defaultName, link, image }) => {
  return (
    <Box>
      <Link
        href={link}
        sx={{ color: "white", textDecoration: "none" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box
          sx={{
            height: 56,
            width: 56,
            borderRadius: 200,
            bgcolor: "#222326",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={image} style={{ height: "18px" }} alt={defaultName}></img>
        </Box>
      </Link>
    </Box>
  );
};

export default SocialIcons;
