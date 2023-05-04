import React from "react";
import { Link, Typography } from "@mui/material";
import * as g from "../../styles/global";
import NewVenueForm from "../../components/form/newVenueForm";

/**
 * Renders the content for the Create New Venue page
 */
function NewVenue() {
  const user = JSON.parse(localStorage.getItem("profile"))
  const { venueManager } = user;

  return (
    <g.BoxMain>
      {venueManager ?
        <g.ContainerCorner>
          <Typography variant="h1" sx={{ borderBottom: '1px solid' }}>Create New Venue</Typography>
          <NewVenueForm />
        </g.ContainerCorner> :
        <g.ContainerCorner>
          <Typography variant="h1" sx={{ marginBottom: '15px', fontSize: '1.5rem' }} >Sorry, seems like you don't have access</Typography>
          <Link href="/" underline="none">
            <Typography variant="body" color="secondary">Return to front page</Typography>
          </Link>
        </g.ContainerCorner>}
    </g.BoxMain>
  )
}

export default NewVenue;