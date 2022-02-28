import React from "react";
import { ThemeProvider } from "styled-components";
import { Routes } from "./pages";
import { GlobalStyles, theme } from "./styles";
import { NotificationProvider } from "./contexts";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <GlobalStyles />
        <Routes />
      </NotificationProvider>
    </ThemeProvider>
  );
}
