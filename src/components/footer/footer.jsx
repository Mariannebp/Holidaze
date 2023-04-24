import { Typography, Stack } from "@mui/material";
import "../../styles/footer/styles.css";
import facebook from "../../assets/icons/facebook.png";
import instagram from "../../assets/icons/instagram.png";
import twitter from "../../assets/icons/twitter.png";

function Footer() {
  return (
    <div className="footer">
      <Stack direction="row" spacing={2}>
        <img src={facebook} alt="facebook icon" className="socials" />
        <img src={instagram} alt="intagram icon" className="socials" />
        <img src={twitter} alt="twitter icon" className="socials" />

      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="body1">Project Exam 2</Typography>
        <Typography variant="body1">© Marianne Bjerløv Pedersen</Typography>
      </Stack>
    </div>
  )
}

export default Footer;