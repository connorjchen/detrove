import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useTheme, Box, OutlinedInput, Typography } from "@mui/material";
import { addItem } from "../redux/actions/adminActions";

function ItemAdder() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [sneakerId, setSneakerId] = useState("");
  const [size, setSize] = useState("");
  const [ownerId, setOwnerId] = useState("");

  const handleSubmit = (e) => {
    dispatch(addItem(sneakerId, size, ownerId));
    setSneakerId("");
    setSize("");
    setOwnerId("");
  };
  return (
    <Box width="50%" justifyContent="center" alignItems="center" margin="0 25%">
      <form onSubmit={handleSubmit}>
        <OutlinedInput
          type="string"
          value={sneakerId}
          onChange={(e) => setSneakerId(e.target.value)}
          placeholder="Sneaker ID"
          sx={{
            ...theme.inputAnimation,
            height: "48px",
            width: "100%",
            padding: "12px 20px",
            margin: "8px 0",
          }}
        />

        <OutlinedInput
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Size"
          sx={{
            ...theme.inputAnimation,
            height: "48px",
            width: "100%",
            padding: "12px 20px",
            margin: "8px 0",
          }}
        />
        <OutlinedInput
          type="string"
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
          placeholder="Owner ID"
          sx={{
            ...theme.inputAnimation,
            height: "48px",
            width: "100%",
            padding: "12px 20px",
            margin: "8px 0",
          }}
        />
        <Box
          sx={{
            ...theme.basicButton,
            margin: "16px 0",
            height: "48px",
          }}
          onClick={handleSubmit}
        >
          <Typography variant="h6">Add Item</Typography>
        </Box>
      </form>
    </Box>
  );
}

export default ItemAdder;
