import React from "react";
import { Typography } from "@mui/material";
import * as g from "../../styles/global";
import UpdateAvatar from "../../components/form/updateAvatar";

/**
 * Renders the content for Edit Avatar page
 */
function EditAvatar() {
  return (
    <g.BoxMain>
      <g.ContainerCorner>
        <Typography variant="h1" sx={{ borderBottom: '1px solid' }}>Edit Avatar</Typography>
        <UpdateAvatar />
      </g.ContainerCorner>
    </g.BoxMain>
  )
}

export default EditAvatar;