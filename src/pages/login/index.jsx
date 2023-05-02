import React from "react";
import { Link, Typography } from "@mui/material";
import * as g from "../../styles/global";
import LoginForm from "../../components/form/loginForm";

function Login() {
  return (
    <g.BoxMain>
      <g.ContainerCorner>
        <Typography variant="h1" sx={{ borderBottom: '1px solid' }}>Log In</Typography>
        <LoginForm />
        <Typography variant="body1" sx={{ margin: 'auto 15px', textAlign: 'center' }}>Not registered yet? Please <Link href="/pages/register" color="secondary">register here</Link></Typography>
      </g.ContainerCorner>
    </g.BoxMain>
  )
}

export default Login;