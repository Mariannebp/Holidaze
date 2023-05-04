import React from "react";
import useApi from "../hooks/useApi";
import { profileUrl } from "../constants";
import { Avatar, Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { EditOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";
import * as g from "../../styles/global";
import * as p from "../../styles/profile";

/**
 * Creates the content for the users profile information
 */
function ProfileInfo() {
  const userInfo = JSON.parse(localStorage.getItem("profile"));
  const { name } = userInfo;
  const getProfileUrl = profileUrl + name;
  const { data } = useApi(getProfileUrl);
  const navigate = useNavigate();

  return (
    <g.ContainerCorner>
      <p.ProfileBox>
        <p.ProfileInfoBox>
          <Typography variant='h1' sx={{ marginBottom: '5px' }} >{data.name}</Typography>
          <Divider />
          <Typography variant='body1' color='primary' sx={{ margin: '10px auto' }}>Email: {data.email}</Typography>
        </p.ProfileInfoBox>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Avatar src={data.avatar} alt={data.name} sx={{ height: '80px', width: '80px', marginLeft: '50px' }} />
          <IconButton sx={{ height: '50x', width: '50px' }} onClick={() => navigate("/pages/edit-avatar")}>
            <EditOutlined />
          </IconButton>
        </Box>
      </p.ProfileBox>
    </g.ContainerCorner>
  )
}

export default ProfileInfo;