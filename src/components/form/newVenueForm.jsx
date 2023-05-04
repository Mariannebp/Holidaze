import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import * as g from "../../styles/global";
import { venuesUrl } from "../constants";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "You need at least 3 characters")
      .max(50, "Your name must be 50 characters or less")
      .required("Enter your name"),
    description: yup
      .string()
      .required("Enter your email address"),
    media: yup
      .string()
      .matches(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/, "Enter a valid url")
      .required("Enter a valid url"),
    city: yup
      .string()
      .required("Enter the city"),
    country: yup
      .string()
      .required("Enter the country"),
    price: yup
      .number("Enter a number")
      .required("Enter a price per night"),
    maxGuests: yup
      .number("Enter a number")
      .required("Enter maximum amount of guests"),
    meta: yup
      .boolean(),
    location: yup
      .string()
      .required("Enter location"),
  })
  .required();

/**
 * Creates the form for new users to register an account, with validation
 */
function NewVenueForm() {
  const { register, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([]);
  const [priceValue, setPriceValue] = useState("");
  const price = Number(priceValue);
  const [maxGuestsValue, setMaxGuestsValue] = useState("");
  const maxGuests = parseInt(maxGuestsValue);
  const [meta, setMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
  const { wifi, parking, breakfast, pets } = meta;
  const [location, setLocation] = useState({
    city: "",
    country: "",
  });
  const { city, country } = location;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Holidaze | Create New Venue";
  })

  /**
   * Function that sends the information about the new venue to the api
   */
  async function onSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const method = "post";
    const venue = { name, description, media, price, maxGuests, meta }
    // const venue = [
    //   { name, description, media, price, maxGuests, meta },
    //   { location }
    // ]


    const venueInfo = { venue }
    const body = JSON.stringify(venue);

    const response = await fetch(venuesUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      method,
      body
    })

    if (response.ok) {
      alert("Your venue is published!");
      return await response.json();
      // navigate("/pages/profile");
    } else {
      alert("Something went wrong, please try again")
    }
    console.log(venue);
  }

  // function onSubmit(e) {
  //   e.preventDefault();
  //   console.log({ name: name, description: description, media: media, location: location, price: priceValue, maxGuests: maxGuestsValue, meta: meta })
  // }

  // const handleMediaChange = {(e) => {

  // }}
  // };

  const handleLocationChange = (e) => {
    setLocation({
      ...location,
      [e.target.name]: e.target.value,
    });
  };

  const handleMetaChange = (e) => {
    setMeta({
      ...meta,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <Box sx={{ margin: '30px 15px 50px 15px' }}>
      <Box component="form" onSubmit={onSubmit}>
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
            id="description"
            label="Description"
            value={description}
            {...register(`description`)}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.description?.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="media"
            label="Media"
            name="media"
            type="url"
            value={media}
            {...register(`media`)}
            onChange={(e) => setMedia(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.media?.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="city"
            label="City"
            value={city}
            {...register(`city`)}
            onChange={handleLocationChange}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.city?.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="country"
            label="Country"
            value={country}
            {...register(`country`)}
            onChange={handleLocationChange}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.country?.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="price"
            label="Price per night"
            type="number"
            value={priceValue}
            {...register(`price`)}
            onChange={(e) => setPriceValue(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.price?.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="maxGuests"
            label="Max Guests"
            type="number"
            value={maxGuestsValue}
            {...register(`maxGuests`)}
            onChange={(e) => setMaxGuestsValue(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.maxGuests?.message}</Typography>
        </div>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Facilities</FormLabel>
            <FormGroup sx={{ display: "flex" }}>
              <FormControlLabel
                control={<Checkbox checked={wifi} onChange={handleMetaChange} name="wifi" />}
                label="Wifi"
              />
              <FormControlLabel
                control={<Checkbox checked={parking} onChange={handleMetaChange} name="parking" />}
                label="Parking"
              />
              <FormControlLabel
                control={<Checkbox checked={breakfast} onChange={handleMetaChange} name="breakfast" />}
                label="Breakfast"
              />
              <FormControlLabel
                control={<Checkbox checked={pets} onChange={handleMetaChange} name="pets" />}
                label="Pets"
              />
            </FormGroup>
          </FormControl>
        </div>
        <g.ButtonMain variant="contained" type="submit">PUBLISH</g.ButtonMain>
      </Box>
    </Box>
  )
}

export default NewVenueForm;