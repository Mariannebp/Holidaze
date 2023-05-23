import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { registerUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import * as g from "../../styles/global";

const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "You need at least 3 characters")
      .max(50, "Your name must be 50 characters or less")
      .matches(/^[a-zA-Z_]*$/, "Valid characters: a-z, A-Z and underscore.")
      .required("Enter your name"),
    email: yup
      .string()
      .matches(/^[\w\-.]+@stud.noroff.no$/, "Enter a valid email address")
      .required("Enter your email address"),
    avatar: yup
      .string()
      .matches(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/, "Enter a valid url")
      .required("Enter a valid url"),
    password: yup
      .string()
      .min(8, "You need at least 8 characters")
      .max(30, "Make sure to have 30 characters or less")
      .required("Enter a password"),
    repeat_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Repeat your password"),
  })
  .required();

/**
 * Creates the form for new users to register an account, with validation
 */
function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Holidaze | Register";
  })

  /**
   * Function that sends the register information to the api
   */
  async function onSubmit() {
    const method = "post";
    const user = { name, email, avatar, password, venueManager }
    const body = JSON.stringify(user);

    const response = await fetch(registerUrl, {
      headers: {
        "Content-Type": "application/json"
      },
      method,
      body
    })

    if (response.ok) {
      alert("Registration was successful");
      navigate("/pages/login");
    } else {
      alert("Something went wrong, please try again")
    }
    console.log({ name, email, avatar, password, venueManager });
  }

  return (
    <Box sx={{ margin: '30px 15px 50px 15px' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <g.TextFieldMain
            fullWidth
            id="name"
            label="Name"
            value={name}
            {...register(`name`)}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.name?.message}</Typography>
        </div>
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
            id="avatar"
            label="Avatar"
            type="url"
            value={avatar}
            {...register(`avatar`)}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.avatar?.message}</Typography>
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
        <div>
          <g.TextFieldMain
            fullWidth
            id="repeat_password"
            label="Repeat Password"
            type="password"
            {...register(`repeat_password`)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.repeat_password?.message}</Typography>
        </div>
        <div>
          <FormControlLabel
            control={<Checkbox />}
            label="Venue Manager"
            id="venueManager"
            value={venueManager}
            {...register(`venueManager`)}
            onChange={() => setVenueManager(!venueManager)}
          />
        </div>
        <g.ButtonMain variant="contained" type="submit">REGISTER</g.ButtonMain>
      </Box>
    </Box>
  )
}

export default RegisterForm;