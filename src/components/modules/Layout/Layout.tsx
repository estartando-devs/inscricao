import React from "react";
import * as S from "./LayoutStyled";
import { Header } from "../Header";

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <S.LayoutContainer>
    <S.LayoutContent>
      <Header />
      {children}
    </S.LayoutContent>
  </S.LayoutContainer>
);
