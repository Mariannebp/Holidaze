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
  const getVenuesUrl = profileUrl + name + "?_venues=true&sort=created";
  const { data } = useApi(getVenuesUrl);

  return (
    <Box ps={0} sx={{ marginTop: '15px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginBottom: '15px' }}>
        <Link href="/pages/new-venue">
          <g.ButtonSecond variant="contained" sx={{ width: '120px', margin: 'auto 0' }}>New Venue</g.ButtonSecond>
        </Link>
      </Box>
      {data.venues && data.venues.length ? (
        data.venues.map((venue) => (
          <p.CardBoxShadow sx={{ boxShadow: 5 }} key={venue.id}>
            <Link href={`/pages/venue-specific/${venue.id}`} key={venue.id} underline='none'>
              <g.CardCornerProfile>
                {venue.media.length ?
                  <g.CardMediaBoxProfile>
                    <g.CardMediaMainProfile component="img" image={venue.media[0]} alt={venue.name} />
                  </g.CardMediaBoxProfile> :
                  <g.CardMediaPlaceholderProfile component="img" image={Placeholder} alt={venue.name} />}
                <g.BoxCardContentProfile>
                  <g.CardContentContProfile>
                    <Typography gutterBottom variant="h2" sx={{ borderBottom: '1px solid' }}>
                      {venue.name}
                    </Typography>
                    <Box>
                      <Box>
                        <Typography variant="body2">{venue.location.city}, {venue.location.country}</Typography>
                        <Typography variant="body2">Max guests: {venue.maxGuests}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2">Price per night: ${venue.price},-</Typography>
                      <g.ButtonMain variant="contained" sx={{ margin: 'auto 0' }}>VIEW</g.ButtonMain>
                    </Box>
                  </g.CardContentContProfile>
                </g.BoxCardContentProfile>
              </g.CardCornerProfile>
            </Link>
          </p.CardBoxShadow>)))
        : <Typography variant="body1">You have no bookings yet</Typography>}
    </Box >
  )
}

export default ProfileVenues;