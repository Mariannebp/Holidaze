import { styled, CardMedia } from "@mui/material";

export const CardMediaMain = styled(CardMedia)(({ theme }) => ({
  width: '220px',
  height: "object-fit",
  margin: '15px',

  '@media (max-width: 750px)': {
    width: '190px',
  },

  '@media (max-width: 600px)': {
    height: '150px',
    width: '270px',
  },

  '@media (max-width: 350px)': {
    height: '140px',
    width: '200px',
  },
}));

export const CardMediaPlaceholder = styled(CardMedia)(({ theme }) => ({
  width: '200px',
  height: 'fit-content',
  margin: 'auto 25px',

  '@media (max-width: 750px)': {
    width: '170px',
    margin: 'auto 25px',
  },

  '@media (max-width: 600px)': {
    width: '224px',
    height: '150px',
    margin: '15px auto',
  },

  '@media (max-width: 350px)': {
    width: '162px',
    height: '108px',
    margin: '29px auto',
  },
}));