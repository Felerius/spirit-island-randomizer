import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    dark: true,
    light: true,
  },
  typography: {
    fontFamily: "'Roboto Variable', sans-serif",
  },
});
