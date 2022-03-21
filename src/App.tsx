import React, { useLayoutEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Routes } from "./pages";
import { GlobalStyles, theme } from "./styles";
import { NotificationProvider } from "./contexts";

export default function App() {
  useLayoutEffect(() => {
    const optConfig = JSON.parse(window.sessionStorage.getItem("optConfig") || "{}");

    if (optConfig?.subscriptionStatus === "closed") {
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
