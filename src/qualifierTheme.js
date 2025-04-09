import { createTheme } from '@mui/material/styles';
import { deepPurple, blue } from '@mui/material/colors';

// Old Qualifier Theme Colors
const colors = {
  primary: blue,
  secondary: deepPurple,
  danger: 'orange',
  link: 'rgb(0, 110, 255)',
  typewriter: 'blueviolet',
  typewriter2: 'blue',
};

// Old Theme Configuration
const qualifierTheme = createTheme({
  palette: {
    primary: blue,
    secondary: deepPurple,
  },
  status: {
    danger: 'orange',
  },
  typography: {
    fontFamily: [
      'Roboto',
      'system-ui'
    ].join(','),
  },
});

// Old Global Styles
const qualifierGlobalStyles = {
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
      color: "rgb(0, 110, 255)",
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
    color: "blueviolet",
  },
  ".typewriter2": {
    fontSize: "1.5rem",
    color: "blue",
  },
  "#logo": {
    width: "14vw",
    backgroundAttachment: "fixed",
  },
  [`@media (max-width:${qualifierTheme.breakpoints.values.md}px)`]: {
    "#logo": {
      width: "150px !important",
    },
    ".hideInMob": {
      display: "none",
    },
  },
};

const qualifierBrandImage = {
  logo: "https://res.cloudinary.com/qualifier/image/upload/v1585843340/Default/QualifierLogo_epvtl9.svg"
};

const qualifierBrandText = {
  brandName: "Qualifier.co.in",
  poweredBy: "Powered by Softechinfra",
  contactEmail: "info@qualifier.co.in",
  contactPhone: "+91 98260 00000",
};
// Export old theme configuration and styles
export { colors as qualifierColors };
export { qualifierGlobalStyles };
export { qualifierBrandImage };
export { qualifierBrandText };
export default qualifierTheme; 