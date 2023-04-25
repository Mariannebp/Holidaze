import { AppBar, Box, Stack, Toolbar, Link } from "@mui/material";
import logo from "../../assets/images/logo-resized.png";
import Nav from "./nav";
import ProfileMenu from "./profilemenu";

const logoStyle = {
  width: '80px',
  height: '80px',
  marginTop: '5px',
}

/**
 * Displays the content for the header
 */
function Header() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: '100px' }}>
      <AppBar>
        <Toolbar sx={{ backgroundColor: 'white', position: 'fixed', width: '100vw', boxShadow: 4, paddingLeft: '24px' }}>
          <Stack direction="row" spacing={{ xs: 1, sm: 4 }} sx={{ flexGrow: 1, alignItems: "center" }} >
            <Link href="/">
              <img src={logo} alt="Logo" style={logoStyle} />
            </Link>
            <Nav />
          </Stack>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </Box >
  )
}

export default Header;