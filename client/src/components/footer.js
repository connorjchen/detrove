import React from "react";
import { Box, Typography, useTheme, Divider, Link } from "@mui/material";
import discordLogo from "../images/discord-logo.svg";
import linkedinLogo from "../images/linked-in-white.svg";
import mediumLogo from "../images/medium-white.svg";

export default function Footer() {
  const theme = useTheme();

  function StyledTypography({ text, link }) {
    return (
      <a href={link} target="_blank" style={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          color={theme.palette.secondary.bold}
          sx={{
            cursor: "pointer",
            padding: "0 8px",
            ...theme.easeTransition,
            "&:hover": {
              color: theme.palette.tertiary.main,
            },
          }}
        >
          {text}
        </Typography>
      </a>
    );
  }

  const SocialIcons = ({ defaultName, link, image }) => {
    return (
      <Box>
        <Link
          href={link}
          sx={{ color: "white", textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Box
            sx={{
              height: 36,
              width: 36,
              borderRadius: 200,
              bgcolor: theme.palette.secondary.bold,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "8px",
            }}
          >
            <img src={image} style={{ height: "12px" }} alt={defaultName}></img>
          </Box>
        </Link>
      </Box>
    );
  };

  return (
    <Box>
      <Divider />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="16px 32px"
      >
        <Typography variant="h6" color={theme.palette.secondary.bold}>
          © Detrove, Inc.
        </Typography>
        <Box display="flex" alignItems="center">
          <StyledTypography
            text="Privacy Policy"
            link="https://docs.google.com/document/d/1JmGg-3yFrvuscP5088mo7tf6qNorTiEqW_6q5ppdY6k/edit?usp=sharing"
          />
          <StyledTypography
            text="Terms of Service"
            link="https://docs.google.com/document/d/1McVrgLRsh78Wv-2PZEPlLxu-dj8U02da8I5LyyJ9t2M/edit?usp=sharing"
          />
          <StyledTypography
            text="Contact Us"
            link="mailto:contact@detrove.io"
          />
          <SocialIcons
            defaultName="Medium"
            link="https://medium.com/@detrovemarketplace"
            image={mediumLogo}
          />
          <SocialIcons
            defaultName="Discord"
            link="https://discord.gg/9fvQcnvda2"
            image={discordLogo}
          />
          <SocialIcons
            defaultName="LinkedIn"
            link="https://www.linkedin.com/company/detrove/"
            image={linkedinLogo}
          />
        </Box>
      </Box>
    </Box>
  );
}
