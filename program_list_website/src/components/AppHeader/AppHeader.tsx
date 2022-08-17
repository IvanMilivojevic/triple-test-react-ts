import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../../assets/triple-logo.png";

const AppHeader = () => {
  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        position: "relative",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        <img src={Logo} alt="Triple Logo" />
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
