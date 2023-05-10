import React from "react";
import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { venuesUrl } from "../constants";
import { Box, Typography } from "@mui/material";
import * as g from "../../styles/global";
import * as p from "../../styles/profile";

function VenueBookings() {
  let { id } = useParams();
  const specific = id + '?_bookings=true'
  const { data, isLoading, isError } = useApi(venuesUrl + specific);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  if (isLoading) {
    return <Typography variant="body1">Loading bookings...</Typography>;
  }
  if (isError) {
    return <Typography variant="body1">Oops, something seems to have gone wrong here..</Typography>;
  }

  return (
    <Box sx={{ maxWidth: '300px', marginTop: '30px' }}>
      <Typography variant="h2" sx={{ marginBottom: '15px' }}>Bookings</Typography>
      {data.bookings && data.bookings.length ?
        (data.bookings.map((d) => (
          <p.CardBoxShadow key={d.id} sx={{ maxWidth: '300px', maxHeight: '130px', transform: 'none', boxShadow: 5 }}>
            <g.CardCornerProfile sx={{ maxWidth: '300px', maxHeight: '130px' }}>
              <Box sx={{ margin: 'auto 15px' }}>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="body1" color="primary" sx={{ marginRight: '5px' }}>Dates:</Typography>
                  <Typography variant="body1">{(new Date(d.dateFrom).toLocaleDateString('en-GB', options))} - {(new Date(d.dateTo).toLocaleDateString('en-GB', options))}</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="body1" color="primary" sx={{ marginRight: '5px' }}>Nights:</Typography>
                  <Typography variant="body1">{Math.ceil(Math.abs(new Date(d.dateTo) - new Date(d.dateFrom)) / (1000 * 60 * 60 * 24))}</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="body1" color="primary" sx={{ marginRight: '5px' }}>Guests:</Typography>
                  <Typography variant="body1">{d.guests} </Typography>
                </Box>
              </Box>
            </g.CardCornerProfile>
          </p.CardBoxShadow>
        )))
        : <Typography variant="body1">No bookings yet</Typography>}
    </Box>
  )
}

export default VenueBookings;