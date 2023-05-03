import React from "react";
import { Typography } from "@mui/material";
import * as g from "../../styles/global";
import RegisterForm from "../../components/form/registerForm";

/**
 * Renders the content for the Register page
 */
function Register() {
  return (
    <g.BoxMain>
      <g.ContainerCorner>
        <Typography variant="h1" sx={{ borderBottom: '1px solid' }}>Register</Typography>
        <RegisterForm />
      </g.ContainerCorner>
    </g.BoxMain>

  )
}

export default Register;