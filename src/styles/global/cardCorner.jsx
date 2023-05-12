import { styled, Card } from "@mui/material";

export const CardCorner = styled(Card)(({ theme }) => ({
  display: 'flex',
  width: '700px',
  height: '230px',
  borderRadius: '20px 0',
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

    '&:hover': {
      transform: 'none',
    },
  },
}));


export const CardCornerProfile = styled(CardCorner)(({ theme }) => ({
  width: '638px',
  height: '200px',

  '&:hover': {
    transform: 'none',
  },

  '@media (max-width: 750px)': {
    width: '451px',
  },

  '@media (max-width: 600px)': {
    display: 'block',
    width: '250px',
    height: '350px',
  },
}))
