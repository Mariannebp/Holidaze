import { styled, Container } from "@mui/material";

export const ContainerCorner = styled(Container)(({ theme }) => ({
  background: 'white',
  width: '700px',
  padding: '15px 15px 20px 15px',
  marginBottom: '40px',
  borderRadius: '15px 0',

  '@media (max-width: 750px)': {
    width: '500px',
  },

  '@media (max-width: 600px)': {
    width: '300px',
  },
}))