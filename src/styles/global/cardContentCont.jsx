import { styled, Box } from "@mui/material";

export const CardContentCont = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  height: '200px',
  width: '419px',
  marginLeft: '15px',
  paddingTop: 0,

  '@media (max-width: 750px)': {
    width: '250px',
  },

  '@media (max-width: 600px)': {
    height: '205px',
    width: '270px',
  },
}))


export const CardContentContProfile = styled(CardContentCont)(() => ({
  width: '360px',
  height: '180px',

  '@media (max-width: 750px)': {
    width: '220px',
  },

  '@media (max-width: 600px)': {
    height: '190px',
    width: '220px',
  },

  // '@media (max-width: 350px)': {
  //   height: '205px',
  //   width: '170px',
  // }
}))