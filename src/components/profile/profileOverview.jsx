import React from "react";
import * as g from "../../styles/global";
import { Box, Link, Typography } from "@mui/material";
import ProfileBookings from "./profileBookings";
import ProfileVenues from "./profileVenues";

/**
 * Function that allows the user to navigate between the lists of their bookings and their venues
 */
function ProfileOverview() {
  const userInfo = JSON.parse(localStorage.getItem("profile"));
  const { venueManager } = userInfo;

  return (
    <Box>
      <g.ContainerCorner>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h2" id="bookings" sx={{ scrollMarginTop: '150px' }}>My Bookings</Typography>
          {venueManager ? <Link href="#venues" variant="h2" color="secondary">My Venues</Link> : null}
        </Box>
        <ProfileBookings />
      </g.ContainerCorner>
      {venueManager ?
        <g.ContainerCorner>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h2" id="venues" sx={{ scrollMarginTop: '150px' }}>My Venues</Typography>
            <Link href="#bookings" variant="h2" color="secondary">My Bookings</Link>
          </Box>
          <ProfileVenues />
        </g.ContainerCorner>
        : null}
    </Box>
  )
}

export default ProfileOverview;