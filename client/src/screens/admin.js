import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Typography, useTheme, Tab, Tabs, Box } from "@mui/material";
import Waitlist from "../components/waitlist.js";
import SneakerAdder from "../components/sneakerAdder.js";
import ItemAdder from "../components/itemAdder.js";

function Admin() {
  const profile = useSelector((state) => state.profile);
  const email = profile && profile.user ? profile.user.email : null;
  const [tab, setTab] = useState(1);
  const theme = useTheme();

  const tabChooser = () => {
    switch (tab) {
      case 0:
        return <Waitlist />;
      case 1:
        return <SneakerAdder />;
      case 2:
        return <ItemAdder />;
      default:
        return <Waitlist />;
    }
  };

  if (
    email === "ao274@cornell.edu" ||
    email === "cjc353@cornell.edu" ||
    email === "thesnakeslayer3@gmail.com"
  ) {
    return (
      <Box>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.accent.dark,
            fontSize: "40px",
            marginRight: "32px",
            textAlign: "center",
          }}
        >
          Administrator Page
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Tabs
            textColor="inherit"
            value={tab}
            centered
            onChange={(_, tab) => setTab(tab)}
            TabIndicatorProps={{
              style: {
                backgroundColor: "black",
              },
            }}
          >
            <Tab label="Waitlist" />
            <Tab label="Add Sneakers" />
            <Tab label="Add Items" />
          </Tabs>
        </Box>
        {tabChooser()}
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.accent.dark,
            fontSize: "40px",
            margin: "12.5%",
            textAlign: "center",
          }}
        >
          You do not have access to the administrator page at this time.
        </Typography>
      </Box>
    );
  }
}

export default Admin;
