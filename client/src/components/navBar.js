import React, { useEffect, useState } from "react";
import {
  useTheme,
  alpha,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  OutlinedInput,
  Checkbox,
  Drawer,
  Modal,
} from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import detroveLogo from "../images/detroveLogo.svg";
import SearchBar from "./searchBar";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { displayErrors } from "../utils/utils.js";
import { getUser, createUser } from "../redux/actions/profileActions";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

const drawerWidth = 300;
const navItems = [
  ["Cash", "/cash"],
  ["Marketplace", "/marketplace"],
  ["Profile", "/profile"],
];

export default function NavBar(props) {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { window } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const { errors } = useSelector((state) =>
    getLoadingAndErrors(state, [RequestsEnum.profileGetUser])
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUserModal, setNewUserModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [referrerCode, setReferrerCode] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const googleSignInSuccess = async (response) => {
    const user = response.profileObj;
    const existingUser = await dispatch(getUser(user.email));
    if (!existingUser) {
      setNewUserModal(true);
    }
    localStorage.setItem("userEmail", user.email);
  };

  const googleSignInFailure = (error) => {
    enqueueSnackbar(error.error, { variant: "error" });
  };

  const googleSignOut = () => {
    dispatch(getUser(null));
    navigate("/marketplace");
    localStorage.removeItem("userEmail");
  };

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleNewUserCompleteButton = () => {
    dispatch(
      createUser(
        localStorage.getItem("userEmail"),
        firstName,
        lastName,
        referrerCode
      )
    );
    setFirstName("");
    setLastName("");
    setReferrerCode("");
    setTermsAccepted(false);
    setPrivacyAccepted(false);
    setNewUserModal(false);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const NavBarText = ({ text }) => {
    return (
      <Typography
        variant="h6"
        color={theme.palette.secondary.bold}
        sx={{
          ...theme.easeTransition,
          whiteSpace: "nowrap",
          padding: "0 16px 0 0",
          "&:hover": {
            color: theme.palette.tertiary.main,
          },
        }}
      >
        {text}
      </Typography>
    );
  };

  const validFields =
    firstName !== "" && lastName !== "" && termsAccepted && privacyAccepted;

  return (
    <Box display="flex" height="54px">
      <AppBar
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.75),
          color: theme.palette.tertiary.main,
          backdropFilter: "blur(20px)",
          boxShadow: "none",
          padding: "0 32px",
          left: "initial",
          right: "initial",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            padding: "16px 0 !important",
            minHeight: "48px !important",
            boxSizing: "content-box",
          }}
        >
          <Link
            to="/marketplace"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box component="img" src={detroveLogo} alt="logo" width="40px" />
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.accent.dark,
                fontSize: "34px",
                marginRight: "32px",
              }}
            >
              Detrove
            </Typography>
          </Link>
          <Box sx={{ display: { md: "none" } }}>
            <IconButton
              size="large"
              aria-label="search"
              color="inherit"
              onClick={handleDialogToggle}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: "100%",
            }}
          >
            <SearchBar />
          </Box>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <a
              href="https://forms.gle/XzdRP7DtCfSLLWkn9"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <NavBarText text="Consignment" />
            </a>
            <a
              href="https://forms.gle/DZeRDQkYcnxGJACz9"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <NavBarText text="Redeem" />
            </a>
            <a
              href="https://forms.gle/daxApTGZGkueieGx5"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <NavBarText text="Referral" />
            </a>
            {navItems.map(([item, link], i) => (
              <Link key={i} to={link} style={{ textDecoration: "none" }}>
                <NavBarText text={item} />
              </Link>
            ))}
            {user ? (
              <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign out"
                onLogoutSuccess={googleSignOut}
              >
                <NavBarText text="Sign out" />
              </GoogleLogout>
            ) : (
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onSuccess={googleSignInSuccess}
                onFailure={googleSignInFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              >
                <NavBarText text="Sign in with Google" />
              </GoogleLogin>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        container={container}
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Box onClick={handleDrawerToggle} textAlign="center">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: theme.palette.tertiary.main,
            }}
          >
            <Typography variant="h6" sx={{ my: 2, fontWeight: "bold" }}>
              Detrove
            </Typography>
          </Link>
          <Divider />
          <List>
            <a
              href="https://forms.gle/XzdRP7DtCfSLLWkn9"
              target="_blank"
              style={{
                textDecoration: "none",
                color: theme.palette.tertiary.main,
              }}
            >
              <ListItem key="Consignment" disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary="Consignment" />
                </ListItemButton>
              </ListItem>
            </a>
            <a
              href="https://forms.gle/jZdueG8GDCbxGFeK9"
              target="_blank"
              style={{
                textDecoration: "none",
                color: theme.palette.tertiary.main,
              }}
            >
              <ListItem key="Redeem" disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary="Redeem" />
                </ListItemButton>
              </ListItem>
            </a>
            {navItems.map(([item, link], i) => (
              <Link
                key={i}
                to={link}
                style={{
                  textDecoration: "none",
                  color: theme.palette.tertiary.main,
                }}
              >
                <ListItem key={item} disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          {user ? (
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onLogoutSuccess={googleSignOut}
            >
              <Typography variant="h6">Sign out</Typography>
            </GoogleLogout>
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onSuccess={googleSignInSuccess}
              onFailure={googleSignInFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            >
              <Typography variant="h6">Sign in with Google</Typography>
            </GoogleLogin>
          )}
        </Box>
      </Drawer>
      <SearchBar
        dialogOpen={dialogOpen}
        handleDialogToggle={handleDialogToggle}
      />
      <Modal open={newUserModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", md: "50%" },
            bgcolor: theme.palette.primary.main,
            outline: "none",
            borderRadius: "16px",
            boxShadow:
              "0px 2px 16px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            p: 4,
          }}
        >
          <Typography variant="h6" mb="16px">
            Welcome to Detrove! Please fill out the form below to get started.
          </Typography>
          <Box>
            <Typography variant="h6">* First Name</Typography>
            <OutlinedInput
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              sx={{
                ...theme.inputAnimation,
                height: "48px",
                width: "100%",
              }}
            />
            <Typography variant="h6">* Last Name</Typography>
            <OutlinedInput
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              sx={{
                ...theme.inputAnimation,
                height: "48px",
                width: "100%",
              }}
            />
            <Typography variant="h6">
              Referral Code (if you were referred)
            </Typography>
            <OutlinedInput
              type="text"
              value={referrerCode}
              onChange={(e) => setReferrerCode(e.target.value)}
              sx={{
                ...theme.inputAnimation,
                height: "48px",
                width: "100%",
              }}
            />
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                disableRipple={true}
              />
              <Typography variant="h6">
                * I agree to the{" "}
                <a
                  href="https://docs.google.com/document/d/1JmGg-3yFrvuscP5088mo7tf6qNorTiEqW_6q5ppdY6k/edit?usp=sharing"
                  target="_blank"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Privacy Policy
                </a>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={privacyAccepted}
                onChange={() => setPrivacyAccepted(!privacyAccepted)}
                disableRipple={true}
              />
              <Typography variant="h6">
                * I agree to the{" "}
                <a
                  href="https://docs.google.com/document/d/1McVrgLRsh78Wv-2PZEPlLxu-dj8U02da8I5LyyJ9t2M/edit?usp=sharing"
                  target="_blank"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Terms of Service
                </a>
              </Typography>
            </Box>
            <Box
              sx={{
                ...theme.basicButton,
                marginTop: "16px",
                height: "48px",
                width: "100%",
                backgroundColor: validFields
                  ? theme.palette.accent.dark
                  : theme.palette.secondary.hover,
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: validFields
                    ? theme.palette.accent.hover
                    : null,
                },
                cursor: validFields ? "pointer" : "not-allowed",
              }}
              onClick={() =>
                validFields ? handleNewUserCompleteButton() : null
              }
            >
              <Typography variant="h6">Next</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
