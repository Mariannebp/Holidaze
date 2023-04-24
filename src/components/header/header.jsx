import { AppBar, Stack, Toolbar } from "@mui/material";
import logo from "../../assets/images/logo-resized.png";
import Nav from "./nav";
import "../../styles/header/styles.css";
import ProfileMenu from "./profilemenu";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar >
      <Toolbar className="header" >
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Link to="/">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
            <Nav />
          </Stack>
          <ProfileMenu />
        </Stack>

      </Toolbar>
    </AppBar>
  )
}

export default Header;