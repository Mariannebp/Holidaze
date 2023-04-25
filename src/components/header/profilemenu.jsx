import React, { useState } from "react";
import { Box, Avatar, Menu, MenuItem, Divider, Tooltip, IconButton, ListItemIcon } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate("/pages/profile");
  };
  const handleVenue = () => {
    navigate("/pages/new-venue");
  };
  const handleAvatar = () => {
    navigate("/pages/edit-avatar");
  };
  const handleLogout = () => {
    // log out
    navigate("/");
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Profile menu">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={handleProfile}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleVenue}>
          New Venue
        </MenuItem>
        <MenuItem onClick={handleAvatar}>
          Edit Avatar
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )

}

export default ProfileMenu;