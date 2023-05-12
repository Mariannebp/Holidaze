import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import useApi from "../hooks/useApi";
import { venuesUrl, bookingsUrl } from "../constants";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import * as g from "../../styles/global";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { enGB } from "date-fns/locale";

import "../../styles/specific/calendar/styles.css"

/**
 * Creates the form for new bookings, with validation
 */
function BookStay() {
  const { register, handleSubmit } = useForm();
  let { id } = useParams();
  const bookings = id + '?_bookings=true';
  const { data } = useApi(venuesUrl + bookings);
  const booked = data.bookings;
  const [datePicker, setDatePicker] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection"
    }
  ]);
  const dateFrom = datePicker[0].startDate;
  const dateTo = datePicker[0].endDate;
  const [guestsValue, setGuests] = useState();
  const guests = parseInt(guestsValue);
  const venueId = id;
  const [bookedDates, setBookedDates] = useState([]);

  /**
  * Filters out the dates between two dates.
  * @param {*} startDate 
  * @param {*} endDate 
  * @ref inspired by https://gist.github.com/miguelmota/7905510
  */
  const getDatesBetween = (startDate, endDate) => {
    const dates = [];

    let currentDate = startDate;

    while (currentDate <= endDate) {
      dates.push(currentDate);

      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1,
      );
    }
    return dates;
  };


  /**
   * Sorts out the already booked dates for the venue
   */

  useEffect(() => {
    if (booked && booked.length > 0) {
      const blockedDates = booked.flatMap((b) => getDatesBetween(new Date(b.dateFrom), new Date(b.dateTo)));
      setBookedDates(blockedDates);
    }
  }, [booked]);

  /**
   * Function that sends the information about the new booking to the api
   */
  async function onSubmit(e) {
    const token = localStorage.getItem("token");
    const method = "post";
    const booking = { dateFrom, dateTo, guests, venueId }
    const body = JSON.stringify(booking);

    const response = await fetch(bookingsUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      method,
      body
    })

    if (response.ok) {
      alert("Thank you for booking your stay!");
      window.location.reload();
    } else {
      alert("Something went wrong, please try again")
    }
  }

  const handleChange = (item) => {
    setDatePicker([item.selection]);
  };

  const maxGuests = data.maxGuests;

  const handleGuests = (e) => {
    const guests = e.target.value;
    if (guests <= maxGuests) {
      setGuests(e.target.value)
    } else {
      alert("To many guests");
    }
  }

  const nights = Math.ceil(Math.abs(dateTo - dateFrom) / (1000 * 60 * 60 * 24));
  const totalPrice = nights * data.price;

  return (
    <Box sx={{ maxWidth: '300px' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ maxWidth: '300px', position: 'relative', margin: 0 }}>
          <DateRange
            locale={enGB}
            className="calendar"
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            minDate={new Date()}
            disabledDates={bookedDates}
            ranges={datePicker}
            onChange={handleChange}
            direction="horizontal"
          />
        </Box>
        <div>
          <g.TextFieldMain
            fullWidth
            required
            size="small"
            type="number"
            id="guests"
            label="Guests"
            {...register(`guests`)}
            onChange={handleGuests}
          />
        </div>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="body1" color="primary" sx={{ marginRight: '5px' }}>Nights:</Typography>
          <Typography variant="body1">{nights > 0 ? nights : 0}</Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="body1" color="primary" sx={{ marginRight: '5px' }}>Price per night: </Typography>
          <Typography variant="body1">${data.price},-</Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="body1" color="primary" sx={{ marginRight: '5px' }}>Total Price:</Typography>
          <Typography variant="body1">${nights > 0 ? totalPrice : 0},-</Typography>
        </Box>
        <g.ButtonMain variant="contained" type="submit">BOOK</g.ButtonMain>
      </Box>
    </Box>
  )
}

export default BookStay;