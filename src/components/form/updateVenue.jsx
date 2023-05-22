import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Typography } from "@mui/material";
import { venuesUrl } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import { red } from "@mui/material/colors";
import * as g from "../../styles/global";
import useApi from "../hooks/useApi";

/**
 * Creates the form for new users to register an account, with validation
 */
function UpdateVenueForm() {
  let { id } = useParams();
  const { data } = useApi(venuesUrl + id);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    document.title = "Holidaze | Edit Venue";
  })

  const [name, setName] = useState("");
  useEffect(() => {
    if (data) {
      setName(data.name)
    }
  }, [data]);

  const [description, setDescription] = useState("");
  useEffect(() => {
    if (data) {
      setDescription(data.description);
    }
  }, [data]);
  const [media, setMedia] = useState([]);
  useEffect(() => {
    if (data && data.media) {
      setMedia([data.media[0]]);
    }
  }, [data]);
  const [priceValue, setPriceValue] = useState("");
  useEffect(() => {
    if (data) {
      setPriceValue(data.price);
    }
  }, [data]);
  const price = Number(priceValue);
  const [maxGuestsValue, setMaxGuestsValue] = useState("");
  useEffect(() => {
    if (data) {
      setMaxGuestsValue(data.maxGuests);
    }
  }, [data]);
  const maxGuests = parseInt(maxGuestsValue);
  const [meta, setMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
  useEffect(() => {
    if (data) {
      setMeta({ ...data.meta });
    }
  }, [data]);
  const { wifi, parking, breakfast, pets } = meta;
  const [location, setLocation] = useState({
    city: "",
    country: "",
  });
  useEffect(() => {
    if (data) {
      setLocation({ ...data.location })
    }
  }, [data]);
  const { city, country } = location;

  const navigate = useNavigate();

  /**
   * Function that sends the updated information about the new venue to the api
   */
  async function onSubmit(e) {

    const token = localStorage.getItem("token");
    const method = "put";
    const venue = { name, description, media, price, maxGuests, meta, location }

    const body = JSON.stringify(venue);

    const response = await fetch(venuesUrl + id, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      method,
      body
    })

    if (response.ok) {
      alert("Your venue is updated!");
      navigate(`/pages/venue-specific/${id}`)
      window.location.reload()
    } else {
      alert("Something went wrong, please try again")
    }
  }

  const handleMediaChange = (e) => {
    setMedia([e.target.value])
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
            value={name || ""}
            {...register("name", {
              required: true,
              value: { name },
              pattern: {
                value: /^[a-zA-Z ]{3,50}$/g,
                message: "Must be between 3-50 characters",
              }
            })}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700, textAlign: 'right' }}>{errors.name && errors.name.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="description"
            label="Description"
            value={description || ""}
            multiline
            rows={4}
            {...register("description", {
              required: true,
              value: { description },
              pattern: {
                value: /^.{1,}$/g,
                message: "Enter a description.",
              }
            })}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.description && errors.description.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="media"
            label="Media"
            name="media"
            type="url"
            value={media || []}
            {...register("media", {
              required: true,
              value: { media },
              pattern: {
                value: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g,
                message: "Enter a valid url",
              }
            })}
            onChange={handleMediaChange}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.media && errors.media.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="city"
            label="City"
            value={city || ""}
            {...register("city", {
              required: true,
              value: { city },
              pattern: {
                value: /^[a-zA-Z ]{3,30}$/g,
                message: "Enter a city, 3-30 characters",
              }
            })}
            onChange={handleLocationChange}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.city && errors.city.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="country"
            label="Country"
            value={country || ""}
            {...register("country", {
              required: true,
              value: { country },
              pattern: {
                value: /^[a-zA-Z ]{3,30}$/g,
                message: "Enter a country, 3-30 characters",
              }
            })}
            onChange={handleLocationChange}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.country && errors.country.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="price"
            label="Price per night"
            type="number"
            value={priceValue || ""}
            {...register("price", {
              required: true,
              value: { price },
              pattern: {
                value: /[1-9][0-9]*/,
                message: "Enter a price of at least 1",
              }
            })}
            onChange={(e) => setPriceValue(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.price && errors.price.message}</Typography>
        </div>
        <div>
          <g.TextFieldMain
            fullWidth
            id="maxGuests"
            label="Max Guests"
            type="number"
            value={maxGuestsValue || ""}
            {...register("maxGuests", {
              required: true,
              value: { maxGuests },
              pattern: {
                value: /^(100|[1-9][0-9]?)$/,
                message: "Enter maximum amount of guests, 1-100 guests",
              }
            })}
            onChange={(e) => setMaxGuestsValue(e.target.value)}
          />
          <Typography variant="body2" sx={{ color: red.A700 }}>{errors.maxGuests && errors.maxGuests.message}</Typography>
        </div>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Facilities</FormLabel>
            <FormGroup sx={{ display: "flex" }}>
              <FormControlLabel
                control={<Checkbox checked={wifi || false} onChange={handleMetaChange} name="wifi" />}
                label="Wifi"
              />
              <FormControlLabel
                control={<Checkbox checked={parking || false} onChange={handleMetaChange} name="parking" />}
                label="Parking"
              />
              <FormControlLabel
                control={<Checkbox checked={breakfast || false} onChange={handleMetaChange} name="breakfast" />}
                label="Breakfast"
              />
              <FormControlLabel
                control={<Checkbox checked={pets || false} onChange={handleMetaChange} name="pets" />}
                label="Pets"
              />
            </FormGroup>
          </FormControl>
        </div>
        <g.ButtonMain variant="contained" type="submit">UPDATE</g.ButtonMain>
      </Box>
    </Box>
  )
}

export default UpdateVenueForm;