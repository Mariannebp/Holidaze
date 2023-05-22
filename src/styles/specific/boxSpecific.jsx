import { styled, Box } from "@mui/material";

export const BoxSpecific = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: '30px',

  '@media (max-width: 750px)': {

  },

  '@media (max-width: 600px)': {
    display: 'block',
  },
}));

export const BoxSpecificBook = styled(BoxSpecific)(({ theme }) => ({
  justifyContent: 'space-between',

  '@media (max-width: 750px)': {
    display: 'block',
    justifyContent: 'center',

  },

  '@media (max-width: 600px)': {
    display: 'block',
  },
}));

export const BoxInner = styled(Box)(({ theme }) => ({
  width: '300px',

  '@media (max-width: 750px)': {
    width: '250px',
  },

  '@media (max-width: 600px)': {
  },

}));

export const BoxBorder = styled(Box)(({ theme }) => ({
  borderRight: '1px solid',
  margin: '0 15px',

  '@media (max-width: 750px)': {
    marginRight: '15px',
  },
  '@media (max-width: 600px)': {
    borderRight: 'none',
    margin: 0,
  },
}));

export const BoxImage = styled(Box)(({ theme }) => ({
  width: '380px',
  height: '100%',

  '@media (max-width: 750px)': {
    width: '270px',
    // marginRight: '15px',
  },

  '@media (max-width: 600px)': {
    width: '270px',
    marginBottom: '10px',
  },
})) 