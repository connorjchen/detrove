import { Box, Typography } from "@mui/material";
import React from "react";
// const accentImages = {
//   orange: "polygon-orange.png",
//   red: "polygon-red.png",
//   purple: "polygon-purple.png",
//   blue: "polygon-blue.png",
// };

const InfoCard = ({ title, text, sx }) => {
  return (
    <Box
      data-aos="fade-down"
      data-aos-duration="1000"
      sx={{
        width: 1,
        borderRadius: "16px",
        boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.1)",
        position: "relative",
        ...sx,
      }}
    >
      <Box sx={{ mx: 5.25 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.125rem",
            lineHeight: "24px",
            letterSpacing: -0.8,
            textTransform: "uppercase",
            color: "black",
            pt: 4.125,
            mb: 1.5,
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            letterSpacing: -0.7,
            lineHeight: "24px",
            color: "black",
            pb: 4,
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoCard;
