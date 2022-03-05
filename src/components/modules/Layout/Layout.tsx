import React, { PropsWithChildren, ReactNode } from "react";
import * as S from "./LayoutStyled";
import { Header } from "../Header";

export const Layout = ({ children }: PropsWithChildren<ReactNode>) => (
  <>
    <S.LayoutContainer>
      <S.LayoutContent>
        <Header />
        {children}
      </S.LayoutContent>
    </S.LayoutContainer>
  </>
);
