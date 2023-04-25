import { Typography, Stack, Box } from "@mui/material";

/**
 * Sets and displays the content for the Footer
 */
function Footer() {
  return (
    <Box sx={{ backgroundColor: 'white', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0, sm: 1 }} sx={{ textAlign: 'center', margin: "10px auto" }}>
        <Typography variant="body1" color="primary">Project Exam 2</Typography>
        <Typography variant="body1" color="primary">© Marianne Bjerløv Pedersen</Typography>
      </Stack>
    </Box>
  )
}

export default Footer;