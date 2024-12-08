import { createTheme, alpha } from "@mui/material/styles";

const white = "#FFFFFF";
const lightGrey = "rgba(22, 22, 26, 0.04)";
const lightDarkGrey = "rgba(22, 22, 26, 0.1)";
const darkGrey = "rgba(22, 22, 26, 0.2)";
const darkerGrey = "rgba(22, 22, 26, 0.5)";
const black = "#000000";
const darkBlue = "#35456a";
const lightDarkBlue = "rgb(82, 97, 128)";
const red = "rgba(211,48,47,255)";
const lightRed = "rgba(211,48,47,0.8)";
const gold = "#FFCA00";
const lightBlue = "#0F5ED2";
const logoDark = "#0B62E4";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins, sans-serif"],
    h6: {
      fontWeight: "normal",
      fontSize: "16px",
    },
  },
  palette: {
    primary: {
      main: white,
    },
    secondary: {
      main: lightGrey,
      hover: lightDarkGrey,
      outline: darkGrey,
      bold: darkerGrey,
    },
    tertiary: {
      main: black,
    },
    accent: {
      hover: lightDarkBlue,
      dark: darkBlue,
      lightBlue: lightBlue,
      logoDark: logoDark,
    },
    error: {
      main: red,
      hover: lightRed,
    },
    gold: {
      main: gold,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
          "&.Mui-expanded": {
            margin: 0,
            minHeight: "48px",
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
            "&.Mui-expanded": {
              margin: 0,
            },
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          "&.Mui-checked": {
            color: darkBlue,
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: darkBlue,
            "&:hover": {
              backgroundColor: alpha(darkBlue, 0.04),
            },
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: darkBlue,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: "initial",
        },
      },
    },
  },
  basicButton: {
    transition: "all 0.15s ease-in-out",
    backgroundColor: lightGrey,
    borderRadius: "16px",
    "&:hover": {
      backgroundColor: lightDarkGrey,
    },
    "&:active": {
      transform: "scale(0.95)",
      transition: "transform 0.15s ease-in-out",
    },
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "8px",
  },
  easeTransition: {
    transition: "all 0.15s ease-in-out",
  },
  inputAnimation: {
    borderRadius: "16px",
    backgroundColor: lightGrey,
    transition: "background-color 0.15s ease-in-out",
    "&.Mui-focused": {
      backgroundColor: white,
    },
    "&.MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid transparent",
        transition: "border 0.15s ease-in-out",
      },
      "&:hover fieldset": {
        borderWidth: "1px",
        borderColor: darkGrey,
      },
      "&.Mui-focused fieldset": {
        borderWidth: "1px",
        borderColor: darkGrey,
      },
    },
  },
  dropdownBox: {
    position: "relative",
    zIndex: 1,
    background: white,
    borderRadius: "16px",
    boxShadow: "rgb(27 32 50 / 10%) 0px 6px 16px",
    borderWidth: "1px",
    borderColor: lightDarkGrey,
    padding: "8px",
    marginTop: "8px",
    boxSizing: "border-box",
  },
  dropdownOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px",
    cursor: "pointer",
    transition: "background-color 0.15s ease-in-out",
    "&:hover": {
      backgroundColor: lightGrey,
      borderRadius: "10px",
    },
  },
  ellipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
  },
});

export default theme;
