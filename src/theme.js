import { NoEncryption } from "@mui/icons-material";
import { createTheme } from "@mui/material/styles";

const breakpoints = {
  values: {
    xs: 0,
    sm: 0, // Phone
    md: 1200, // Tablet/Laptop
    lg: 1400, // Desktop
    xl: 1500,
  },
};

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
    primary: {
      main: "rgba(0, 0, 0, 0.6)",
      darker: "#053e85",
    },
    success: {
      main: "#4CC57E",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
  overrides: {
    RaMenuItemLink: {
      root: {
        borderLeft: "3px solid #fff",
      },
      active: {
        borderLeft: "3px solid #4f3cc9",
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: "none",
      },
      root: {
        border: "1px solid #e0e0e3",
        backgroundClip: "padding-box",
      },
    },
    MuiButton: {
      contained: {
        backgroundColor: "#fff",
        color: "#4f3cc9",
        boxShadow: "none",
      },
    },
    MuiButtonBase: {
      root: {
        "&:hover:active::after": {
          // recreate a static ripple color
          // use the currentColor to make it work both for outlined and contained buttons
          // but to dim the background without dimming the text,
          // put another element on top with a limited opacity
          content: '""',
          display: "block",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "currentColor",
          opacity: 1,
          borderRadius: "inherit",
        },
      },
    },
    MuiAppBar: {
      colorSecondary: {
        color: "#D65654",
        backgroundColor: "#D65654",
      },
    },
    MuiLinearProgress: {
      primary: {
        color: "#D65654",
      },
      colorPrimary: {
        backgroundColor: "#D65654",
      },
      barColorPrimary: {
        backgroundColor: "#D65654",
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        "&$disabled": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      },
    },
    MuiSnackbarContent: {
      root: {
        border: "none",
      },
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontWeight: "normal",
    fontSize: 16,
    subtitle1: {
      color: "rgba(0, 0, 0, 0.87)",
      fontSize: "1rem",
      [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
        fontSize: "0.875rem",
      },
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "0.75rem",
      },
      lineHeight: "24px",
      fontFamily: "Roboto",
    },
    button: {
      color: "#212121",
      textTransform: "none",
      fontFamily: "Roboto",
      fontSize: "1rem",
      [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
        fontSize: "0.875rem",
      },
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "0.75rem",
      },
      fontStyle: "normal",
      fontWeight: 500,
    },
    h6: {
      color: "#757575",
      lineHeight: "20px",
      fontWeight: "normal",
      fontSize: "1rem",
      [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
        fontSize: "0.875rem",
      },
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "0.75rem",
      },
    },
    caption: {
      fontFamily: "Roboto",
      fontSize: "1rem",
      [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
        fontSize: "0.875rem",
      },
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "0.75rem",
      },
    },
    h4: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: "Roboto",
      fontWeight: 600,
      fontSize: "1.25rem",
      [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
        fontSize: "1rem",
      },
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "0.875rem",
      },
      lineHeight: "28px",
    },
    h5: {
      fontSize: "1rem",
      [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
        fontSize: "0.875rem",
      },
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "0.75rem",
      },
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: "Roboto",
      fontWeight: 600,
      lineHeight: "24px",
    },
  },
});

export const themes = {
  palette: {
    primary: {
      main: "#4f3cc9",
    },
    secondary: {
      light: "#5f5fc4",
      main: "#283593",
      dark: "#001064",
      contrastText: "#fff",
    },
    background: {
      default: "#fcfcfe",
    },
    type: "light",
  },
  shape: {
    borderRadius: 10,
  },
  sidebar: {
    width: 200,
  },
  overrides: {
    RaMenuItemLink: {
      root: {
        borderLeft: "3px solid #fff",
      },
      active: {
        borderLeft: "3px solid #4f3cc9",
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: "none",
      },
      root: {
        border: "1px solid #e0e0e3",
        backgroundClip: "padding-box",
      },
    },
    MuiButton: {
      contained: {
        backgroundColor: "#fff",
        color: "#4f3cc9",
        boxShadow: "none",
      },
    },
    MuiButtonBase: {
      root: {
        "&:hover:active::after": {
          // recreate a static ripple color
          // use the currentColor to make it work both for outlined and contained buttons
          // but to dim the background without dimming the text,
          // put another element on top with a limited opacity
          content: '""',
          display: "block",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "currentColor",
          opacity: 0.3,
          borderRadius: "inherit",
        },
      },
    },
    MuiAppBar: {
      colorSecondary: {
        color: "#D65654",
        backgroundColor: "#D65654",
      },
    },
    MuiLinearProgress: {
      primary: {
        color: "#D65654",
      },
      colorPrimary: {
        backgroundColor: "#D65654",
      },
      barColorPrimary: {
        backgroundColor: "#D65654",
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        "&$disabled": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      },
    },
    MuiSnackbarContent: {
      root: {
        border: "none",
      },
    },
  },
  props: {
    MuiButtonBase: {
      // disable ripple for perf reasons
      disableRipple: true,
    },
  },
};

export default theme;
