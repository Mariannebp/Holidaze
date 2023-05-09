import React, { useState } from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import * as g from "../../styles/global";
// import useDelete from "./deleteVenue";
// import DeleteVenue from "./deleteVenue";

const style = {
  position: 'absolute',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
};

function ManagerOptions() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const handleDelete = () => useDelete(id);

  return (
    <div>
      <Box sx={{ textAlign: 'end' }}>
        <IconButton onClick={() => navigate("/pages/edit-venue")}>
          <Edit />
        </IconButton>
        <IconButton onClick={handleOpen} >
          <Delete />
        </IconButton>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2">Delete?</Typography>
          <Typography id="modal-modal-description" variant="body1">Are you sure you want to delete your venue?</Typography>
          <Typography id="modal-modal-description" variant="body1">This action is permanent, and can not be undone.</Typography>
          <Box >
            <g.ButtonSecond variant="contained" onClick={handleClose}>Delete</g.ButtonSecond>
            <g.ButtonMain variant="contained" onClick={handleClose}>Cancel</g.ButtonMain>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ManagerOptions;
