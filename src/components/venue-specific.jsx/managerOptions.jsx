import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { venuesUrl } from "../constants";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import * as g from "../../styles/global";

/**
 * Function that creates the Edit and Delete options for the venue specific is the user has role of venueManager
 */
function ManagerOptions() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();
  const method = "delete";
  const token = localStorage.getItem("token");

  /**
   * Function that deletes a venue. 
   */
  async function onDelete() {
    const response = await fetch(venuesUrl + id, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      method
    })
    console.log(response)
    if (response.ok) {
      alert("Your venue has been deleted");
      navigate("/pages/profile");
    } else {
      alert("Something went wrong, please try again")
    }
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => onDelete();

  return (
    <div>
      <Box sx={{ textAlign: 'end' }}>
        <IconButton aria-label="edit venue" href={`/pages/edit-venue/${id}`}>
          <Edit />
        </IconButton>
        <IconButton aria-label="delete venue" onClick={handleOpen} >
          <Delete />
        </IconButton>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: 400, bgcolor: 'white', boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h2" sx={{ marginBottom: '10px' }}>Delete?</Typography>
          <Typography id="modal-modal-description" variant="body1">Are you sure you want to delete your venue?</Typography>
          <Typography id="modal-modal-description" variant="body1" sx={{ marginBottom: '10px' }}>This action is permanent, and can not be undone.</Typography>
          <Box sx={{ display: 'flex' }} >
            <g.ButtonSecond variant="contained" onClick={handleDelete}>Delete</g.ButtonSecond>
            <g.ButtonMain variant="contained" onClick={handleClose}>Cancel</g.ButtonMain>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ManagerOptions;
