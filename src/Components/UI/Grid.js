import React from 'react';
import { Grid as MuiGrid } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Custom Grid component that follows the new MUI structure
 * This component wraps MUI Grid and translates legacy props to the new format
 * 
 * Legacy: <Grid xs={12} sm={6} md={4}>
 * New: <Grid size={{xs: 12, sm: 6, md: 4}}>
 */
const Grid = (props) => {
  const { 
    children, 
    size, 
    xs, 
    sm, 
    md, 
    lg, 
    xl,
    ...otherProps 
  } = props;

  // If legacy props are used, convert them to the new format
  if (xs !== undefined || sm !== undefined || md !== undefined || lg !== undefined || xl !== undefined) {
    console.warn('Legacy Grid props detected. Please use size={{xs, sm, md, lg, xl}} instead.');
    
    // Create size object from legacy props
    const sizeObj = {};
    if (xs !== undefined) sizeObj.xs = xs;
    if (sm !== undefined) sizeObj.sm = sm;
    if (md !== undefined) sizeObj.md = md;
    if (lg !== undefined) sizeObj.lg = lg;
    if (xl !== undefined) sizeObj.xl = xl;
    
    // Apply the converted props to MuiGrid
    return (
      <MuiGrid {...otherProps} xs={sizeObj.xs} sm={sizeObj.sm} md={sizeObj.md} lg={sizeObj.lg} xl={sizeObj.xl}>
        {children}
      </MuiGrid>
    );
  }
  
  // If new format is used, apply it directly
  if (size) {
    return (
      <MuiGrid 
        {...otherProps} 
        xs={size.xs} 
        sm={size.sm} 
        md={size.md} 
        lg={size.lg} 
        xl={size.xl}
      >
        {children}
      </MuiGrid>
    );
  }
  
  // If no size props are provided, pass through other props
  return (
    <MuiGrid {...otherProps}>
      {children}
    </MuiGrid>
  );
};

Grid.propTypes = {
  children: PropTypes.node,
  size: PropTypes.shape({
    xs: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    sm: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    md: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    lg: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    xl: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  }),
  // Legacy props (for backward compatibility)
  xs: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  sm: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  md: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  lg: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  xl: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export default Grid; 