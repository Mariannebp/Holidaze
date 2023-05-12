import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { venuesUrl } from "../constants";
import { Avatar, Box, Container, Typography } from "@mui/material";
import { DirectionsCar, FreeBreakfast, LocationOnOutlined, Pets, Wifi } from "@mui/icons-material";
import * as s from "../../styles/specific";
import placeholder from "../../assets/images/placeholder.png";
import VenueBookings from "./bookings";
import ManagerOptions from "./managerOptions";
import BookStay from "./bookStay";

/**
 * Creates the content for the specific venue
 */
function VenueSpecific() {
  let { id } = useParams();
  const specific = id + '?_owner=true'
  const { data, isLoading, isError } = useApi(venuesUrl + specific);
  const userInfo = JSON.parse(localStorage.getItem("profile"));
  const { venueManager, name } = userInfo;

  useEffect(() => {
    document.title = `Holidaze | ${data.name}`;
  })

  if (isLoading) {
    return <Typography variant="h1">Loading...</Typography>;
  }
  if (isError) {
    return <Typography variant="body1">Oops, something seems to have gone wrong here..</Typography>;
  }

  let location;
  if (data.location && (data.location.city !== "Unknown" && data.location.city !== "" && data.location.country !== "Unknown" && data.location.country !== "")) {
    location = <Typography variant="body2">{data.location.city}, {data.location.country}</Typography>
  } else {
    location = <Typography variant="body2">Mystery Location</Typography>
  }

  // console.log(data);

  return (
    <Container disableGutters  >
      <Typography variant="h1" sx={{ borderBottom: '1px solid' }}>{data.name}</Typography>
      <Box sx={{ margin: '10px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex' }}>
          <LocationOnOutlined />
          {location}
        </Box>
        {data.owner && data.owner.name === name ?
          <ManagerOptions />
          : null}
      </Box>
      <s.BoxSpecific>
        {data.media && data.media.length ? <s.BoxImage component="img" src={data.media[0]} alt={data.name} /> : <s.BoxImage component="img" src={placeholder} alt="Placeholder" />}
        <s.BoxBorder />

        <Box>
          <s.BoxInner sx={{ marginBottom: '30px' }}>
            <Typography variant="h2" sx={{ marginBottom: '10px' }}>Facilities</Typography>
            {data.meta && data.meta.wifi ? <Box sx={{ display: 'flex', marginBottom: '5px' }}>
              <Wifi />
              <Typography variant="body1" sx={{ marginLeft: '5px' }}>Wifi</Typography>
            </Box> : null}
            {data.meta && data.meta.parking ? <Box sx={{ display: 'flex', marginBottom: '5px' }}>
              <DirectionsCar />
              <Typography variant="body1" sx={{ marginLeft: '5px' }}>Parking</Typography>
            </Box> : null}
            {data.meta && data.meta.breakfast ? <Box sx={{ display: 'flex', marginBottom: '5px' }}>
              <FreeBreakfast />
              <Typography variant="body1" sx={{ marginLeft: '5px' }}>Breakfast included</Typography>
            </Box> : null}
            {data.meta && data.meta.pets ? <Box sx={{ display: 'flex', marginBottom: '5px' }}>
              <Pets />
              <Typography variant="body1" sx={{ marginLeft: '5px' }}>Pets allowed</Typography>
            </Box> : null}
          </s.BoxInner>
          <s.BoxInner>
            <Typography variant="h2" sx={{ marginBottom: '10px' }}>Details</Typography>
            <Box>
              <Typography variant="body1">Max guests: {data.maxGuests}</Typography>
              {data.meta && data.meta.pets ? null : <Typography variant="body1">Pets not allowed</Typography>}
            </Box>
          </s.BoxInner>
        </Box>

      </s.BoxSpecific>
      <Box sx={{ marginBottom: '30px' }}>
        <Typography variant="h2" sx={{ marginBottom: '10px' }}>Description</Typography>
        <Typography variant="body1">{data.description}</Typography>
      </Box>
      <s.BoxSpecific>
        <s.BoxInner>
          <Typography variant="h2" sx={{ marginBottom: '10px' }}>Book your stay</Typography>
          <BookStay />
        </s.BoxInner>
      </s.BoxSpecific>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {data.owner && data.owner.avatar ?
          <Avatar src={data.owner.avatar} sx={{ width: '30px', height: '30px' }} />
          : <Avatar sx={{ width: '30px', height: '30px' }} />
        }
        {data.owner && data.owner.name ?
          <Typography variant="body2" color="primary" sx={{ marginLeft: '5px' }}>{data.owner.name}, owner</Typography> : <Typography variant="body2" color="primary" sx={{ marginLeft: '5px' }}>Name, owner</Typography>
        }
      </Box>
      {data.owner && data.owner.name === name && venueManager ?
        <VenueBookings />
        : null}
    </Container>
  )
}

export default VenueSpecific;