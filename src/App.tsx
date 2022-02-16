import React from "react";
import { ThemeProvider } from "styled-components";
import { Routes } from "./pages";
import { GlobalStyles } from "./styles/globalStyled";
import theme from "./styles/Theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
}
