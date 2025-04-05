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

// Risk Hawk Theme Configuration
const riskHawkTheme = createTheme({
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

// Risk Hawk Global Styles
const riskHawkGlobalStyles = {
  "*": {
    margin: 0,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    "&::-webkit-scrollbar": {
      width: "12px",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
      borderRadius: 10,
    },
    "&::-webkit-scrollbar-thumb": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.5)",
      borderRadius: 10,
    },
    "& a": {
      textDecoration: "none",
      color: colors.logoBlue,
      transition: "all 0.3s ease 0s",
    },
  },
  ".center": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ".typewriter": {
    fontSize: "2rem",
    color: colors.logoBlue,
  },
  ".typewriter2": {
    fontSize: "1.5rem",
    color: colors.blueHue,
  },
  "#logo": {
    width: "14vw",
    backgroundAttachment: "fixed",
  },
  [`@media (max-width:${riskHawkTheme.breakpoints.values.md}px)`]: {
    "#logo": {
      width: "150px !important",
    },
    ".hideInMob": {
      display: "none",
    },
  },
};

const brandImage = {
  logo: "https://res.cloudinary.com/qualifier/image/upload/v1585843340/Default/QualifierLogo_epvtl9.svg",
  logoBlue: "",
  // Add more brand images as needed
};

const riskHawkBrandText = {
    poweredBy: "Powered by Risk Hawk"
  };

// Export Risk Hawk theme configuration and styles
export { colors as riskHawkColors };
export { riskHawkGlobalStyles };
export { brandImage as riskHawkBrandImage };
export { riskHawkBrandText };
export default riskHawkTheme; 