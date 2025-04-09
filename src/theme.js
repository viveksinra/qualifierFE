import riskHawkTheme, { riskHawkColors, riskHawkGlobalStyles, riskHawkBrandImage, riskHawkBrandText } from './riskHawkTheme';
import qualifierTheme, { qualifierColors, qualifierGlobalStyles, qualifierBrandImage, qualifierBrandText } from './qualifierTheme';

// Toggle this flag to switch between themes
// const USE_RISK_HAWK_THEME = true;
const USE_RISK_HAWK_THEME = true;

// Select the theme based on the flag
const theme = USE_RISK_HAWK_THEME ? riskHawkTheme : qualifierTheme;
const colors = USE_RISK_HAWK_THEME ? riskHawkColors : qualifierColors;
const globalStyles = USE_RISK_HAWK_THEME ? riskHawkGlobalStyles : qualifierGlobalStyles;

// Use Risk Hawk brand images if using Risk Hawk theme
const brandImage = USE_RISK_HAWK_THEME ? riskHawkBrandImage : qualifierBrandImage;

const brandText = USE_RISK_HAWK_THEME ? riskHawkBrandText : qualifierBrandText;

export { colors };
export { brandImage };
export { globalStyles };
export { brandText };
export default theme; 