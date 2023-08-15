import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Typography } from "@mui/material";
import { venuesUrl } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import { indigo, red } from "@mui/material/colors";
import * as g from "../../styles/global";
import useApi from "../hooks/useApi";
import { Add, RemoveCircle } from "@mui/icons-material";

/**
 * Creates the form for editing a venue, with validation
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
    if (data) {
      setMedia(data.media);
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

    if (media.length) {
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
    } else {
      alert("You must have at least one media")
    }
  }

  const [media1, setMedia1] = useState("");

  function checkPattern(check) {
    return (
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(check)
    )
  }

  const handleMediaField = () => {
    if (checkPattern(media1)) {
      setMedia(existMedia => [...existMedia, media1])
      setMedia1("")
    } else {
      alert("Paste valid url")
    }
  }

  const handleMediaRemove = (index) => {
    setMedia(existMedia => {
      return existMedia.filter((_, i) => i !== index)
    })
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
                value: /^.{3,50}$/g,
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
        <Box sx={{ marginTop: '15px' }}>
          <Typography variant="body1" color="primary">Media preview</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
            {media && media.length > 0 ? (
              media.map((m, index) => {
                return (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box component="img" src={m} alt="added media" sx={{ width: '100px', margin: '5px' }} />
                    <IconButton edge="start" aria-label="remove media" sx={{ color: 'grey', paddingTop: '0' }} onClick={() => handleMediaRemove(index)}>
                      <RemoveCircle />
                    </IconButton>
                  </Box>
                )
              })
            )
              : <Typography variant="body1" color="primary" sx={{ fontStyle: 'italic' }}>No media yet</Typography>}
          </Box>
        </Box>
        <Typography variant="body1" sx={{ color: indigo.A700, textAlign: 'right', marginTop: '15px' }}
        >MEDIA: Press "+" to add.</Typography>
        <div>
          <g.TextFieldMain
            fullWidth
            id="media1"
            label="Media"
            name="media"
            type="url"
            value={media1}
            InputProps={{
              endAdornment: (
                <IconButton edge="end" aria-label="media field required" onClick={handleMediaField}>
                  <Add />
                </IconButton>
              )
            }}
            {...register(`media`)}
            onChange={(e) => setMedia1(e.target.value)}
          />
          {data.media && data.media.length > 0 ? null : <Typography variant="body2" sx={{ color: red.A700 }}>{errors.media?.message}</Typography>}
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