import { Box, SxProps } from "@mui/material";
import React from "react";
const Explainer = ({
  children,
  contentAlignDesktop,
  contentAlignMobile,
  sx,
}) => {
  // Desktop placements

  // the content is placed on the left with a padding left if contentAlignDesktop === left (marging right and padding left are set)
  const contentMRDesktop = contentAlignDesktop === "left" ? "30%" : 0;
  const contentPLDesktop = contentAlignDesktop === "left" ? 6 : 0;
  // the content is placed on the right if contentAlignDesktop === right (marging left and padding right are set)
  const contentMLDesktop = contentAlignDesktop === "right" ? "30%" : 0;
  const contentPRDesktop = contentAlignDesktop === "right" ? 6 : 0;
  // the polygon line is placed at a certain distance from the left depending on contentAlignDesktop
  const polygonLineLeftDistanceDesktop =
    contentAlignDesktop === "right" ? "15%" : "85%";

  // Narrow and Mobile placements

  // the content is placed on the top if contentAlignMobile === top (marging bottom is set)
  const contentMBMobile = contentAlignMobile === "top" ? "20%" : 0;
  // the content is placed on the bottom if contentAlignMobile === bottom (marging top is set)
  const contentMTMobile = contentAlignMobile === "bottom" ? "20%" : 0;
  // the polygon line is placed at a certain distance from the top depending on contentAlignMobile
  const polygonLineTopDistanceMobile =
    contentAlignMobile === "bottom" ? "0%" : "100%";

  return (
    <Box
      sx={{
        height: { xs: "auto", sm: "auto", md: "auto" },
        width: 1,
        bgcolor: "black",
        borderRadius: "23px",
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        //pt: { xs: 12.875, sm: 17, md: 0 },
        ...sx,
      }}
    >
      <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
        <img
          src="polygons-multicolor.svg"
          alt="Colored hexagons vertically distributed"
          style={{
            position: "absolute",
            top: 0,
            left: polygonLineLeftDistanceDesktop,
            height: "105%",
            transform: "translateX(-50%) translateY(10px)",
          }}
        />
      </Box>
      <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
        <img
          src="polygons-multicolor-rotated.svg"
          alt="Colored hexagons horizontally distributed"
          style={{
            position: "absolute",
            top: polygonLineTopDistanceMobile,
            left: "50%",
            width: "105%",
            transform: `translateX(-50%) translateY(-50%)`,
          }}
        />
      </Box>
      <Box
        sx={{
          mr: { xs: 0, sm: 0, md: contentMRDesktop },
          ml: { xs: 0, sm: 0, md: contentMLDesktop },
          mt: { xs: contentMTMobile, sm: contentMTMobile, md: 0 },
          mb: { xs: contentMBMobile, sm: contentMBMobile, md: 0 },
        }}
      >
        <Box
          sx={{
            pr: { xs: 4, sm: 4, md: contentPRDesktop },
            pl: { xs: 4, sm: 4, md: contentPLDesktop },
            pt: { xs: 4, sm: 4, md: 6 },
            pb: { xs: 4, sm: 4, md: 6 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Explainer;
