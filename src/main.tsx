import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { App } from "./App.tsx";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

createRoot(root).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
