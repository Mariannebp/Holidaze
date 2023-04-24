import { Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/header/styles.css";

/**
 * Creates the nav-bar used in the header.
 */
function Nav() {
  return (
    <Stack direction="row" spacing={4}>
      <NavLink to="/" className="nav-link" color="primary">HOME</NavLink>
      <NavLink to="/pages/about" className="nav-link">ABOUT</NavLink>
    </Stack>
  )
}

export default Nav;