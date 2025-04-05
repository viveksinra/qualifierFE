import riskHawkTheme, { riskHawkColors, riskHawkGlobalStyles, riskHawkBrandImage } from './riskHawkTheme';
import qualifierTheme, { qualifierColors, qualifierGlobalStyles, qualifierBrandImage } from './qualifierTheme';

// Toggle this flag to switch between themes
// const USE_RISK_HAWK_THEME = true;
const USE_RISK_HAWK_THEME = false;

// Select the theme based on the flag
const theme = USE_RISK_HAWK_THEME ? riskHawkTheme : qualifierTheme;
const colors = USE_RISK_HAWK_THEME ? riskHawkColors : qualifierColors;
const globalStyles = USE_RISK_HAWK_THEME ? riskHawkGlobalStyles : qualifierGlobalStyles;

// Use Risk Hawk brand images if using Risk Hawk theme
const brandImage = USE_RISK_HAWK_THEME ? riskHawkBrandImage : qualifierBrandImage;

export { colors };
export { brandImage };
export { globalStyles };
export default theme; 