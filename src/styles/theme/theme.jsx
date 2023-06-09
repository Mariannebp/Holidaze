import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backImage from "../../../src/assets/images/nature-g7ebb943e0_1920_edt-b.jpg";

const theme = createTheme({
  palette: {
    primary: {
      main: "#746D75",
      dark: "#5f585f",
    },
    secondary: {
      main: "#9C6135",
      dark: "#89562f",
    },
  },
  typography: {
    allVariants: {
      fontFamily: `Questrial, sans-serif`,
      fontWeight: `400`,
      overflowWrap: 'break-word',
    },
    h1: {
      fontSize: `2rem`,
      '@media (max-width:600px)': {
        fontSize: '1.7rem',
      },
    },
    h2: {
      fontSize: `1.3rem`,
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    h3: {
      fontSize: `1.1rem`,
      textDecoration: `none`,
    },
    h4: {
      fontSize: `1.1rem`,
      textDecoration: `none`,
    },
    body1: {

    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => `
        root {
          height: 100vh;
        }
        body {
          background-image: url(${backImage});
          background-repeat: no-repeat;
          background-size: cover;
          background-attachment: fixed;
          height: 100vh;
          background-position: center;
        },
        h1 {
          color: ${themeParam.palette.primary.main};
        },
        h2 {
          color: ${themeParam.palette.primary.main};
        },
        h3 {
          color: ${themeParam.palette.primary.main};
        }
        h4 {
          color: ${themeParam.palette.primary.main};
        }
        p {
          color: black;
        }
        a {
          color: ${themeParam.palette.secondary.main};
        }
      `,
    },
  },
});

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;