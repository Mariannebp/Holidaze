import { styled, Card } from "@mui/material";

export const CardCorner = styled(Card)(({ theme }) => ({
  display: 'flex',
  width: '700px',
  height: '230px',
  borderRadius: '20px 0',
  boxShadow: 3,
  margin: "auto auto 20px auto",
  padding: 'auto 0',

  '&:hover': {
    transform: 'scale(1.02)',
  },

  '@media (max-width: 750px)': {
    width: '500px',
  },

  '@media (max-width: 600px)': {
    display: 'block',
    width: '300px',
    height: '400px',
  },

  '@media (max-width: 350px)': {
    display: 'block',
    width: '230px',
    height: '400px',
    padding: 'auto 0',
  },

}));
