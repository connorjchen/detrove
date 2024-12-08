import React, { useState } from "react";
import {
  Box,
  OutlinedInput,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Switch,
  useTheme,
  Accordion,
  AccordionSummary,
  Divider,
  AccordionDetails,
  Toolbar,
  AppBar,
  IconButton,
  Dialog,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { slideUpTransition } from "../utils/utils.js";

export default function FiltersBar({
  clearFilters,
  options,
  optionsSelected,
  setOptionsSelected,
  forSaleOnly,
  setForSaleOnly,
  setPriceRange,
  isMediumScreen,
}) {
  const theme = useTheme();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  function ClearFiltersButton({ clearFilters }) {
    return (
      <Box
        sx={{
          ...theme.basicButton,
          height: "48px",
          marginBottom: "16px",
        }}
        onClick={clearFilters}
      >
        <Typography variant="h6">Clear Filters</Typography>
      </Box>
    );
  }

  function renderCheckListFilter(label, options, selectOption, idx) {
    return (
      <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              "& .MuiAccordionSummary-expandIconWrapper": {
                margin: "5px",
              },
            }}
          >
            <Typography variant="h6">{label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {options[idx].map((option, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      onClick={() => selectOption(option, idx)}
                      checked={optionsSelected[idx].includes(option)}
                      disableRipple={true}
                    />
                  }
                  label={
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      color={theme.palette.tertiary.main}
                    >
                      {option}
                    </Typography>
                  }
                  sx={{
                    margin: 0,
                  }}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Divider />
      </>
    );
  }

  function renderPriceFilter() {
    return (
      <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              "& .MuiAccordionSummary-expandIconWrapper": {
                margin: "5px",
              },
            }}
          >
            <Typography variant="h6">Price</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" justifyContent="center" alignItems="center">
              <OutlinedInput
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                sx={{
                  ...theme.inputAnimation,
                  height: "48px",
                  width: "100%",
                }}
              />
              <Typography
                variant="subtitle1"
                color={theme.palette.secondary.bold}
                margin="0 8px"
              >
                to
              </Typography>
              <OutlinedInput
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                sx={{
                  ...theme.inputAnimation,
                  height: "48px",
                  width: "100%",
                }}
              />
            </Box>
            <Box
              sx={{
                ...theme.basicButton,
                margin: "16px 0",
                height: "48px",
              }}
              onClick={() => setPriceRange([minPrice, maxPrice])}
            >
              <Typography variant="h6">Apply</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Divider />
      </>
    );
  }

  function renderSwitch() {
    return (
      <FormControlLabel
        control={
          <Switch
            onClick={() => setForSaleOnly(!forSaleOnly)}
            checked={forSaleOnly}
          />
        }
        label={<Typography variant="h6">For Sale Only</Typography>}
        labelPlacement="start"
        sx={{
          margin: 0,
          height: "57px",
        }}
      />
    );
  }

  function selectOption(option, i) {
    let newOptionsSelected = [...optionsSelected];
    if (optionsSelected[i].includes(option)) {
      newOptionsSelected[i] = optionsSelected[i].filter((o) => o !== option);
    } else {
      newOptionsSelected[i] = [...optionsSelected[i], option];
    }
    setOptionsSelected(newOptionsSelected);
  }

  return isMediumScreen ? (
    <>
      <Box
        sx={{
          ...theme.basicButton,
          height: "48px",
          width: "100%",
        }}
        onClick={handleDialogToggle}
      >
        <Typography variant="h6">Filters</Typography>
      </Box>
      <Dialog
        fullScreen
        open={dialogOpen}
        onClose={handleDialogToggle}
        TransitionComponent={slideUpTransition}
      >
        <AppBar
          sx={{
            position: "relative",
            boxShadow: "none",
          }}
        >
          <Toolbar
            sx={{
              padding: "0 32px !important",
            }}
          >
            <Box width="100%">
              <Typography variant="h6" fontSize="30px">
                Filters
              </Typography>
            </Box>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleDialogToggle}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box margin="0 32px">
          <ClearFiltersButton clearFilters={clearFilters} />
          {renderCheckListFilter("Brand", options, selectOption, 0)}
          {renderCheckListFilter("Size", options, selectOption, 1)}
          {renderPriceFilter()}
          {renderSwitch()}
        </Box>
      </Dialog>
    </>
  ) : (
    <Box
      sx={{
        width: "250px",
        height: "calc(100vh - 170px)",
        position: "sticky",
        top: "80px",
        overflowY: "auto",
        marginRight: "32px",
      }}
    >
      <ClearFiltersButton clearFilters={clearFilters} />
      {renderCheckListFilter("Brand", options, selectOption, 0)}
      {renderCheckListFilter("Size", options, selectOption, 1)}
      {renderPriceFilter()}
      {renderSwitch()}
    </Box>
  );
}
