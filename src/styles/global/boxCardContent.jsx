import { styled, Box } from "@mui/material";

export const BoxCardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '435px',
  borderLeft: '1px solid',
  borderColor: theme.palette.primary.main,
  margin: '15px auto 15px 0',

  '@media (max-width: 750px)': {
  },

  '@media (max-width: 600px)': {
    width: '300px',
    marginTop: 0,
    borderLeft: 'none',
  },
}))

export const BoxCardContentProfile = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '435px',
  borderLeft: '1px solid',
  borderColor: theme.palette.primary.main,
  margin: '15px auto 15px 0',

  '@media (max-width: 750px)': {
  },

  '@media (max-width: 600px)': {
    width: '250px',
    marginTop: 0,
    borderLeft: 'none',
  },
}))