import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import * as g from "../../styles/global";
import { loginUrl } from "../constants";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup
      .string()
      .matches(/^[\w\-.]+@stud.noroff.no$/, "Enter a valid email address")
      .required("Enter your email address"),
    password: yup
      .string()
      .min(8, "You need at least 8 characters")
      .max(30, "Make sure to have 30 characters or less")
      .required("Enter a password"),
  })
  .required();

/**
 * Creates the form for for login in, with validation
 */
function LoginForm() {
  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Holidaze | Log In";
  })

  /**
   * Function that sends user information to the API, and stores their profile information in localStorage.
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

    localStorage.setItem("token", accessToken)
    localStorage.setItem("profile", JSON.stringify(user))

    if (response.ok) {
      alert("You logged in!");
      navigate("/pages/profile");
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
            {...register(`email`)}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.email?.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="password"
            label="Password"
            type="password"
            value={password}
            {...register(`password`)}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.password?.message}</Typography>
        </div>
        <g.ButtonMain variant="contained" type="submit">LOG IN</g.ButtonMain>
      </Box>
    </Box>
  )
}

export default LoginForm;