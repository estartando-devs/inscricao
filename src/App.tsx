import React, { useLayoutEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Routes } from "./pages";
import { GlobalStyles, theme } from "./styles";
import { NotificationProvider } from "./contexts";

export default function App() {
  useLayoutEffect(() => {
    if (process.env.REACT_APP_STAGE === "prod") {
      window.location.replace("https://estartandodevs.com.br");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <GlobalStyles />
        <Routes />
      </NotificationProvider>
    </ThemeProvider>
  );
}
