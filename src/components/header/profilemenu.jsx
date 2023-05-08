import React, { useState } from "react";
import { Box, Avatar, Menu, MenuItem, Divider, Tooltip, IconButton, ListItemIcon } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { profileUrl } from "../constants";
import useApi from "../hooks/useApi";

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userInfo = JSON.parse(localStorage.getItem("profile"));
  const { name, venueManager } = userInfo;
  const getProfileUrl = profileUrl + name;
  const { data } = useApi(getProfileUrl);
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Profile menu">
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            size="small"
            aria-controls={open ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {data.avatar && data.avatar.length ? <Avatar src={data.avatar} alt={data.name} sx={{ width: 40, height: 40 }} /> : <Avatar sx={{ width: 32, height: 32 }} />}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => navigate("/pages/profile")}>
          Profile
        </MenuItem>
        {venueManager ? <MenuItem onClick={() => navigate("/pages/new-venue")}>
          New Venue
        </MenuItem> : null}
        <MenuItem onClick={() => navigate("/pages/edit-avatar")}>
          Edit Avatar
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { localStorage.clear(); navigate("/"); }}>
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