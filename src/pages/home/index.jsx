import React from "react";
import { Typography, Box } from "@mui/material";
import * as g from "../../styles/global";
import Venues from "../../components/home/venues";

/**
 * Renders the content for the home page
 */
function Home() {

  return (
    <Box sx={{ margin: '50px auto 100px auto', }}>
      <g.ContainerCorner>
        <Typography variant="h1" sx={{ marginBottom: '10px', borderBottom: '1px solid' }}>Book your next Holidaze</Typography>
        <Typography variant="body1">Find your dream location for your next holidaze amongst a variety of unique venues from our verified hosts.</Typography>
      </g.ContainerCorner>
      <Venues />
    </Box>
  )
}

export default Home;