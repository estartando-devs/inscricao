import React from "react";
import { ThemeProvider } from "styled-components";
import { Routes } from "./pages";
import { GlobalStyles, theme } from "./styles";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
}
