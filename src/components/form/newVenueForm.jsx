import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Typography } from "@mui/material";
import { venuesUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { indigo, red } from "@mui/material/colors";
import * as g from "../../styles/global";
import { Add } from "@mui/icons-material";

const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "You need at least 3 characters")
      .max(50, "Your name must be 50 characters or less")
      .required("Enter a title for your venue"),
    description: yup
      .string()
      .required("Provide a description of your venue"),
    media: yup
      .string()
      .matches(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/, "Enter a valid url")
      .required("Enter a valid url"),
    mediaOptional1: yup
      .string()
      .matches(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,)
      .transform((value, originalValue) => {
        if (!value) {
          return null;
        }
        return originalValue;
      })
      .nullable()
      .optional(),
    mediaOptional2: yup
      .string()
      .matches(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,)
      .transform((value, originalValue) => {
        if (!value) {
          return null;
        }
        return originalValue;
      })
      .nullable()
      .optional(),
    mediaOptional3: yup
      .string()
      .matches(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/, "Enter a valid url")
      .transform((value, originalValue) => {
        if (!value) {
          return null;
        }
        return originalValue;
      })
      .nullable()
      .optional(),
    city: yup
      .string()
      .required("Enter the city"),
    country: yup
      .string()
      .required("Enter the country"),
    price: yup
      .number()
      .typeError("Enter a number")
      .required("Enter a price per night"),
    maxGuests: yup
      .number()
      .typeError("Enter a number")
      .min(1, "Venue must room at least 1 guest")
      .max(100, "Please enter number of guests 100 or less")
      .required("Enter maximum amount of guests"),
    meta: yup
      .boolean(),
  })
  .required();

/**
 * Creates the form for for creating a new venue, with validation
 */
function NewVenueForm() {
  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
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

    const token = localStorage.getItem("token");
    const method = "post";
    const venue = { name, description, media, price, maxGuests, meta, location }

    const body = JSON.stringify(venue);

    if (media.length) {
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
        navigate("/pages/profile");
      } else {
        alert("Something went wrong, please try again")
      }
    } else {
      alert("The media - required field must be added")
    }
  }

  const [media1, setMedia1] = useState("");
  const [media2, setMedia2] = useState("");
  const [media3, setMedia3] = useState("");
  const [media4, setMedia4] = useState("");
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [disabled3, setDisabled3] = useState(false);
  const [disabled4, setDisabled4] = useState(false);

  function checkPattern(check) {
    return (
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(check)
    )
  }

  const handleMedia1Field = () => {
    if (checkPattern(media1)) {
      setMedia(existMedia => [...existMedia, media1])
      document.getElementById("media1").disabled = "true";
      setDisabled1(true);
    } else {
      alert("Paste valid url")
    }
  }

  const handleMedia2Field = () => {
    if (checkPattern(media2)) {
      setMedia(existMedia => [...existMedia, media2])
      document.getElementById("media2").disabled = "true";
      setDisabled2(true);
    } else {
      alert("Paste valid url")
    }
  }

  const handleMedia3Field = () => {
    if (checkPattern(media3)) {
      setMedia(existMedia => [...existMedia, media3])
      document.getElementById("media3").disabled = "true";
      setDisabled3(true);
    } else {
      alert("Paste valid url")
    }
  }

  const handleMedia4Field = () => {
    if (checkPattern(media4)) {
      setMedia(existMedia => [...existMedia, media4])
      document.getElementById("media4").disabled = "true";
      setDisabled4(true);
    } else {
      alert("Paste valid url")
    }
  }

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
            id="description"
            label="Description"
            value={description}
            multiline
            rows={4}
            {...register(`description`)}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.description?.message}</Typography>
        </div>
        <Typography variant="body1" sx={{ color: indigo.A700, textAlign: 'right', marginTop: '15px' }}>MEDIA: You must press "+" on each you want to add.</Typography>
        <div>
          <g.TextFieldMain
            fullWidth
            id="media1"
            label="Media - required"
            name="media"
            type="url"
            defaultValue=""
            InputProps={{
              endAdornment: (
                <IconButton edge="end" disabled={disabled1} onClick={handleMedia1Field}>
                  <Add />
                </IconButton>
              )
            }}
            {...register(`media`)}
            onChange={(e) => setMedia1(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.media?.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="media2"
            label="Media - optional"
            name="media2"
            type="url"
            defaultValue=""
            InputProps={{
              endAdornment: (
                <IconButton edge="end" disabled={disabled2} onClick={handleMedia2Field}>
                  <Add />
                </IconButton>
              )
            }}
            {...register(`mediaOptional1`)}
            onChange={(e) => setMedia2(e.target.value)}
          />
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="media3"
            label="Media - optional"
            name="media3"
            type="url"
            defaultValue=""
            InputProps={{
              endAdornment: (
                <IconButton edge="end" disabled={disabled3} onClick={handleMedia3Field}>
                  <Add />
                </IconButton>
              )
            }}
            {...register(`mediaOptional2`)}
            onChange={(e) => setMedia3(e.target.value)}
          />
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="media4"
            label="Media - optional"
            name="media4"
            type="url"
            defaultValue=""
            InputProps={{
              endAdornment: (
                <IconButton edge="end" disabled={disabled4} onClick={handleMedia4Field}>
                  <Add />
                </IconButton>
              )
            }}
            {...register(`mediaOptional3`)}
            onChange={(e) => setMedia4(e.target.value)}
          />
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
    </Box >
  )
}

export default NewVenueForm;