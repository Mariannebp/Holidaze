import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { loginUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import * as g from "../../styles/global";

/**
 * Creates the form for for login in, with validation
 */
function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Holidaze | Log In";
  })

  /**
   * Function that sends user information to the API when user logs in, and stores their profile information in localStorage.
   */
  async function onSubmit() {
    const method = "post";
    const userLogin = { email, password }
    const body = JSON.stringify(userLogin);

    const response = await fetch(loginUrl, {
      headers: {
        "Content-Type": "application/json"
      },
      method,
      body
    })

    const { accessToken, ...user } = await response.json()

    if (response.ok) {
      navigate("/pages/profile");
      localStorage.setItem("token", accessToken)
      localStorage.setItem("profile", JSON.stringify(user))
      window.location.reload();
    } else {
      alert("Something went wrong, please try again")
    }
  }

  return (
    <Box sx={{ margin: '30px 15px 50px 15px' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <g.TextFieldMain
            fullWidth
            id="email"
            label="Email"
            value={email}
            {...register(`email`, {
              required: true,
              value: { email },
              pattern: {
                value: /^[\w\-.]+@stud.noroff.no$/,
                message: "Enter a valid email address"
              }
            })}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700, textAlign: 'right' }}>{errors.email && errors.email.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="password"
            label="Password"
            type="password"
            value={password}
            {...register(`password`, {
              required: true,
              pattern: {
                value: /^.{8,30}$/g,
                message: "Must be between 8-30 characters",
              }
            })}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700, textAlign: 'right' }}>{errors.password && errors.password.message}</Typography>
        </div>
        <g.ButtonMain variant="contained" type="submit" onClick={onSubmit}>LOG IN</g.ButtonMain>
      </Box>
    </Box>
  )
}

export default LoginForm;