import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { venuesUrl } from "../constants";
import { Avatar, Box, CircularProgress, Container, Link, Modal, Typography } from "@mui/material";
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
  const [open, setOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    document.title = `Holidaze | ${data.name}`;
  })

  if (isLoading) {
    return <Box sx={{ textAlign: 'center' }}><CircularProgress disableShrink size={100}
      thickness={2} sx={{ color: 'white', margin: '15px auto' }} /></Box>;
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

  function handleModal(e) {
    setModalSrc(e.target.src);
    handleOpen();
    console.log(modalSrc)
  }

  return (
    <Container disableGutters  >
      {data.status === "Not Found" ? <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" sx={{ marginBottom: '10px' }} >Seems like this page no longer exists</Typography>
        <Link href="/" variant="h2" underline="none" color="secondary" aria-label="Go to home">Go back to home page</Link>
      </Box> :
        <>
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
          <s.BoxSpecific sx={{ marginBottom: '10px' }}>
            {data.media && data.media.length ?
              <Box>
                <s.BoxImage component="img" src={data.media[0]} alt={data.name} onClick={handleModal} />
              </Box>
              : <s.BoxImage component="img" src={placeholder} alt="Placeholder" />}
            <s.BoxBorder />
            <Box>
              <Box sx={{ marginBottom: '30px' }}>
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
                {data.meta && !data.meta.pets && !data.meta.breakfast && !data.meta.parking && !data.meta.wifi ? <Box sx={{ display: 'flex', marginBottom: '5px' }}>
                  <Typography variant="body1" >No extra facilities</Typography></Box> : null}
              </Box>
              <Box>
                <Typography variant="h2" sx={{ marginBottom: '10px' }}>Details</Typography>
                <Box>
                  <Typography variant="body1">Max guests: {data.maxGuests}</Typography>
                  {data.meta && data.meta.pets ? null : <Typography variant="body1">Pets not allowed</Typography>}
                </Box>
              </Box>
            </Box>
          </s.BoxSpecific>
          <s.BoxMoreMedia>
            {data.media && data.media.length > 1 ? (
              data.media.slice(1).map((m) => {
                return (
                  <Box>
                    <Box component="img" src={m} alt={data.name} key={m} onClick={handleModal} sx={{ width: '200px', margin: '5px' }} />
                  </Box>
                )
              }))
              : null}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-media"
            >
              <s.BoxMediaModal id="modal-media" component="img" src={modalSrc} />
            </Modal>
          </s.BoxMoreMedia>
          <Box sx={{ marginBottom: '30px' }}>
            <Typography variant="h2" sx={{ marginBottom: '10px' }}>Description</Typography>
            <Typography variant="body1">{data.description}</Typography>
          </Box>
          <Box>
            <Box>
              <Typography variant="h2" sx={{ marginBottom: '10px' }}>Book your stay</Typography>
              <BookStay />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {data.owner && data.owner.avatar ?
              <Avatar src={data.owner.avatar} alt="Owner avatar" sx={{ width: '30px', height: '30px' }} />
              : <Avatar alt="Owner avatar" sx={{ width: '30px', height: '30px' }} />
            }
            {data.owner && data.owner.name ?
              <Typography variant="body2" color="primary" sx={{ marginLeft: '5px' }}>{data.owner.name}, owner</Typography> : <Typography variant="body2" color="primary" sx={{ marginLeft: '5px' }}>Name, owner</Typography>
            }
          </Box>
          {data.owner && data.owner.name === name && venueManager ?
            <VenueBookings />
            : null}
        </>
      }
    </Container>
  )
}

export default VenueSpecific;