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
  },

  '@media (max-width: 600px)': {
    width: '270px',
    marginBottom: '10px',
  },
}))

export const BoxMoreMedia = styled(Box)(({ theme }) => ({
  marginBottom: '20px',
  display: 'flex',
  flexWrap: 'wrap',

  '@media (max-width: 750px)': {

  },

  '@media (max-width: 600px)': {
    justifyContent: 'center'
  },
}))

export const BoxMediaModal = styled(Box)(({ theme }) => ({
  width: '600px',
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid #fff',
  boxShadow: 24,

  '@media (max-width: 750px)': {
    width: '500px'
  },

  '@media (max-width: 600px)': {
    width: '300px',
    justifyContent: 'center'
  },
}))