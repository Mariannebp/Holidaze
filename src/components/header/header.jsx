import { AppBar, Box, Stack, Toolbar, Link } from "@mui/material";
import logo from "../../assets/images/logo-resized.png";
import Nav from "./nav";
import ProfileMenu from "./profilemenu";
import { ButtonMain } from "../../styles/global";
import { useNavigate } from "react-router-dom";

/**
 * Displays the content for the header
 */
function Header() {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("profile");

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '100px' }}>
      <AppBar>
        <Toolbar sx={{ backgroundColor: 'white', position: 'fixed', width: '100%', boxShadow: 4, paddingLeft: '24px' }}>
          <Stack direction="row" spacing={{ xs: 1, sm: 4 }} sx={{ flexGrow: 1, alignItems: "center" }} >
            <Link href="/">
              <Box component="img" src={logo} sx={{ width: '80px', height: '80px', marginTop: '5px', }} />
            </Link>
            <Nav />
          </Stack>
          {userInfo ? <ProfileMenu /> : <ButtonMain variant="contained" onClick={() => navigate("/pages/login")}>LOG IN</ButtonMain>}
        </Toolbar>
      </AppBar>
    </Box >
  )
}

export default Header;