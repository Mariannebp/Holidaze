import React from "react";
import * as g from "../../styles/global";
import { Box, Link, Typography } from "@mui/material";
import { profileUrl } from "../constants";
import useApi from "../hooks/useApi";
import Placeholder from "../../assets/images/placeholder.png";

/**
 * Creates the content for the users venues
 */
function ProfileVenues() {
  const userInfo = JSON.parse(localStorage.getItem("profile"));
  const { name } = userInfo;
  const getVenuesUrl = profileUrl + name + "?_venues=true";
  const { data } = useApi(getVenuesUrl);
  console.log(data)

  return (
    <g.ContainerCorner>
      <Typography variant="h2">My venues</Typography>
      {data.venues && data.venues.length ?
        <Typography variant="body1">Venues</Typography> :
        <Typography variant="body1">You have no bookings yet</Typography>}
      <Link href={`/pages/venue-specific/ID`} key="ID" underline='none'>
        <g.CardCornerProfile >
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
    </g.ContainerCorner>
  )
}

export default ProfileVenues;