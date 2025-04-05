import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import PropTypes from 'prop-types';
import theme, { globalStyles } from '../../theme';

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