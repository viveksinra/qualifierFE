import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import PropTypes from 'prop-types';
import theme, { colors } from '../../theme';

/**
 * Global styles to be applied to the application
 */
const globalStyles = {
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
  [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
    "#logo": {
      width: "150px !important",
    },
    ".hideInMob": {
      display: "none",
    },
  },
};

/**
 * ThemeProvider component that provides the theme to the application
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} ThemeProvider component
 */
const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      {children}
    </MuiThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider; 