import React from "react";
import * as g from "../../styles/global";
import ProfileInfo from "../../components/profile/profileInfo";
import ProfileBookings from "../../components/profile/profileBookings";
import ProfileVenues from "../../components/profile/profileVenues";

/**
 * Renders the content for the profile page
 */
function Profile() {
  const userInfo = JSON.parse(localStorage.getItem("profile"));
  const { venueManager } = userInfo;

  return (
    <g.BoxMain>
      <ProfileInfo />
      <ProfileBookings />
      {venueManager ? <ProfileVenues /> : null}
    </g.BoxMain>
  )
}

export default Profile;