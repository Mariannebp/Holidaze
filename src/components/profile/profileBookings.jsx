import React from "react";
import useApi from "../hooks/useApi";
import { profileUrl } from "../constants";
import { Box, Link, Typography } from "@mui/material";
import { FreeBreakfast } from "@mui/icons-material";
import * as g from "../../styles/global";
import * as p from "../../styles/profile";
import Placeholder from "../../assets/images/placeholder.png";

/**
 * Creates the content for the users bookings
 */
function ProfileBookings() {
  const userInfo = JSON.parse(localStorage.getItem("profile"));
  const { name } = userInfo;
  const getBookingsUrl = profileUrl + name + "?_bookings=true";
  const { data } = useApi(getBookingsUrl);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <g.ContainerCorner>
      <Typography variant="h2" sx={{ marginBottom: '10px' }}>My bookings</Typography>
      {data.bookings && data.bookings.length ? (
        data.bookings.map((booking) => {
          const filteredDates = new Date(booking.dateFrom) >= new Date()
          if (!filteredDates) {
            return null;
          }
          return (
            <p.CardBoxShadow sx={{ boxShadow: 5 }} key={booking.id}>
              <Link href={`/pages/venue-specific/${booking.venue.id}`} underline='none'>
                <g.CardCornerProfile>
                  {booking.venue.media && booking.venue.media.length ? <g.CardMediaBoxProfile><g.CardMediaMainProfile component="img" image={booking.venue.media[0]} alt={booking.venue.name} /></g.CardMediaBoxProfile> : <g.CardMediaPlaceholderProfile component="img" image={Placeholder} alt={booking.venue.name} />}
                  <g.BoxCardContent>
                    <g.CardContentContProfile>
                      <Typography gutterBottom variant="h2" sx={{ borderBottom: '1px solid' }}>
                        {booking.venue.name}
                      </Typography>
                      <Box>
                        <Box>
                          <Typography variant="body2">Dates: {(new Date(booking.dateFrom).toLocaleDateString('en-GB', options))} - {(new Date(booking.dateTo).toLocaleDateString('en-GB', options))} </Typography>
                          <Typography variant="body2">Guests: {booking.guests}</Typography>
                        </Box>
                        {booking.venue.meta && booking.venue.meta.breakfast ?
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FreeBreakfast sx={{ height: '20px', marginRight: '5px' }} />
                            <Typography variant="body2">Breakfast included</Typography></Box> : null}
                      </Box>
                      <Box sx={{ textAlign: "end" }}>
                        <Typography variant="h3">Total Price: ${Math.ceil(Math.abs(new Date(booking.dateTo) - new Date(booking.dateFrom)) / (1000 * 60 * 60 * 24)) * booking.venue.price},-</Typography>
                      </Box>
                    </g.CardContentContProfile>
                  </g.BoxCardContent>
                </g.CardCornerProfile>
              </Link>
            </p.CardBoxShadow>
          )

        })
      )
        :
        <Typography variant="body1">You have no bookings yet</Typography>}
    </g.ContainerCorner >
  )
}

export default ProfileBookings;