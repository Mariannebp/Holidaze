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

  return (
    <g.ContainerCorner>
      <Typography variant="h2">My bookings</Typography>
      {data.bookings && data.bookings.length ?
        <Typography variant="body1">Bookings</Typography> :
        <Typography variant="body1">You have no bookings yet</Typography>}
      <p.CardBoxShadow>
        <Link href={`/pages/venue-specific/ID`} key="ID" underline='none'>
          <g.CardCornerProfile sx={{ boxShadow: 3 }}>
            {/* {d.media.length ? <g.CardMediaMain component="img" image={d.media[0]} alt={d.name} /> : <g.CardMediaPlaceholder component="img" image={Placeholder} alt={d.name} />} */}
            <g.CardMediaPlaceholderProfile component="img" image={Placeholder} alt="Placeholder" />
            <g.BoxCardContent>
              <g.CardContentContProfile>
                <Typography gutterBottom variant="h2" sx={{ borderBottom: '1px solid' }}>
                  Long title to test card setup for best result
                </Typography>
                <Box>
                  <Box>
                    <Typography variant="body2">Dates: From - To</Typography>
                    <Typography variant="body2">Guests: 00</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* {d.meta.breakfast ? 
                    <FreeBreakfast sx={{ height: '20px', marginRight: '5px' }} />
                    <Typography variant="body2">Breakfast included</Typography> : null} */}
                    <FreeBreakfast sx={{ height: '20px', marginRight: '5px' }} />
                    <Typography variant="body2">Breakfast included</Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "end" }}>
                  <Typography variant="h3">Total Price: $1200,-</Typography>
                </Box>
              </g.CardContentContProfile>
            </g.BoxCardContent>
          </g.CardCornerProfile>
        </Link>
      </p.CardBoxShadow>
    </g.ContainerCorner >
  )
}

export default ProfileBookings;