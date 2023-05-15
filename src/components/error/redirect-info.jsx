import React from "react";
import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as g from "../../styles/global";

/**
 * Creates the content for the not logged in error information
 */
function RedirectInfo() {

  return (
    <g.BoxMain>
      <g.ContainerCorner>
        <Typography variant="h1" sx={{ marginBottom: '20px', borderBottom: '1px solid' }}>Seems like you're not logged in</Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ marginBottom: '15px', color: 'black' }}>Please <Link href="/pages/login" color="secondary">log in here</Link></Typography>
          <Typography variant="h2" sx={{ marginBottom: '15px', color: 'black' }}>Don't have an account yet? Don't worry, you can easily <Link href="/pages/register" color="secondary">register here</Link></Typography>
        </Box>
      </g.ContainerCorner>
    </g.BoxMain>
  )
}

export default RedirectInfo;