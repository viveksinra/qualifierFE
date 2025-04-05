import { createTheme } from '@mui/material/styles';

// Risk Hawk Brand Colors
const colors = {
  logoBlue: '#167EBC',
  logoOrange: '#EAA821',
  // Blue Spectrum
  blueTint1: '#FEF7F2',
  blueTint2: '#6DBEED',
  blueHue: '#00A5FF',
  blueShade: '#00456D',
  // Orange/Gold Spectrum
  orangeTint: '#FFB950',
  orangeShade: '#EAA821',
  orangeTone: '#927346',
  // Common colors
  white: '#FFFFFF',
  black: '#000000',
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.logoBlue,
      light: colors.blueTint2,
      dark: colors.blueShade,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.logoOrange,
      light: colors.orangeTint,
      dark: colors.orangeTone,
      contrastText: colors.white,
    },
    background: {
      default: colors.white,
      paper: colors.blueTint1,
    },
    action: {
      active: colors.blueHue,
      hover: `rgba(22, 126, 188, 0.08)`,
      selected: `rgba(22, 126, 188, 0.16)`,
    },
    text: {
      primary: colors.black,
      secondary: colors.blueShade,
    },
  },
  typography: {
    fontFamily: [
      'Gill Sans',
      'Roboto',
      'system-ui',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontFamily: 'Gill Sans, Arial, sans-serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'Gill Sans, Arial, sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Gill Sans, Arial, sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Gill Sans, Arial, sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Gill Sans, Arial, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Gill Sans, Arial, sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: 'Gill Sans, Arial, sans-serif',
    },
    subtitle2: {
      fontFamily: 'Gill Sans, Arial, sans-serif',
    },
    body1: {
      fontFamily: 'Gill Sans, Arial, sans-serif',
    },
    body2: {
      fontFamily: 'Gill Sans, Arial, sans-serif',
    },
    button: {
      fontFamily: 'Gill Sans, Arial, sans-serif',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: colors.blueShade,
          }
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: colors.orangeTone,
          }
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        primary: {
          backgroundColor: colors.logoBlue,
          '&:hover': {
            backgroundColor: colors.blueShade,
          }
        },
        secondary: {
          backgroundColor: colors.logoOrange,
          '&:hover': {
            backgroundColor: colors.orangeTone,
          }
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        colorPrimary: {
          backgroundColor: colors.logoBlue,
        },
        colorSecondary: {
          backgroundColor: colors.logoOrange,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: {
          color: colors.logoBlue,
        },
        colorSecondary: {
          color: colors.logoOrange,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: colors.logoBlue,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: colors.logoBlue,
          '&:hover': {
            color: colors.blueShade,
          },
        },
      },
    },
  },
});

// Export colors separately for use in non-component styles
export { colors };

export default theme; 