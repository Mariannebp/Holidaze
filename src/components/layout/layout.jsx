import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import { Stack } from "@mui/material";

/**
 * Sets and renders the layout for the pages.
 */
function Layout() {
  return (
    <Stack direction="column" justifyContent="space-between" minHeight="100vh"  >
      <Header />
      <Outlet />
      <Footer />
    </Stack>
  )
}

export default Layout;