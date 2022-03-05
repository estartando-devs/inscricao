import React, { PropsWithChildren, ReactNode } from "react";
import * as S from "./LayoutStyled";
import { Header } from "../Header";
import { Requirments } from "../Requirments";

export const Layout = ({ children }: PropsWithChildren<ReactNode>) => (
  <>
    <Requirments />
    <S.LayoutContainer>
      <S.LayoutContent>
        <Header />
        {children}
      </S.LayoutContent>
    </S.LayoutContainer>
  </>
);
