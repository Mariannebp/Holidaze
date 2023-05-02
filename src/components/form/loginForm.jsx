import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import * as g from "../../styles/global";

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

  useEffect(() => {
    document.title = "Holidaze | Log In";
  })

  function onSubmit() {
    console.log({ email, password });
  }

  function onEmail(e) {
    setEmail(e.target.value);
  }

  function onPassword(e) {
    setPassword(e.target.value);
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
            onChange={onEmail}
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
            onChange={onPassword}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.password?.message}</Typography>
        </div>
        <g.ButtonMain variant="contained" type="submit">LOG IN</g.ButtonMain>
      </Box>
    </Box>
  )
}

export default LoginForm;