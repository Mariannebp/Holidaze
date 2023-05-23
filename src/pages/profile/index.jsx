import * as React from "react";
import * as g from "../../styles/global";
import ProfileInfo from "../../components/profile/profileInfo";
import ProfileOverview from "../../components/profile/profileOverview";

/**
 * Renders the content for the profile page
 */
function Profile() {

  return (
    <g.BoxMain>
      <ProfileInfo />
      <ProfileOverview />
    </g.BoxMain>
  )
}

export default Profile;