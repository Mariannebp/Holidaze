import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import { Box } from "@mui/material";

/**
 * Sets and renders the layout for the pages.
 */
function Layout() {
  return (
    <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100vh' }} >
      <Header />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default Layout;