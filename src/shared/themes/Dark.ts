import { createTheme } from "@mui/material";
import { green, cyan } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: green[700],
      dark: green[900],
      light: green[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: cyan[700],
      dark: cyan[900],
      light: cyan[500],
      contrastText: "#ffffff",
    },
    background: {
      default: "#303134",
      paper: "#202124",
    },
  },
});
