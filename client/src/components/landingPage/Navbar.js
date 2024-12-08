import { useState } from "react";
import {
  useTheme,
  Box,
  Container,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Button from "./Button";
import HamburgerMenu from "./HamburgerMenu";
import { useLocation } from "react-router-dom";
import React from "react";
import detroveLogo from "../../images/detroveLogo.svg";
import rightArrow from "../../images/nav-chevron.svg";
const Navbar = ({ ctaButtonParams, prefixQueryString }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const menuBreakpoint = useMediaQuery("(max-width:600px)");

  const currentRoute = useLocation();

  const navLinks = [
    // {
    //   title: "Marketplace",
    //   href: "marketplace",
    //   newTab: false,
    // },
    // {
    //   title: "How it works",
    //   href: `${prefixQueryString}#how-it-works`,
    //   newTab: false,
    // },
  ];

  function handleOpenMobile() {
    setMobileOpen(!mobileOpen);
    if (!mobileOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }

  function disableScroll() {
    window.document.body.style.overflow = "hidden";
  }

  function enableScroll() {
    window.document.body.style.overflow = "scroll";
  }

  return (
    <Box>
      {/* =================== DESKTOP / MOBILE NAVBAR =================== */}
      <Box
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            zIndex: 3,
          }}
        >
          <Box
            component="img"
            src={detroveLogo}
            alt="logo"
            sx={{
              width: { xs: "40px", sm: "60px" },
            }}
          />
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
        {menuBreakpoint ? (
          <HamburgerMenu mobileOpen={mobileOpen} onClick={handleOpenMobile} />
        ) : (
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItem: "center" }}
          >
            {navLinks.map((navItem, index) => (
              <Link
                sx={{
                  color: "black",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
                href={navItem.href}
                key={index}
                target={navItem.newTab ? "_blank" : "_self"}
                rel={navItem.newTab ? "noopener noreferrer" : ""}
              >
                <Typography
                  sx={{
                    mx: 3,
                    borderBottom:
                      currentRoute.pathname === "/business" &&
                      navItem.href === "/business"
                        ? "2px solid black"
                        : "none",
                  }}
                >
                  {navItem.title}
                </Typography>
              </Link>
            ))}
            {ctaButtonParams && (
              <Button
                title={ctaButtonParams.title}
                variant="primary"
                color="black"
                sx={{ width: "126px" }}
                onClick={ctaButtonParams.onClick}
              />
            )}
          </Box>
        )}
      </Box>
      {mobileOpen && (
        <Box
          sx={{
            height: 90,
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            bgcolor: "white",
            zIndex: 2,
          }}
        ></Box>
      )}
      {/* =================== MOBILE MENU OVERLAY =================== */}
      {mobileOpen && (
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            bgcolor: "white",
            position: "fixed",
            top: 0,
            left: 0,
            transform: "translateX(-50%) transform:Y(-50%)",
            transition: "all 0.3s ease",
            zIndex: 1,
            overflowY: "scroll",
          }}
        >
          <Container sx={{ maxWidth: 0.95, overflowY: "scroll" }}>
            <Box
              sx={{
                my: 14,
                overflowY: "hidden",
              }}
            >
              {/* ========= PAGE LINKS ========= */}
              {navLinks.map((navItem, index) => (
                <Link
                  sx={{
                    color: "black",
                    textDecoration: "none",
                  }}
                  key={index}
                  href={navItem.href}
                  target={navItem.newTab ? "_blank" : "_self"}
                  rel={navItem.newTab ? "noopener noreferrer" : ""}
                  onClick={handleOpenMobile}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: "0.5px solid rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: "24px",
                        letterSpacing: -0.8,
                        py: 2,
                      }}
                    >
                      {navItem.title}
                    </Typography>
                    <img src={rightArrow} alt="right arrow"></img>
                  </Box>
                </Link>
              ))}
              {/* ========= CTA ========= */}
              {ctaButtonParams && (
                <Box
                  sx={{
                    mt: 6,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    title={ctaButtonParams.title}
                    variant="primary"
                    color="black"
                    sx={{ width: { xs: "auto", sm: "fit-content" } }}
                    onClick={ctaButtonParams.onClick}
                  />
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
