import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Box, Typography } from "@mui/material";
import { profileUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import * as g from "../../styles/global";
import useApi from "../hooks/useApi";

/**
 * Creates the form for updating a users avatar, with validation
 */
function UpdateAvatar() {
  const userInfo = JSON.parse(localStorage.getItem("profile"));
  const { name } = userInfo;
  const getProfileUrl = profileUrl + name;
  const putProfileUrl = getProfileUrl + "/media"
  const { data } = useApi(getProfileUrl);

  const { register, handleSubmit, formState: { errors }, } = useForm();

  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (data && data.avatar) {
      setAvatar(data.avatar);
    }
  }, [data]);


  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Holidaze | Update Avatar";
  })

  /**
   * Function that sends the information about the updated avatar to the api
   */
  async function onSubmit(e) {

    const token = localStorage.getItem("token");
    const method = "put";

    const body = JSON.stringify({ avatar: avatar });

    const response = await fetch(putProfileUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      method,
      body
    })

    if (response.ok) {
      alert("Your avatar is updated!");
      navigate("/pages/profile");
      window.location.reload()


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
            id="avatar"
            label="Avatar"
            name="avatar"
            type="url"
            value={avatar}
            {...register("avatar", {
              // required: true,
              value: { avatar },
              pattern: {
                value: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g,
                message: "Enter a valid url",
              }
            })}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.avatar && errors.avatar.message}</Typography>
        </div>
        <g.ButtonMain variant="contained" type="submit" sx={{ marginTop: '20px' }}>UPDATE</g.ButtonMain>
      </Box>
    </Box>
  )
}

export default UpdateAvatar;