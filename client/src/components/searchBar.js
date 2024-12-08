import React, { useState, useEffect } from "react";
import {
  OutlinedInput,
  useTheme,
  Fade,
  Dialog,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
import { displayErrors } from "../utils/utils.js";
import { getSneakers } from "../redux/actions/searchActions";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import Loading from "./loading";
import { Link } from "react-router-dom";
import { s3Object } from "../redux/constants.js";
import { slideUpTransition } from "../utils/utils.js";

export default function SearchBar({ dialogOpen, handleDialogToggle }) {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { sneakers } = useSelector((state) => state.search);
  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [RequestsEnum.searchGetSneakers])
  );

  const numberOfSneakersToDisplay = 3;
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const heightOfDropdown =
    63.99 * Math.min(numberOfSneakersToDisplay, searchResults.length) + 16;

  useEffect(() => {
    dispatch(getSneakers());
  }, [dispatch]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  useEffect(() => {
    if (sneakers) {
      setSearchResults(
        sneakers.filter((sneaker) =>
          sneaker.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [sneakers, searchTerm]);

  if (isLoading) return <Loading />;

  return dialogOpen ? (
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
            marginTop: "10px",
          }}
        >
          <Box width="100%">
            <OutlinedInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startAdornment={
                <SearchIcon sx={{ color: theme.palette.secondary.bold }} />
              }
              placeholder="Search"
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                if (e.relatedTarget && e.relatedTarget.tagName === "A") {
                  e.relatedTarget.click();
                  setIsFocused(false);
                  setSearchTerm("");
                } else {
                  setIsFocused(false);
                }
              }}
              sx={{
                ...theme.inputAnimation,
                height: "48px",
                width: "100%",
              }}
            />
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
      {searchResults.map(({ id, name }, i) => (
        <Link
          key={i}
          to={`/product/${id}`}
          style={{
            textDecoration: "none",
            color: theme.palette.tertiary.main,
          }}
        >
          <Box
            sx={{
              ...theme.dropdownOption,
              justifyContent: "normal",
              padding: 0,
              margin: "8px 32px",
            }}
          >
            <Box
              component="img"
              src={s3Object(id)}
              alt="image"
              width="48px"
              borderRadius="10px"
              marginRight="16px"
            />
            <Typography
              variant="h6"
              fontSize="14px"
              sx={{
                WebkitLineClamp: "1",
                ...theme.ellipsis,
              }}
            >
              {name}
            </Typography>
          </Box>
        </Link>
      ))}
    </Dialog>
  ) : (
    <Box width="100%" maxWidth="700px" marginRight="32px">
      <OutlinedInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        startAdornment={
          <SearchIcon sx={{ color: theme.palette.secondary.bold }} />
        }
        placeholder="Search"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (e.relatedTarget && e.relatedTarget.tagName === "A") {
            e.relatedTarget.click();
            setIsFocused(false);
            setSearchTerm("");
          } else {
            setIsFocused(false);
          }
        }}
        sx={{
          ...theme.inputAnimation,
          height: "48px",
          width: "100%",
        }}
      />
      <Fade in={isFocused} timeout={{ enter: 225, exit: 0 }}>
        <Box
          sx={{
            ...theme.dropdownBox,
            top: `${heightOfDropdown + 8}px`,
            marginTop: `-${heightOfDropdown}px`,
          }}
        >
          {searchResults
            .slice(0, numberOfSneakersToDisplay)
            .map(({ id, name }, i) => (
              <Link
                key={i}
                to={`/product/${id}`}
                style={{
                  textDecoration: "none",
                  color: theme.palette.tertiary.main,
                }}
              >
                <Box
                  sx={{
                    ...theme.dropdownOption,
                    justifyContent: "normal",
                  }}
                >
                  <Box
                    component="img"
                    src={s3Object(id)}
                    alt="image"
                    width="48px"
                    borderRadius="10px"
                    marginRight="16px"
                  />
                  <Typography
                    variant="h6"
                    fontSize="14px"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {name}
                  </Typography>
                </Box>
              </Link>
            ))}
        </Box>
      </Fade>
    </Box>
  );
}
