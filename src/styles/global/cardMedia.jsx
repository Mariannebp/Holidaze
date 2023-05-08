import { styled, CardMedia, Box } from "@mui/material";

export const CardMediaBox = styled(Box)(({ theme }) => ({
  width: '250px',
  height: '230px',
  margin: 0,

  '@media (max-width: 750px)': {
    width: '220px',
  },

  '@media (max-width: 600px)': {
    height: '180px',
    width: '300px',
    position: 'relative',
  },

  '@media (max-width: 350px)': {
    height: '170px',
    width: '230px',
    position: 'relative',
  },
}))

export const CardMediaBoxProfile = styled(CardMediaBox)(({ theme }) => ({
  height: '200px',

  '@media (max-width: 750px)': {
    width: '195px',
    height: '200px',
  },

  '@media (max-width: 600px)': {
    width: '250px',
    height: '150px',
  },

  '@media (max-width: 350px)': {
    width: '200px',
    height: '125px',
  },
}))

export const CardMediaMain = styled(CardMedia)(({ theme }) => ({
  width: '220px',
  height: "200px",
  margin: '15px',

  '@media (max-width: 750px)': {
    width: '190px',
  },

  '@media (max-width: 600px)': {
    height: '150px',
    width: '270px',
    position: 'absolute',
  },

  '@media (max-width: 350px)': {
    height: '140px',
    width: '200px',
    position: 'absolute',
  },
}));

export const CardMediaPlaceholder = styled(CardMedia)(({ theme }) => ({
  width: '200px',
  height: 'object-fit',
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

export const CardMediaMainProfile = styled(CardMediaMain)(() => ({
  height: '170px',

  '@media (max-width: 750px)': {
    width: '165px',
    height: '170px',
    margin: '15px',
  },

  '@media (max-width: 600px)': {
    width: '220px',
    height: '120px',
    margin: '15px',
  },

  '@media (max-width: 350px)': {
    width: '170px',
    height: '95px',
    margin: '15px',
  },
}))

export const CardMediaPlaceholderProfile = styled(CardMediaPlaceholder)(() => ({
  width: '180px',
  margin: 'auto 35px',

  '@media (max-width: 750px)': {
    width: '155px',
    margin: 'auto 20px',
  },

  '@media (max-width: 600px)': {
    width: '179px',
    height: '120px',
    margin: '15px auto',
  },

  '@media (max-width: 350px)': {
    width: '140px',
    height: '94px',
    margin: '15px auto',
  },
}))