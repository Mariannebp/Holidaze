import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { venuesUrl } from "../constants";
import { Avatar, Box, Container, Typography } from "@mui/material";
import { DirectionsCar, FreeBreakfast, LocationOnOutlined, Pets, Wifi } from "@mui/icons-material";
import placeholder from "../../assets/images/placeholder.png";
import VenueBookings from "./bookings";
import ManagerOptions from "./managerOptions";

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

  console.log(data);

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
      <Box sx={{ display: 'flex', marginBottom: '30px' }}>
        {data.media && data.media.length ? <Box component="img" src={data.media[0]} alt={data.name} sx={{ width: '300px' }} /> : <Box component="img" src={placeholder} alt="Placeholder" sx={{ width: '300px' }} />}
        <Box sx={{ marginLeft: '80px' }}>
          <Box sx={{ marginBottom: '30px' }}>
            <Typography variant="h2" sx={{ marginBottom: '15px' }}>Facilities</Typography>
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
          </Box>
          <Box>
            <Typography variant="h2" sx={{ marginBottom: '15px' }}>Details</Typography>
            <Box>
              <Typography variant="body1">Max guests: {data.maxGuests}</Typography>
              {data.meta && data.meta.pets ? null : <Typography variant="body1">Pets not allowed</Typography>}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginBottom: '30px' }}>
        <Typography variant="h2" sx={{ marginBottom: '15px' }}>Description</Typography>
        <Typography variant="body1">{data.description}</Typography>
      </Box>
      <Box sx={{ display: 'flex', marginBottom: '30px' }}>
        <Box sx={{ width: '300px' }}>
          <Typography variant="h2" sx={{ marginBottom: '15px' }}>Location</Typography>
        </Box>
        <Box sx={{ width: '300px', marginLeft: '80px' }}>
          <Typography variant="h2" sx={{ marginBottom: '15px' }}>Book your stay</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
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