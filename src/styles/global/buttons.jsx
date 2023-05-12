import { styled, Button } from "@mui/material";

export const ButtonMain = styled(Button)(({ theme }) => ({
  background: theme.palette.secondary.main,
  borderRadius: '10px 0',
  margin: '10px auto 0 auto',
  width: '100px',
  height: '30px',

  '&:hover': {
    background: theme.palette.secondary.dark,
  }
}));

export const ButtonSecond = styled(ButtonMain)(({ theme }) => ({
  background: theme.palette.primary.main,

  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));
