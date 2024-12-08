import React, { useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  ClickAwayListener,
  Fade,
} from "@mui/material";
import { convertToDisplayPrice } from "../utils/utils.js";

export function SelectSize({
  listings,
  sizeSelected,
  handleSizeSelect,
  noMarginTop,
}) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const heightOfDropdown = 38.39 * listings.length + 16;

  if (!listings) return null;

  return (
    <ClickAwayListener onClickAway={() => setExpanded(false)}>
      <Box
        sx={{
          height: "48px",
        }}
      >
        <Box
          sx={{
            ...theme.basicButton,
            height: "48px",
            marginTop: noMarginTop ? "0px" : "16px",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Typography variant="h6">
            {sizeSelected === "Select Size"
              ? sizeSelected
              : `Size ${sizeSelected}`}
          </Typography>
        </Box>
        <Fade in={expanded} timeout={{ enter: 225, exit: 0 }}>
          <Box
            sx={{
              ...theme.dropdownBox,
              maxHeight: "240px",
              top: `${heightOfDropdown + 8}px`,
              marginTop: `-${heightOfDropdown}px`,
              overflow: "auto",
            }}
          >
            {listings.map(({ size, price }, i) => (
              <Box
                key={i}
                sx={{
                  ...theme.dropdownOption,
                }}
                onClick={() => {
                  handleSizeSelect(size);
                  setExpanded(false);
                }}
              >
                <Typography variant="h6" fontSize="14px">
                  {size}
                </Typography>
                <Typography variant="h6" fontSize="14px">
                  {price ? convertToDisplayPrice(price) : ""}
                </Typography>
              </Box>
            ))}
          </Box>
        </Fade>
      </Box>
    </ClickAwayListener>
  );
}
