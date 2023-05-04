import { styled, Box } from "@mui/material";

export const CardBoxShadow = styled(Box)(({ theme }) => ({
  width: '638px',
  height: '200px',
  borderRadius: '20px 0',
  margin: "auto auto 20px auto",
  padding: 'auto 0',

  '&:hover': {
    transform: 'scale(1.02)',
  },

  '@media (max-width: 750px)': {
    width: '451px',
  },

  '@media (max-width: 600px)': {
    width: '250px',
    height: '350px',
  },

  '@media (max-width: 350px)': {
    width: '200px',
    height: '370px',
  },
}));