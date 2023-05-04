import React from "react";
import useApi from "../hooks/useApi";
import { profileUrl } from "../constants";
import { Box, Link, Typography } from "@mui/material";
import * as g from "../../styles/global";
import * as p from "../../styles/profile";
import Placeholder from "../../assets/images/placeholder.png";

/**
 * Creates the content for the users venues
 */
function ProfileVenues() {
  const userInfo = JSON.parse(localStorage.getItem("profile"));
  const { name } = userInfo;
  const getVenuesUrl = profileUrl + name + "?_venues=true";
  const { data } = useApi(getVenuesUrl);

  return (
    <g.ContainerCorner>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <Typography variant="h2" >My venues</Typography>
        <Link href="/pages/new-venue">
          <g.ButtonSecond variant="contained" sx={{ width: '120px', margin: 'auto 0' }}>New Venue</g.ButtonSecond>
        </Link>
      </Box>
      {data.venues && data.venues.length ?
        <Typography variant="body1">Venues</Typography> :
        <Typography variant="body1">You have no bookings yet</Typography>}
      <p.CardBoxShadow sx={{ boxShadow: 5 }}>
        <Link href={`/pages/venue-specific/ID`} key="ID" underline='none'>
          <g.CardCornerProfile>
            {/* {d.media.length ? <g.CardMediaMain component="img" image={d.media[0]} alt={d.name} /> : <g.CardMediaPlaceholder component="img" image={Placeholder} alt={d.name} />} */}
            <g.CardMediaPlaceholderProfile component="img" image={Placeholder} alt="Placeholder" />
            <g.BoxCardContent>
              <g.CardContentContProfile>
                <Typography gutterBottom variant="h2" sx={{ borderBottom: '1px solid' }}>
                  Long title to test card setup for best result
                </Typography>
                <Box>
                  <Box>
                    <Typography variant="body2">City, Country</Typography>
                    <Typography variant="body2">Max guests: 00</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">Price per night: $1200,-</Typography>
                  <g.ButtonMain variant="contained" sx={{ margin: 'auto 0' }}>VIEW</g.ButtonMain>
                </Box>
              </g.CardContentContProfile>
            </g.BoxCardContent>
          </g.CardCornerProfile>
        </Link>
      </p.CardBoxShadow>
    </g.ContainerCorner >
  )
}

export default ProfileVenues;