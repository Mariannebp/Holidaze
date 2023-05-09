import React from "react";
import VenueSpecific from "../../components/venue-specific.jsx/venueSpecific";
import * as g from "../../styles/global";

function Venue() {
  return (
    <g.BoxMain>
      <g.ContainerCorner>
        <VenueSpecific />
      </g.ContainerCorner>
    </g.BoxMain>
  )
}

export default Venue;