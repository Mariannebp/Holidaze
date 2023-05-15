import React from "react";
import * as g from "../../styles/global";
import RedirectInfo from "../../components/error/redirect-info";

/**
 * Renders the content for the not logged in error information
 */
function NotLoggedIn() {

  return (
    <g.BoxMain>
      <RedirectInfo />
    </g.BoxMain>
  )
}

export default NotLoggedIn;