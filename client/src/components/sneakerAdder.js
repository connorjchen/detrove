import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useTheme, Box, OutlinedInput, Typography } from "@mui/material";
import { addSneaker } from "../redux/actions/adminActions";

function SneakerAdder() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const valueProposition = searchParams.get("value") ?? "default";

  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [styleCode, setStyleCode] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [colorway, setColorway] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    dispatch(
      addSneaker(
        brand,
        name,
        gender,
        styleCode,
        retailPrice,
        releaseDate,
        colorway,
        description,
        valueProposition
      )
    );
    setBrand("");
    setName("");
    setGender("");
    setStyleCode("");
    setRetailPrice("");
    setReleaseDate("");
    setColorway("");
    setDescription("");
  };
  return (
    <Box width="50%" justifyContent="center" alignItems="center" margin="0 25%">
      <form onSubmit={handleSubmit}>
        <OutlinedInput
          type="string"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
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
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Gender"
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
          value={styleCode}
          onChange={(e) => setStyleCode(e.target.value)}
          placeholder="Style Code"
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
          value={retailPrice}
          onChange={(e) => setRetailPrice(e.target.value)}
          placeholder="Retail Price"
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
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          placeholder="Release Date"
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
          value={colorway}
          onChange={(e) => setColorway(e.target.value)}
          placeholder="Colorway"
          sx={{
            ...theme.inputAnimation,
            height: "48px",
            width: "100%",
            padding: "12px 20px",
            margin: "8px 0",
          }}
        />
        <OutlinedInput
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          multiline="true"
          minRows={3}
          maxRows={7}
          sx={{
            ...theme.inputAnimation,
            height: "96px",
            width: "100%",
            padding: "12px 20px",
            margin: "8px 0 20px 0",
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
          <Typography variant="h6">Add Sneaker</Typography>
        </Box>
      </form>
    </Box>
  );
}

export default SneakerAdder;
