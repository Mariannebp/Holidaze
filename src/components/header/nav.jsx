import React, { useState } from "react";
import { Box, IconButton, Link, Menu, MenuItem, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

/**
 * Creates the nav-bar used in the header.
 */
function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleHome = () => {
    navigate("/");
  };
  const handleAbout = () => {
    navigate("/pages/about");
  };

  return (
    <div>
      <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Link href="/" variant="h4" underline="hover" color="primary" aria-label="Home">HOME</Link>
        <Link href="/pages/about" variant="h4" underline="hover" color="primary" aria-label="About">ABOUT</Link>
      </Stack>
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <IconButton
          onClick={handleClick}
          id="main-button"
          aria-label="Main menu button"
          aria-controls={open ? 'main-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="main-menu"
          aria-label="Main menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          MenuListProps={{
            'aria-labelledby': 'main-button',
          }}
        >
          <MenuItem aria-label="Home" onClick={handleHome}>Home</MenuItem>
          <MenuItem aria-label="About" onClick={handleAbout}>About</MenuItem>
        </Menu>
      </Box>
    </div>
  )
}

export default Nav;