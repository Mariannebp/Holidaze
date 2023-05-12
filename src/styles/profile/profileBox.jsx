import { styled, Box } from "@mui/material";

export const ProfileBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',


  '@media (max-width: 750px)': {
  },

  '@media (max-width: 600px)': {
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
}))

export const ProfileInfoBox = styled(Box)(({ theme }) => ({
  width: '450px',

  '@media (max-width: 750px)': {
    width: '280px',
  },

  '@media (max-width: 600px)': {
    width: '250px',
    marginTop: '20px',
  },
}))