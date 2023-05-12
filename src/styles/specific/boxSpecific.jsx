import { styled, Box } from "@mui/material";

export const BoxSpecific = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '30px',


  '@media (max-width: 750px)': {

  },

  '@media (max-width: 600px)': {
    display: 'block',
  },

  // '@media (max-width: 350px)': {

  // },
}));

export const BoxInner = styled(Box)(({ theme }) => ({
  width: '300px',

  '@media (max-width: 750px)': {
    width: '250px',
  },

  '@media (max-width: 600px)': {
  },

  // '@media (max-width: 350px)': {

  // },

}));

export const BoxBorder = styled(Box)(({ theme }) => ({
  borderRight: '1px solid',

  '@media (max-width: 750px)': {
    marginRight: '15px',
  },
  '@media (max-width: 600px)': {
    borderRight: 'none',
    margin: 0,
  },

  // '@media (max-width: 350px)': {
  //   borderRight: 'none',
  //   margin: 0,
  // },
}));

export const BoxImage = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '100%',

  '@media (max-width: 750px)': {
    width: '220px',
    marginRight: '15px',
  },

  '@media (max-width: 600px)': {
    width: '270px',
    marginBottom: '10px',
  },
})) 