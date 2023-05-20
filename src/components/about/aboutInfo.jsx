import React, { useEffect } from "react";
import { Box, Link, Typography } from "@mui/material";
import * as g from "../../styles/global";
import logo from "../../assets/images/logo-resized.png";

function AboutInfo() {
  const user = localStorage.getItem("profile");

  useEffect(() => {
    document.title = `Holidaze | About`;
  })

  return (
    <g.ContainerCorner>
      <Typography variant="h1" sx={{ marginBottom: '10px', borderBottom: '1px solid' }}>About</Typography>
      <Box sx={{ textAlign: 'center', marginBottom: '10px' }}>
        <Box component="img" src={logo} sx={{ maxWidth: '200px', margin: 'auto' }} />
      </Box>
      <Box>
        <Typography variant="body1" sx={{ marginBottom: '15px' }}>Holidaze is an online marketplace for renting venues and renting out venues. Thanks to our large community of users the selection of venues available for rent is large and highly varied - and it continues growing each day!</Typography>
        <Box sx={{ marginBottom: '15px' }}>
          <Typography variant="body1">With that amazing selection we are sure you will find your next Holidaze.
          </Typography>
          <Typography variant="body1">…and the next one…</Typography>
          <Typography variant="body1">…and the next one…</Typography>
        </Box>

        <Typography variant="body1" sx={{ marginBottom: '15px' }}>If you have venues you want to rent out for someone's Holidaze, you are welcome to <Link href="/pages/register" color="secondary">register for a manager role and put it out there.</Link></Typography>
        <Typography variant="body1" sx={{ marginBottom: '15px' }}>Here at Holidaze we take the safety of our users very seriously. Therefore, we require that everyone that wishes to rent venues, or rent out one, is registered and have an account at Holidaze.</Typography>
        {user ? null :
          <Box>
            <Typography variant="body1">You can easily <Link href="/pages/register" color="secondary">register here.</Link></Typography>
            <Typography variant="body1">Already have an account? <Link href="/pages/login" color="secondary">Log in here.</Link></Typography>
          </Box>
        }
      </Box>
    </g.ContainerCorner>
  )
}

export default AboutInfo;